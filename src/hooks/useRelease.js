import { useState, useEffect } from 'react';
import {
  siSpotify,
  siApplemusic,
  siBandcamp,
  siTidal,
  siYoutubemusic,
} from 'simple-icons';

const STORAGE_KEY = 'stone-compass-release';

const platformIcons = {
  'Spotify': siSpotify,
  'Apple Music': siApplemusic,
  'Bandcamp': siBandcamp,
  'TIDAL': siTidal,
  'YouTube Music': siYoutubemusic,
};

const defaultRelease = {
  title: 'find me on the floor',
  coverArt: '/images/find_me_on_the_floor_cover.JPEG',
  lyrics: `there's no
there's no comfort in my bed
because i'm
haunted by
all the things i've left unsaid

oh i've heard it all before
you can find me on the floor
because time won't heal the scars
if i forget it

i know i can't be something
that lasts forever
but i hope i made you smile

i know that these words 
betray my mind
and every conversation 
ends in goodbye

i've heard it all before
and you can find me on the floor
because time won't dim the stars
if i don't let it`,
  platforms: [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/3wUFlvi969GemCVnpuF7eG', color: '#1ED760', icon: 'Spotify' },
    { name: 'Apple Music', url: 'https://music.apple.com/artist/stone-compass/1738926067', color: '#FA243C', icon: 'Apple Music' },
    { name: 'Bandcamp', url: 'https://stonecompass.bandcamp.com/', color: '#408294', icon: 'Bandcamp' },
    { name: 'TIDAL', url: 'https://tidal.com/artist/46884128', color: '#00FFFF', icon: 'TIDAL' },
    { name: 'YouTube Music', url: 'https://www.youtube.com/channel/UCDxrFlpeL4LB40u27yVfXjg', color: '#FF0000', icon: 'YouTube Music' },
  ],
};

export function useRelease() {
  const [release, setRelease] = useState(() => {
    if (typeof window === 'undefined') return defaultRelease;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultRelease;
      }
    }
    return defaultRelease;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(release));
  }, [release]);

  const updateRelease = (updates) => {
    setRelease((prev) => ({ ...prev, ...updates }));
  };

  const updatePlatform = (index, updates) => {
    setRelease((prev) => {
      const newPlatforms = [...prev.platforms];
      newPlatforms[index] = { ...newPlatforms[index], ...updates };
      return { ...prev, platforms: newPlatforms };
    });
  };

  const addPlatform = (platform) => {
    setRelease((prev) => ({
      ...prev,
      platforms: [...prev.platforms, platform],
    }));
  };

  const removePlatform = (index) => {
    setRelease((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((_, i) => i !== index),
    }));
  };

  return {
    release,
    updateRelease,
    updatePlatform,
    addPlatform,
    removePlatform,
  };
}

export { platformIcons };
export default useRelease;