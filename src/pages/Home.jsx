import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import Highlights from './Highlights';
import Events from './Events.jsx';
import Media from './Media.jsx';
import { platforms, BrandIcon } from '../constants/platforms.jsx';

function Home() {
  const { themeName } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = themeName === 'dark';

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);

  const handlePlatformClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const bgColor = isDark ? 'bg-black' : 'bg-white';

  return (
    <div
      className={`min-h-screen flex flex-col ${bgColor} overflow-auto relative scroll-snap-y scroll-smooth`}
      style={{ fontFamily: fonts.courier }}
    >
      <div
        id="home"
        className="h-[74vh] relative overflow-hidden"
      >
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 -top-[20%] bg-cover bg-top"
          style={{ backgroundImage: 'url(/images/rehersal2.JPEG)' }}
        />
      </div>

      <div
        className={`h-[26vh] ${bgColor} flex items-start pl-8 pt-12 md:pl-16`}
      >
        <motion.div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <motion.div
            animate={{
              width: isExpanded ? '600px' : '240px',
              backgroundColor: isExpanded ? (isDark ? '#ffffff' : '#1976d2') : 'transparent',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`
              ${isExpanded ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-white' : 'text-black')}
              border-2 ${isDark ? 'border-white' : 'border-black'} rounded-md h-[60px] text-[1.8rem] font-bold lowercase cursor-pointer relative overflow-hidden flex items-center pl-8 transition-all duration-300
              ${isExpanded ? 'shadow-[0_0_20px_rgba(255,255,255,0.5)]' : ''}
            `}
            style={{ fontFamily: fonts.code }}
          >
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  listen_now
                </motion.span>
              ) : (
                <motion.div
                  key="icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="flex items-center gap-4 relative z-10"
                >
                  {platforms.map((platform, index) => (
                    <motion.div
                      key={platform.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1 + (index * 0.05)
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlatformClick(platform.url);
                        }}
                        className={`transition-all duration-250 hover:scale-110 ${isExpanded ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-white' : 'text-black')}`}
                        style={{ color: isExpanded ? undefined : platform.color }}
                      >
                        <BrandIcon icon={platform.icon} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <img
        src="/STONE COMPASS.png"
        alt="Stone Compass"
        className="absolute left-8 md:left-16 z-10 w-[600px] md:w-[700px] lg:w-[960px] h-auto"
        style={{
          top: isDark ? '53vh' : '53vh',
        }}
      />
      <Highlights />
      <Events />
      <Media />
    </div>
  );
}

export default Home;