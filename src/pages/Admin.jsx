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

function LoginScreen({ onLogin, isDark }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('Invalid password');
    }
  };

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
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedColor}`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            Login
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

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

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
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
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
  };

  const handleEventEdit = (event) => {
    setEventForm(event);
    setEditingEventId(event.id);
    setShowEventForm(true);
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
            onClick={handleLogout}
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
                onClick={() => setShowEventForm(true)}
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
          <GalleryManager isDark={isDark} />
        )}

        {activeTab === 'release' && (
          <ReleaseManager isDark={isDark} />
        )}
      </div>
    </div>
  );
}