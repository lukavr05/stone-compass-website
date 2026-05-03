import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';

function BottomNav() {
  const { themeName } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDark = themeName === 'dark';

  const navItems = useMemo(() => [
    { id: 'home', label: 'home' },
    { id: 'release', label: 'latest' },
    { id: 'events', label: 'events' },
    { id: 'media', label: 'media' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navBg = isDark ? 'bg-black/70' : 'bg-white/70';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-0 left-0 right-0 z-50 flex md:hidden
            ${navBg} backdrop-blur-md border-t ${borderColor}
            px-2 py-2 pb-safe`}
          style={{ fontFamily: fonts.code }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex-1 py-2 text-sm lowercase transition-colors
                ${activeSection === item.id
                  ? `${textColor} font-semibold`
                  : mutedColor}`}
            >
              {item.label}
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default BottomNav;