import { useState } from 'react';
import { useRelease } from '../../hooks/useRelease';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReleaseManager({ isDark }) {
  const { release, updateRelease, updatePlatform, addPlatform, removePlatform } = useRelease();
  const [showLyrics, setShowLyrics] = useState(false);
  const [newPlatform, setNewPlatform] = useState({ name: '', url: '', color: '#000000' });
  const [showAddPlatform, setShowAddPlatform] = useState(false);

  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const handleAddPlatform = (e) => {
    e.preventDefault();
    if (newPlatform.name && newPlatform.url) {
      addPlatform(newPlatform);
      setNewPlatform({ name: '', url: '', color: '#000000' });
      setShowAddPlatform(false);
    }
  };

  return (
    <div>
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
                value={release.title}
                onChange={(e) => updateRelease({ title: e.target.value })}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
              />
            </div>
            
            <div>
              <label className={`block text-sm ${mutedColor} mb-1`}>Cover Art Path</label>
              <input
                type="text"
                value={release.coverArt}
                onChange={(e) => updateRelease({ coverArt: e.target.value })}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
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
                    value={release.lyrics}
                    onChange={(e) => updateRelease({ lyrics: e.target.value })}
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
              Platform Links ({release.platforms.length})
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
            {release.platforms.map((platform, index) => (
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
                  onChange={(e) => updatePlatform(index, { name: e.target.value })}
                  className={`flex-1 bg-transparent border-none outline-none ${isDark ? 'text-white' : 'text-black'}`}
                />
                <input
                  type="url"
                  value={platform.url}
                  onChange={(e) => updatePlatform(index, { url: e.target.value })}
                  className={`flex-1 bg-transparent border-none outline-none text-sm ${mutedColor}`}
                  placeholder="https://"
                />
                <button
                  onClick={() => removePlatform(index)}
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