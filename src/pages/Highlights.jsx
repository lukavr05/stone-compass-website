import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { BrandIcon } from '../constants/platforms.jsx';
import { useState } from 'react';
import { useRelease, platformIcons } from '../hooks/useRelease';

export default function Highlights() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const { release } = useRelease();
  const [showLyrics, setShowLyrics] = useState(false);

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
          src={release.coverArt}
          alt="Latest Release Cover"
          className="w-full rounded"
          style={{ boxShadow: isDark ? '0 0 40px rgba(255,255,255,0.19)' : '0 0 40px rgba(0,0,0,0.19)' }}
        />

        <div className="flex flex-col justify-center h-full">
          <span
            className={`block text-sm tracking-[0.2em] ${mutedColor}`}
            style={{ fontFamily: fonts.code }}
          >
            Latest_Release
          </span>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">
            {release.title}
          </h3>

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`
              mt-3 px-5 py-2 rounded text-sm font-bold transition-all duration-300 whitespace-nowrap w-fit
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
                    {release.lyrics}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-6 mt-6">
            {release.platforms.map((platform, index) => (
              <button
                key={index}
                onClick={() => platform.url && window.open(platform.url, '_blank', 'noopener,noreferrer')}
                className={`transition-all duration-250 hover:scale-120 ${textColor}`}
                style={{ color: platform.color }}
              >
                {getIconForPlatform(platform.name)
                  ? <BrandIcon icon={getIconForPlatform(platform.name)} size={26} />
                  : <span style={{ fontSize: '12px' }}>{platform.name}</span>
                }
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getIconForPlatform(name) {
  return platformIcons[name] || null;
}