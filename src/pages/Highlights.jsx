import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { BrandIcon } from '../constants/platforms.jsx';
import { useState } from 'react';
import {
  siSpotify,
  siApplemusic,
  siTidal,
  siYoutubemusic,
} from 'simple-icons';

const latestReleasePlatforms = [
  {
    name: 'Spotify',
    icon: siSpotify,
    color: '#1ED760',
    url: 'https://open.spotify.com/track/YOUR_TRACK_ID_HERE'
  },
  {
    name: 'Apple Music',
    icon: siApplemusic,
    color: '#FA243C',
    url: 'https://music.apple.com/albums/YOUR_ALBUM_ID_HERE'
  },
  {
    name: 'Amazon Music',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
        <path d="M15.183594 3C11.820594 3 8.0848281 4.2580938 7.2988281 8.3710938 7.2148281 8.8090937 7.5215469 9.0336562 7.8105469 9.0976562 L11.224609 9.4453125C11.545609 9.4283125 11.801281 9.1304531 11.863281 8.8144531 12.157281 7.3974531 13.357125 6.6972656 14.703125 6.6972656 15.430125 6.6972656 16.253594 6.9692812 16.683594 7.6132812 17.180594 8.3322813 17.097656 9.3095781 17.097656 10.142578 L17.097656 10.615234C15.048656 10.843234 12.376937 10.982406 10.460938 11.816406 8.2469375 12.763406 6.6933594 14.695156 6.6933594 17.535156 6.6933594 21.169156 9.0171875 23.001953 11.992188 23.001953 14.505187 23.001953 15.860781 22.399359 17.800781 20.443359 18.441781 21.362359 18.66975 21.81425 19.84375 22.78125 20.10775 22.92125 20.440828 22.8955 20.673828 22.6875 L20.673828 22.71875C21.378828 22.09675 22.664766 20.981859 23.384766 20.380859 23.671766 20.146859 23.609766 19.781891 23.384766 19.462891 22.738766 18.579891 22.076172 17.847031 22.076172 16.207031 L22.076172 10.771484C22.076172 8.4624844 22.232672 6.3263281 20.513672 4.7363281 19.156672 3.4483281 16.901594 3 15.183594 3z M16.140625 13.425781C16.459625 13.404781 16.777656 13.425781 17.097656 13.425781 L17.097656 14.183594C17.098656 15.547594 17.152984 16.668859 16.458984 17.880859 15.896984 18.864859 14.993953 19.460938 14.001953 19.460938 12.645953 19.460938 11.861328 18.445641 11.861328 16.931641 11.861328 14.326641 13.910625 13.570781 16.140625 13.425781z"/>
      </svg>
    ),
    color: '#0077C1',
    url: 'https://music.amazon.com/albums/YOUR_ALBUM_ID_HERE'
  },
  {
    name: 'Bandcamp',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 18.75l7.437-13.5h16.563l-7.437 13.5z"/>
      </svg>
    ),
    color: '#408294',
    url: 'https://stonecompass.bandcamp.com/album/YOUR_ALBUM_NAME_HERE'
  },
  {
    name: 'TIDAL',
    icon: siTidal,
    color: '#00FFFF',
    url: 'https://tidal.com/browse/album/YOUR_ALBUM_ID_HERE'
  },
  {
    name: 'YouTube Music',
    icon: siYoutubemusic,
    color: '#FF0000',
    url: 'https://www.youtube.com/channel/UCDxrFlpeL4LB40u27yVfXjg'
  }
];

export default function Highlights() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const [showLyrics, setShowLyrics] = useState(false);

  const lyrics = `there's no
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
if i don't let it`;

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const glassBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const glassBorder = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <div
      id="release"
      className={`min-h-screen ${bgColor} ${textColor} flex items-center px-4 sm:px-6 md:px-16 py-12 md:py-0 scroll-snap-start`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-6 md:gap-8 max-w-[1400px] mx-auto w-full"
      >
        <img
          src="/images/find_me_on_the_floor_cover.JPEG"
          alt="Latest Release Cover"
          className="w-full rounded"
          style={{ boxShadow: isDark ? '0 0 40px rgba(255,255,255,0.19)' : '0 0 40px rgba(0,0,0,0.19)' }}
        />

        <div>
          <span
            className={`block text-sm tracking-[0.2em] ${mutedColor}`}
            style={{ fontFamily: fonts.code }}
          >
            Latest_Release
          </span>

          <h3 className="text-2xl font-bold mt-1">
            find me on the floor
          </h3>

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`
              mt-3 px-5 py-2 rounded text-sm font-bold transition-all duration-300 whitespace-nowrap
              border ${isDark ? 'border-gray-400 text-gray-400 hover:border-white hover:text-white' : 'border-gray-600 text-gray-600 hover:border-black hover:text-black'}
            `}
            style={{ fontFamily: fonts.code }}
          >
            {showLyrics ? 'hide_lyrics' : 'show_lyrics'}
          </button>

          <AnimatePresence>
            {showLyrics && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 p-4 rounded-lg border ${glassBorder} ${glassBg} backdrop-blur-sm max-w-[520px]`}
                >
                  <pre
                    className={`text-sm leading-relaxed ${mutedColor}`}
                    style={{ fontFamily: fonts.code, whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}
                  >
                    {lyrics}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2 mt-6">
            {latestReleasePlatforms.map(({ icon, color, url }) => (
              <button
                key={url}
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                className={`transition-all duration-250 hover:scale-120 ${textColor}`}
                style={{ color }}
              >
                <BrandIcon icon={icon} size={26} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}