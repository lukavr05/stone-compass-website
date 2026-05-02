import { useState, useEffect } from 'react';
import { useRelease } from '../../hooks/useRelease';
import { Plus, Trash2, GripVertical, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReleaseManager({ isDark, onUnsavedChange }) {
  const { release, updateRelease, updatePlatform, addPlatform, removePlatform } = useRelease();
  const [pendingRelease, setPendingRelease] = useState(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [newPlatform, setNewPlatform] = useState({ name: '', url: '', color: '#000000' });
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const [pendingNewPlatforms, setPendingNewPlatforms] = useState([]);
  const [pendingRemovedPlatforms, setPendingRemovedPlatforms] = useState([]);

  useEffect(() => {
    setPendingRelease({ ...release });
    setPendingNewPlatforms([]);
    setPendingRemovedPlatforms([]);
  }, [release]);

  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const hasUnsavedChanges = pendingRelease && (
    pendingRelease.title !== release.title ||
    pendingRelease.coverArt !== release.coverArt ||
    pendingRelease.lyrics !== release.lyrics ||
    pendingNewPlatforms.length > 0 ||
    pendingRemovedPlatforms.length > 0 ||
    pendingRelease.platforms.some((p, i) => 
      p.name !== release.platforms[i]?.name || p.url !== release.platforms[i]?.url
    )
  );

  useEffect(() => {
    if (hasUnsavedChanges) {
      onUnsavedChange?.(true, { release: { edited: true } });
    } else {
      onUnsavedChange?.(false);
    }
  }, [hasUnsavedChanges, onUnsavedChange]);

  const updatePendingRelease = (updates) => {
    setPendingRelease((prev) => ({ ...prev, ...updates }));
  };

  const handleAddPlatform = (e) => {
    e.preventDefault();
    if (newPlatform.name && newPlatform.url) {
      setPendingNewPlatforms([...pendingNewPlatforms, { ...newPlatform, id: `pending-${Date.now()}` }]);
      setNewPlatform({ name: '', url: '', color: '#000000' });
      setShowAddPlatform(false);
    }
  };

  const handleRemovePlatform = (index) => {
    if (index >= pendingRelease.platforms.length) {
      const pendingIndex = index - pendingRelease.platforms.length;
      setPendingNewPlatforms(pendingNewPlatforms.filter((_, i) => i !== pendingIndex));
    } else {
      setPendingRemovedPlatforms([...pendingRemovedPlatforms, index]);
    }
  };

  const handleSave = () => {
    updateRelease({
      title: pendingRelease.title,
      coverArt: pendingRelease.coverArt,
      lyrics: pendingRelease.lyrics,
    });
    
    pendingRemovedPlatforms.forEach((idx) => removePlatform(idx));
    
    pendingNewPlatforms.forEach((p) => addPlatform({ name: p.name, url: p.url, color: p.color }));
    
    pendingRelease.platforms.forEach((p, idx) => {
      if (!pendingRemovedPlatforms.includes(idx)) {
        updatePlatform(idx, { name: p.name, url: p.url, color: p.color });
      }
    });
  };

  const handleCancel = () => {
    setPendingRelease({ ...release });
    setPendingNewPlatforms([]);
    setPendingRemovedPlatforms([]);
  };

  const visiblePlatforms = pendingRelease?.platforms
    ?.filter((_, idx) => !pendingRemovedPlatforms.includes(idx))
    .concat(pendingNewPlatforms) || [];

  if (!pendingRelease) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {hasUnsavedChanges && (
          <span className="text-sm text-yellow-500">Unsaved changes</span>
        )}
        <div className="flex gap-2 ml-auto">
          {hasUnsavedChanges && (
            <>
              <button
                onClick={handleSave}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                <Check size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border ${borderColor}`}
              >
                <X size={16} />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Courier New, monospace' }}>
            Release Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm ${mutedColor} mb-1`}>Title</label>
              <input
                type="text"
                value={pendingRelease.title}
                onChange={(e) => updatePendingRelease({ title: e.target.value })}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
              />
            </div>
            
            <div>
              <label className={`block text-sm ${mutedColor} mb-1`}>Cover Art</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      updatePendingRelease({ coverArt: ev.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg} text-sm mb-2`}
              />
              <input
                type="text"
                value={pendingRelease.coverArt?.startsWith('data:') ? '' : pendingRelease.coverArt || ''}
                onChange={(e) => updatePendingRelease({ coverArt: e.target.value })}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                placeholder="Or enter path manually: /images/cover.jpg"
              />
            </div>

            <div>
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className={`text-sm underline ${mutedColor}`}
              >
                {showLyrics ? 'Hide' : 'Edit'} Lyrics
              </button>
              
              <AnimatePresence>
                {showLyrics && (
                  <motion.textarea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    value={pendingRelease.lyrics}
                    onChange={(e) => updatePendingRelease({ lyrics: e.target.value })}
                    className={`w-full mt-2 p-2 rounded border ${borderColor} ${inputBg} font-mono text-sm`}
                    rows={12}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Courier New, monospace' }}>
              Platform Links ({visiblePlatforms.length})
            </h2>
            <button
              onClick={() => setShowAddPlatform(true)}
              className={`flex items-center gap-1 text-sm ${isDark ? 'text-white' : 'text-black'}`}
            >
              <Plus size={16} />
              Add Platform
            </button>
          </div>

          {showAddPlatform && (
            <form onSubmit={handleAddPlatform} className={`mb-4 p-4 rounded-lg border ${borderColor}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                  placeholder="Platform name"
                  className={`p-2 rounded border ${borderColor} ${inputBg}`}
                  required
                />
                <input
                  type="url"
                  value={newPlatform.url}
                  onChange={(e) => setNewPlatform({ ...newPlatform, url: e.target.value })}
                  placeholder="URL"
                  className={`p-2 rounded border ${borderColor} ${inputBg}`}
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={newPlatform.color}
                    onChange={(e) => setNewPlatform({ ...newPlatform, color: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <button
                    type="submit"
                    className={`flex-1 px-3 py-1 rounded text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddPlatform(false)}
                    className={`px-3 py-1 rounded text-sm border ${borderColor}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {visiblePlatforms.map((platform, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${borderColor}`}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: platform.color }}
                />
                <input
                  type="text"
                  value={platform.name}
                  onChange={(e) => {
                    if (index < pendingRelease.platforms.length) {
                      const newPlatforms = [...pendingRelease.platforms];
                      newPlatforms[index] = { ...newPlatforms[index], name: e.target.value };
                      setPendingRelease({ ...pendingRelease, platforms: newPlatforms });
                    }
                  }}
                  className={`flex-1 bg-transparent border-none outline-none ${isDark ? 'text-white' : 'text-black'}`}
                />
                <input
                  type="url"
                  value={platform.url}
                  onChange={(e) => {
                    if (index < pendingRelease.platforms.length) {
                      const newPlatforms = [...pendingRelease.platforms];
                      newPlatforms[index] = { ...newPlatforms[index], url: e.target.value };
                      setPendingRelease({ ...pendingRelease, platforms: newPlatforms });
                    }
                  }}
                  className={`flex-1 bg-transparent border-none outline-none text-sm ${mutedColor}`}
                  placeholder="https://"
                />
                <button
                  onClick={() => handleRemovePlatform(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}