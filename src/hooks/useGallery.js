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
  { id: '101', src: '/images/IMG_1355.avif', alt: 'Band Photo' },
  { id: '102', src: '/images/IMG_1356.avif', alt: 'Band Photo' },
  { id: '103', src: '/images/IMG_1357.avif', alt: 'Concert Photo' },
  { id: '104', src: '/images/IMG_1359.avif', alt: 'Concert Photo' },
  { id: '105', src: '/images/IMG_1360.avif', alt: 'Concert Photo' },
  { id: '106', src: '/images/IMG_1361.avif', alt: 'Concert Photo' },
  { id: '107', src: '/images/IMG_1362.avif', alt: 'Concert Photo' },
  { id: '108', src: '/images/IMG_1363.avif', alt: 'Concert Photo' },
  { id: '109', src: '/images/IMG_1364.avif', alt: 'Concert Photo' },
  { id: '110', src: '/images/IMG_1365.avif', alt: 'Concert Photo' },
  { id: '111', src: '/images/IMG_1366.avif', alt: 'Concert Photo' },
  { id: '112', src: '/images/IMG_1367.avif', alt: 'Concert Photo' },
  { id: '113', src: '/images/IMG_1368.avif', alt: 'Concert Photo' },
  { id: '114', src: '/images/IMG_1374.avif', alt: 'Concert Photo' },
  { id: '115', src: '/images/IMG_1375.avif', alt: 'Concert Photo' },
  { id: '116', src: '/images/IMG_1376.avif', alt: 'Concert Photo' },
  { id: '117', src: '/images/IMG_1378.avif', alt: 'Concert Photo' },
  { id: '118', src: '/images/IMG_1380.avif', alt: 'Concert Photo' },
  { id: '119', src: '/images/IMG_1382.avif', alt: 'Concert Photo' },
  { id: '120', src: '/images/IMG_1383.avif', alt: 'Band Photo' },
  { id: '121', src: '/images/brandon3.jpg.avif', alt: 'Band Photo' },
  { id: '122', src: '/images/0bb2a907-ad18-4bf4-a3c9-fc3b70b0b79e.jpg.avif', alt: 'Band Photo' },
  { id: '123', src: '/images/1d2e1cda-c540-42ff-a64a-24cf406ce762.jpg.avif', alt: 'Band Photo' },
  { id: '124', src: '/images/1d5e0891-2e38-450c-87f0-3b592fb24396.jpg.avif', alt: 'Band Photo' },
  { id: '125', src: '/images/2325a1c6-a09b-4f2e-998a-c9daebda1065.jpg.avif', alt: 'Band Photo' },
  { id: '126', src: '/images/2e1d9164-8ebe-44d2-9780-3a50064d49cd.jpg.avif', alt: 'Band Photo' },
  { id: '127', src: '/images/4f9a4d3d-5c2a-49cc-b92c-9207da36c73c.jpg.avif', alt: 'Band Photo' },
  { id: '128', src: '/images/63d274c2-fd87-4107-abf9-d4930ddb0a39.jpg.avif', alt: 'Band Photo' },
  { id: '129', src: '/images/67e527c7-6341-4135-837f-72ce384b1d35.jpg.avif', alt: 'Band Photo' },
  { id: '130', src: '/images/7550a71b-4bf6-499d-bc58-609889907cfb.jpg.avif', alt: 'Band Photo' },
  { id: '131', src: '/images/886b30d0-c854-4818-a89f-424e53f5a610.jpg.avif', alt: 'Band Photo' },
  { id: '132', src: '/images/89e18b9a-ec68-456f-9d8b-a0dbaecfc899.jpg.avif', alt: 'Band Photo' },
  { id: '133', src: '/images/9d72c333-cb72-49b4-87b6-74b8b787bf16.jpg.avif', alt: 'Band Photo' },
  { id: '134', src: '/images/a109d04d-e4fd-4274-a0d8-a64ed699517d.jpg.avif', alt: 'Band Photo' },
  { id: '135', src: '/images/afa67cbb-834b-4d7b-b3e5-d15d7c3d3b9a.jpg.avif', alt: 'Band Photo' },
  { id: '136', src: '/images/afcad74f-c6be-442c-9ab6-e5d4acc66345.jpg.avif', alt: 'Band Photo' },
  { id: '137', src: '/images/b700efec-ec88-449a-bc9e-b05e77819635.jpg.avif', alt: 'Band Photo' },
  { id: '138', src: '/images/c0d51590-ef48-404d-8ba4-8b838dcf1763.jpg.avif', alt: 'Band Photo' },
  { id: '139', src: '/images/ce3920b6-47b4-4bb0-8a5f-2ce33d45d9ce.jpg.avif', alt: 'Band Photo' },
  { id: '140', src: '/images/fa878d95-5ce9-4eb8-a982-ce27db48830a.jpg.avif', alt: 'Band Photo' },
  { id: '141', src: '/images/ff11a901-6855-477c-b2a9-103917035df8.jpg.avif', alt: 'Band Photo' },
  { id: '142', src: '/images/ff42786d-03e6-4002-a11c-24f0103e1b88.jpg.avif', alt: 'Band Photo' },
];

export function useGallery() {
  const [images, setImages] = useState(() => {
    if (typeof window === 'undefined') return defaultImages;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          return parsed;
        }
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