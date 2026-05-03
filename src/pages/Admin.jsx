import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { useEvents } from '../hooks/useEvents';
import { Lock, Eye, EyeOff, Plus, Pencil, Trash2, X, Check, Calendar, MapPin, Clock, ExternalLink, Music, Image } from 'lucide-react';
import GalleryManager from '../components/admin/GalleryManager';
import ReleaseManager from '../components/admin/ReleaseManager';

const initialEventForm = {
  title: '',
  venue: '',
  location: '',
  date: '',
  time: '',
  doors: '',
  ticketUrl: '',
  featured: false,
};

const RATE_LIMIT_KEY = 'stone-compass-login-attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

function getLoginAttempts() {
  try {
    const stored = sessionStorage.getItem(RATE_LIMIT_KEY);
    return stored ? JSON.parse(stored) : { count: 0, lockedUntil: 0 };
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function recordFailedAttempt() {
  const attempt = getLoginAttempts();
  attempt.count += 1;
  sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempt));
}

function clearLoginAttempts() {
  sessionStorage.removeItem(RATE_LIMIT_KEY);
}

function isLockedOut() {
  const attempt = getLoginAttempts();
  return attempt.count >= MAX_ATTEMPTS && Date.now() < attempt.lockedUntil;
}

function getLockoutRemaining() {
  const attempt = getLoginAttempts();
  if (attempt.count < MAX_ATTEMPTS) return 0;
  return Math.ceil((attempt.lockedUntil - Date.now()) / 1000);
}

function LoginScreen({ onLogin, isDark }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  useState(() => {
    if (isLockedOut()) {
      setIsLocked(true);
      const remaining = getLockoutRemaining();
      setLockoutRemaining(remaining);
      setTimeout(() => {
        clearLoginAttempts();
        setIsLocked(false);
        setLockoutRemaining(0);
      }, remaining * 1000);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;
    const success = onLogin(password);
    if (!success) {
      recordFailedAttempt();
      const attempt = getLoginAttempts();
      setError('Invalid password');
      if (attempt.count >= MAX_ATTEMPTS) {
        attempt.lockedUntil = Date.now() + LOCKOUT_MS;
        sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempt));
        setIsLocked(true);
        setLockoutRemaining(Math.ceil(LOCKOUT_MS / 1000));
        setTimeout(() => {
          clearLoginAttempts();
          setIsLocked(false);
          setLockoutRemaining(0);
          setError('');
        }, LOCKOUT_MS);
      }
    }
  };

  const remainingAttempts = MAX_ATTEMPTS - getLoginAttempts().count;

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center p-8`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full p-8 rounded-xl border ${borderColor}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock size={32} />
          <h1 className="text-2xl font-bold" style={{ fontFamily: fonts.code }}>
            Admin Login
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm ${mutedColor} mb-1`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 rounded-lg border ${borderColor} ${inputBg} pr-12`}
                placeholder="Enter admin password"
                disabled={isLocked}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedColor}`}
                disabled={isLocked}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {isLocked ? (
            <p className="text-red-500 text-sm">
              Too many failed attempts. Try again in {lockoutRemaining} seconds.
            </p>
          ) : remainingAttempts <= 2 && (
            <p className="text-yellow-500 text-sm">
              {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
            </p>
          )}
          
          <button
            type="submit"
            disabled={isLocked}
            className={`w-full py-3 rounded-lg font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLocked ? 'Locked' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleUnsavedChange = (tab, hasChanges, summary) => {
    setUnsavedChanges((prev) => {
      const newChanges = { ...prev };
      if (hasChanges) {
        newChanges[tab] = summary;
      } else {
        delete newChanges[tab];
      }
      return newChanges;
    });
  };

  const hasAnyUnsavedChanges = Object.keys(unsavedChanges).length > 0;

  const getChangeSummaryText = () => {
    const parts = [];
    if (unsavedChanges.gallery) {
      const { added, removed } = unsavedChanges.gallery;
      if (added > 0 && removed > 0) {
        parts.push(`added ${added} and removed ${removed} photos to/from gallery`);
      } else if (added > 0) {
        parts.push(`added ${added} photo${added > 1 ? 's' : ''} to gallery`);
      } else if (removed > 0) {
        parts.push(`removed ${removed} photo${removed > 1 ? 's' : ''} from gallery`);
      }
    }
    if (unsavedChanges.release) {
      parts.push('edited latest release');
    }
    if (unsavedChanges.events) {
      parts.push('edited event');
    }
    return parts.join(', ');
  };

  const handleLogoutClick = () => {
    if (hasAnyUnsavedChanges) {
      setShowLogoutDialog(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleLogoutSave = () => {
    setUnsavedChanges({});
    setShowLogoutDialog(false);
    setIsAuthenticated(false);
  };

  const handleLogoutDiscard = () => {
    setUnsavedChanges({});
    setShowLogoutDialog(false);
    setIsAuthenticated(false);
  };

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const tabs = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'release', label: 'Latest Release', icon: Music },
  ];

  const handleLogin = (password) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    if (isNaN(hour)) return '';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEventId) {
      updateEvent(editingEventId, eventForm);
    } else {
      addEvent(eventForm);
    }
    setEventForm(initialEventForm);
    setEditingEventId(null);
    setShowEventForm(false);
    setUnsavedChanges((prev) => {
      const newChanges = { ...prev };
      delete newChanges.events;
      return newChanges;
    });
  };

  const handleEventEdit = (event) => {
    setEventForm(event);
    setEditingEventId(event.id);
    setShowEventForm(true);
    setUnsavedChanges((prev) => ({ ...prev, events: { edited: true } }));
  };

  const handleEventDelete = (id) => {
    if (confirm('Delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleEventCancel = () => {
    setEventForm(initialEventForm);
    setEditingEventId(null);
    setShowEventForm(false);
    setUnsavedChanges((prev) => {
      const newChanges = { ...prev };
      delete newChanges.events;
      return newChanges;
    });
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} isDark={isDark} />;
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: fonts.code }}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogoutClick}
            className={`px-4 py-2 rounded-lg border ${borderColor}`}
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-700 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === tab.id 
                    ? (isDark ? 'bg-white text-black' : 'bg-black text-white') 
                    : `${mutedColor} hover:${textColor}`}
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: fonts.code }}>
                Events ({events.length})
              </h2>
              <button
                onClick={() => {
                  setShowEventForm(true);
                  setUnsavedChanges((prev) => ({ ...prev, events: { edited: true } }));
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                <Plus size={16} />
                Add Event
              </button>
            </div>

            {showEventForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 p-6 rounded-xl border ${borderColor}`}
              >
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: fonts.code }}>
                  {editingEventId ? 'Edit Event' : 'Add New Event'}
                </h3>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Title</label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Venue</label>
                      <input
                        type="text"
                        value={eventForm.venue}
                        onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Location</label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Date</label>
                      <input
                        type="date"
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Show Time</label>
                      <input
                        type="time"
                        value={eventForm.time}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm ${mutedColor} mb-1`}>Doors Open</label>
                      <input
                        type="time"
                        value={eventForm.doors}
                        onChange={(e) => setEventForm({ ...eventForm, doors: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm ${mutedColor} mb-1`}>Ticket URL</label>
                      <input
                        type="url"
                        value={eventForm.ticketUrl}
                        onChange={(e) => setEventForm({ ...eventForm, ticketUrl: e.target.value })}
                        className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                        placeholder="https://"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="event-featured"
                        checked={eventForm.featured}
                        onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="event-featured" className="text-sm">Feature on homepage</label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                    >
                      <Check size={18} />
                      {editingEventId ? 'Update' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={handleEventCancel}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${borderColor}`}
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-xl border ${borderColor} ${event.featured ? 'ring-2 ring-white/20' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold" style={{ fontFamily: fonts.code }}>
                          {event.title}
                        </h3>
                        {event.featured && (
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${mutedColor}`} style={{ fontFamily: fonts.code }}>
                        {event.venue} • {event.location}
                      </p>
                      <p className={`text-sm ${mutedColor}`} style={{ fontFamily: fonts.code }}>
                        {formatDate(event.date)} @ {formatTime(event.time)} (doors {formatTime(event.doors)})
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEventEdit(event)}
                        className={`p-2 rounded-lg ${borderColor}`}
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleEventDelete(event.id)}
                        className="p-2 rounded-lg border border-red-500/50 text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <p className={`text-center ${mutedColor} py-12`}>No events yet. Add one to get started.</p>
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <GalleryManager isDark={isDark} onUnsavedChange={(hasChanges, summary) => handleUnsavedChange('gallery', hasChanges, summary)} />
        )}

        {activeTab === 'release' && (
          <ReleaseManager isDark={isDark} onUnsavedChange={(hasChanges, summary) => handleUnsavedChange('release', hasChanges, summary)} />
        )}

        {showLogoutDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`max-w-md p-6 rounded-xl border ${borderColor} ${bgColor}`}>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: fonts.code }}>
                Unsaved Changes
              </h3>
              <p className={`mb-6 ${mutedColor}`}>
                You have unsaved changes that will be lost:
              </p>
              <ul className={`mb-6 space-y-1 ${mutedColor}`}>
                {unsavedChanges.gallery && (
                  <li>
                    {unsavedChanges.gallery.added > 0 && `added ${unsavedChanges.gallery.added} photo${unsavedChanges.gallery.added > 1 ? 's' : ''} to gallery`}
                    {unsavedChanges.gallery.added > 0 && unsavedChanges.gallery.removed > 0 && ' and '}
                    {unsavedChanges.gallery.removed > 0 && `removed ${unsavedChanges.gallery.removed} photo${unsavedChanges.gallery.removed > 1 ? 's' : ''} from gallery`}
                  </li>
                )}
                {unsavedChanges.release && <li>edited latest release</li>}
                {unsavedChanges.events && <li>edited event</li>}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={handleLogoutSave}
                  className={`flex-1 px-4 py-2 rounded-lg ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                  Save & Logout
                </button>
                <button
                  onClick={handleLogoutDiscard}
                  className={`flex-1 px-4 py-2 rounded-lg border ${borderColor}`}
                >
                  Discard & Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}