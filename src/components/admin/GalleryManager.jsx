import { useState, useEffect } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { Plus, Trash2, Image, Check, X } from 'lucide-react';

export default function GalleryManager({ isDark, onUnsavedChange }) {
  const { images, addImage, deleteImage } = useGallery();
  const [pendingImages, setPendingImages] = useState([]);
  const [pendingDeletions, setPendingDeletions] = useState([]);
  const [newImage, setNewImage] = useState({ src: '', alt: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setPendingImages([...images]);
  }, [images]);

  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const addedCount = pendingImages.filter((img) => img.id.toString().startsWith('pending-')).length;
  const removedCount = pendingDeletions.length;
  const hasUnsavedChanges = addedCount > 0 || removedCount > 0;

  const handleAddPending = (e) => {
    e.preventDefault();
    if (newImage.src) {
      const newImg = { ...newImage, id: `pending-${Date.now()}` };
      setPendingImages([...pendingImages, newImg]);
      setNewImage({ src: '', alt: '' });
      setShowForm(false);
    }
  };

  const handleDeletePending = (id) => {
    const idStr = id.toString();
    if (idStr.startsWith('pending-')) {
      setPendingImages(pendingImages.filter((img) => img.id.toString() !== idStr));
    } else {
      setPendingDeletions([...pendingDeletions, idStr]);
    }
  };

  const handleSave = () => {
    const toDelete = pendingDeletions;
    const toAdd = pendingImages.filter((img) => img.id.toString().startsWith('pending-'));
    
    toDelete.forEach((id) => deleteImage(id));
    toAdd.forEach((img) => addImage({ src: img.src, alt: img.alt }));
    
    setPendingDeletions([]);
    setPendingImages(prev => prev.filter(img => !toDelete.includes(img.id)));
  };

  const handleCancel = () => {
    setPendingImages([...images]);
    setPendingDeletions([]);
  };

  const visibleImages = pendingImages.filter((img) => !pendingDeletions.includes(img.id.toString()));

  useEffect(() => {
    if (hasUnsavedChanges) {
      onUnsavedChange?.(true, { gallery: { added: addedCount, removed: removedCount } });
    } else {
      onUnsavedChange?.(false);
    }
  }, [hasUnsavedChanges, addedCount, removedCount, onUnsavedChange]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Courier New, monospace' }}>
            Gallery Images ({visibleImages.length})
          </h2>
          {hasUnsavedChanges && (
            <span className="text-sm text-yellow-500">Unsaved changes</span>
          )}
        </div>
        <div className="flex gap-2">
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
          <button
            onClick={() => setShowForm(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <Plus size={16} />
Add Image
        </button>
      </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddPending} className={`mb-6 p-4 rounded-lg border ${borderColor}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm ${mutedColor} mb-1`}>Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setNewImage({ ...newImage, src: ev.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg} text-sm`}
              />
              <p className={`text-xs ${mutedColor} mt-1`}>Or enter path manually below</p>
            </div>
            <div>
              <label className={`block text-sm ${mutedColor} mb-1`}>Alt Text</label>
              <input
                type="text"
                value={newImage.alt}
                onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
                placeholder="Description of image"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={`block text-sm ${mutedColor} mb-1`}>Or Image Path (manual)</label>
            <input
              type="text"
              value={newImage.src.startsWith('data:') ? '' : newImage.src}
              onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
              className={`w-full p-2 rounded border ${borderColor} ${inputBg}`}
              placeholder="/images/your-image.jpg"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className={`px-4 py-1.5 rounded-lg text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`px-4 py-1.5 rounded-lg text-sm border ${borderColor}`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {visibleImages.map((img) => (
          <div key={img.id} className={`relative group rounded-lg overflow-hidden border ${borderColor}`}>
            <div className="aspect-square bg-gray-800 flex items-center justify-center">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center text-gray-500">
                <Image size={32} />
              </div>
            </div>
            <p className={`text-xs p-2 truncate ${mutedColor}`}>{img.alt}</p>
            <button
              onClick={() => handleDeletePending(img.id)}
              className="absolute top-2 right-2 p-1.5 rounded bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}