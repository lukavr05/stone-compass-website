import { useState, useEffect } from 'react';

const STORAGE_KEY = 'stone-compass-gallery';
const STORAGE_VERSION = 2;

const oldImageMappings = {
  '/images/IMG_1355.avif': '/images/rosie_o2is3.avif',
  '/images/IMG_1356.avif': '/images/crowd_o2is.avif',
  '/images/IMG_1357.avif': '/images/rosie_o2is2.avif',
  '/images/IMG_1359.avif': '/images/luka_o2is6.avif',
  '/images/IMG_1360.avif': '/images/luka_o2is5.avif',
  '/images/IMG_1361.avif': '/images/rosie_o2is1.avif',
  '/images/IMG_1362.avif': '/images/kai_o2is3.avif',
  '/images/IMG_1363.avif': '/images/kai_o2is2.avif',
  '/images/IMG_1364.avif': '/images/kai_o2is1.avif',
  '/images/IMG_1365.avif': '/images/kai_o2is1.avif',
  '/images/IMG_1366.avif': '/images/luka_o2is3.avif',
  '/images/IMG_1367.avif': '/images/rosie_amar6.avif',
  '/images/IMG_1368.avif': '/images/luka_o2is2.avif',
  '/images/IMG_1374.avif': '/images/brandon_o2is.avif',
  '/images/IMG_1375.avif': '/images/luka_o2is.avif',
  '/images/IMG_1376.avif': '/images/band_o2is.avif',
  '/images/IMG_1378.avif': '/images/sc_press4.avif',
  '/images/IMG_1380.avif': '/images/sc_press3.avif',
  '/images/IMG_1382.avif': '/images/sc_press2.avif',
  '/images/IMG_1383.avif': '/images/sc_press1.avif',
  '/images/rosie.jpg': '/images/rosie.jpg',
  '/images/brandon3.jpg': '/images/brandon3.jpg.avif',
  '/images/0bb2a907-ad18-4bf4-a3c9-fc3b70b0b79e.jpg.avif': '/images/rosie_amar6.avif',
  '/images/1d2e1cda-c540-42ff-a64a-24cf406ce762.jpg.avif': '/images/luka_amar6.avif',
  '/images/1d5e0891-2e38-450c-87f0-3b592fb24396.jpg.avif': '/images/luka_rosie_amar2.avif',
  '/images/2325a1c6-a09b-4f2e-998a-c9daebda1065.jpg.avif': '/images/kai_amar1.avif',
  '/images/2e1d9164-8ebe-44d2-9780-3a50064d49cd.jpg.avif': '/images/luka_amar5.avif',
  '/images/4f9a4d3d-5c2a-49cc-b92c-9207da36c73c.jpg.avif': '/images/rosie_amar3.avif',
  '/images/63d274c2-fd87-4107-abf9-d4930ddb0a39.jpg.avif': '/images/luka_amar4.avif',
  '/images/67e527c7-6341-4135-837f-72ce384b1d35.jpg.avif': '/images/rosie_amar4.avif',
  '/images/7550a71b-4bf6-499d-bc58-609889907cfb.jpg.avif': '/images/rosie_amar5.avif',
  '/images/886b30d0-c854-4818-a89f-424e53f5a610.jpg.avif': '/images/rosie_amar3.avif',
  '/images/89e18b9a-ec68-456f-9d8b-a0dbaecfc899.jpg.avif': '/images/brandon_amar1.avif',
  '/images/9d72c333-cb72-49b4-87b6-74b8b787bf16.jpg.avif': '/images/luka_amar3.avif',
  '/images/a109d04d-e4fd-4274-a0d8-a64ed699517d.jpg.avif': '/images/luka_kai_amar2.avif',
  '/images/afa67cbb-834b-4d7b-3e5-d15d7c3d3b9a.jpg.avif': '/images/luka_kai_amar1.avif',
  '/images/afcad74f-c6be-442c-9ab6-e5d4acc66345.jpg.avif': '/images/joe_amar1.avif',
  '/images/b700efec-ec88-449a-bc9e-b05e77819635.jpg.avif': '/images/rosie_amar2.avif',
  '/images/c0d51590-ef48-404d-8ba4-8b838dcf1763.jpg.avif': '/images/luka_rosie_amar1.avif',
  '/images/ce3920b6-47b4-4bb0-8a5f-2ce33d45d9ce.jpg.avif': '/images/luka_amar2.avif',
  '/images/fa878d95-5ce9-4eb8-a982-ce27db48830a.jpg.avif': '/images/rosie_amar1.avif',
  '/images/ff11a901-6855-477c-b2a9-103917035df8.jpg.avif': '/images/luka_amar1.avif',
  '/images/ff42786d-03e6-4002-a11c-24f0103e1b88.jpg.avif': '/images/brandon_amar1.avif',
};

const migrateImages = (storedImages) => {
  const hasOldImages = storedImages.some(img => 
    img.src.includes('IMG_') || img.src.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg\.avif$/)
  );
  
  if (!hasOldImages) return storedImages;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
  return defaultImages;
};

const defaultImages = [
  { id: '101', src: '/images/rosie_o2is3.avif', alt: 'Band Photo' },
  { id: '102', src: '/images/crowd_o2is.avif', alt: 'Band Photo' },
  { id: '103', src: '/images/rosie_o2is2.avif', alt: 'Concert Photo' },
  { id: '104', src: '/images/luka_o2is6.avif', alt: 'Concert Photo' },
  { id: '105', src: '/images/luka_o2is5.avif', alt: 'Concert Photo' },
  { id: '106', src: '/images/rosie_o2is1.avif', alt: 'Concert Photo' },
  { id: '107', src: '/images/kai_o2is3.avif', alt: 'Concert Photo' },
  { id: '108', src: '/images/kai_o2is2.avif', alt: 'Concert Photo' },
  { id: '109', src: '/images/kai_o2is1.avif', alt: 'Concert Photo' },
  { id: '110', src: '/images/kai_o2is1.avif', alt: 'Concert Photo' },
  { id: '111', src: '/images/luka_o2is3.avif', alt: 'Concert Photo' },
  { id: '112', src: '/images/rosie_amar6.avif', alt: 'Concert Photo' },
  { id: '113', src: '/images/luka_o2is2.avif', alt: 'Concert Photo' },
  { id: '114', src: '/images/brandon_o2is.avif', alt: 'Concert Photo' },
  { id: '115', src: '/images/luka_o2is.avif', alt: 'Concert Photo' },
  { id: '116', src: '/images/band_o2is.avif', alt: 'Concert Photo' },
  { id: '117', src: '/images/sc_press4.avif', alt: 'Concert Photo' },
  { id: '118', src: '/images/sc_press3.avif', alt: 'Concert Photo' },
  { id: '119', src: '/images/sc_press2.avif', alt: 'Concert Photo' },
  { id: '120', src: '/images/sc_press1.avif', alt: 'Band Photo' },
  { id: '121', src: '/images/brandon3.jpg.avif', alt: 'Band Photo' },
  { id: '122', src: '/images/rosie_amar6.avif', alt: 'Band Photo' },
  { id: '123', src: '/images/luka_amar6.avif', alt: 'Band Photo' },
  { id: '124', src: '/images/luka_rosie_amar2.avif', alt: 'Band Photo' },
  { id: '125', src: '/images/kai_amar1.avif', alt: 'Band Photo' },
  { id: '126', src: '/images/luka_amar5.avif', alt: 'Band Photo' },
  { id: '127', src: '/images/rosie_amar3.avif', alt: 'Band Photo' },
  { id: '128', src: '/images/luka_amar4.avif', alt: 'Band Photo' },
  { id: '129', src: '/images/rosie_amar4.avif', alt: 'Band Photo' },
  { id: '130', src: '/images/rosie_amar5.avif', alt: 'Band Photo' },
  { id: '131', src: '/images/rosie_amar3.avif', alt: 'Band Photo' },
  { id: '132', src: '/images/brandon_amar1.avif', alt: 'Band Photo' },
  { id: '133', src: '/images/luka_amar3.avif', alt: 'Band Photo' },
  { id: '134', src: '/images/luka_kai_amar2.avif', alt: 'Band Photo' },
  { id: '135', src: '/images/luka_kai_amar1.avif', alt: 'Band Photo' },
  { id: '136', src: '/images/joe_amar1.avif', alt: 'Band Photo' },
  { id: '137', src: '/images/rosie_amar2.avif', alt: 'Band Photo' },
  { id: '138', src: '/images/luka_rosie_amar1.avif', alt: 'Band Photo' },
  { id: '139', src: '/images/luka_amar2.avif', alt: 'Band Photo' },
  { id: '140', src: '/images/rosie_amar1.avif', alt: 'Band Photo' },
  { id: '141', src: '/images/luka_amar1.avif', alt: 'Band Photo' },
  { id: '142', src: '/images/brandon_amar1.avif', alt: 'Band Photo' },
];

export function useGallery() {
  const [images, setImages] = useState(() => {
    if (typeof window === 'undefined') return defaultImages;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          return migrateImages(parsed);
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