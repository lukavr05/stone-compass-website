import { useState, useEffect } from 'react';

const STORAGE_KEY = 'stone-compass-gallery';

const defaultImages = [
  { id: '1', src: '/images/luka1.jpg', alt: 'Stone Compass Live Performance' },
  { id: '2', src: '/images/scpromo2.jpg', alt: 'Night Single Cover' },
  { id: '3', src: '/images/scpromo4.jpg', alt: 'Reflection Single Cover' },
  { id: '4', src: '/images/IMG_1646.jpg', alt: 'Concert Photo' },
  { id: '5', src: '/images/IMG_6009.JPG', alt: 'Behind the Scenes' },
  { id: '6', src: '/images/IMG_6151.JPG', alt: 'Band Photo' },
  { id: '7', src: '/images/IMG_6107.JPG', alt: 'Festival Performance' },
  { id: '8', src: '/images/scpromo3.jpg', alt: 'Recording Session' },
  { id: '9', src: '/images/IMG_5636.JPEG', alt: 'Venue Photo' },
  { id: '10', src: '/images/IMG_5449.JPG', alt: 'Equipment Setup' },
  { id: '11', src: '/images/IMG_6117.JPG', alt: 'Equipment Setup' },
  { id: '12', src: '/images/rosie.jpg', alt: 'Band Photo' },
];

export function useGallery() {
  const [images, setImages] = useState(() => {
    if (typeof window === 'undefined') return defaultImages;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultImages;
      }
    }
    return defaultImages;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }, [images]);

  const addImage = (image) => {
    const newImage = {
      ...image,
      id: Date.now().toString(),
    };
    setImages((prev) => [newImage, ...prev]);
    return newImage;
  };

  const updateImage = (id, updates) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, ...updates } : img
      )
    );
  };

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const reorderImages = (newOrder) => {
    setImages(newOrder);
  };

  return {
    images,
    addImage,
    updateImage,
    deleteImage,
    reorderImages,
  };
}

export default useGallery;