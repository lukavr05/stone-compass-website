 
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';

function SideBar() {
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
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > window.innerHeight);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = scrollPosition + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const textColor = isDark ? 'text-white' : 'text-black';
  const secondaryColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const activeColor = isDark ? 'font-bold' : 'font-semibold';
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-black/10';
  const indicatorBg = isDark ? 'bg-white' : 'bg-black';
  const navBg = isDark ? 'bg-black/30' : 'bg-white/30';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-8 top-[38%] -translate-y-1/2 z-50 flex flex-col gap-1 ${navBg} backdrop-blur-sm px-4 py-6 rounded-xl border ${borderColor} hidden md:flex`}
          style={{ fontFamily: fonts.code }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative px-4 py-2 text-sm lowercase transition-all duration-300 text-left
                ${activeSection === item.id ? `${textColor} ${activeColor}` : secondaryColor}
                ${hoverBg} rounded
              `}
              style={{ fontFamily: fonts.code, minWidth: 'auto' }}
            >
              {activeSection === item.id && (
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-full ${indicatorBg} rounded-r`}
                  style={{ transition: 'height 0.3s ease' }}
                />
              )}
              {item.label}
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default SideBar;