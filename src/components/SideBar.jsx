import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

function SideBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'release', label: 'latest' },
    { id: 'events', label: 'events' },
    { id: 'media', label: 'media' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100vh (past hero section)
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > window.innerHeight);

      // Determine active section
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
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          component={motion.nav}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              sx={{
                color: activeSection === item.id ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Cascadia Code", monospace',
                fontSize: '0.9rem',
                fontWeight: activeSection === item.id ? 'bold' : 'normal',
                textTransform: 'lowercase',
                padding: '0.5rem 1rem',
                minWidth: 'auto',
                justifyContent: 'flex-start',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: activeSection === item.id ? '100%' : '0%',
                  backgroundColor: '#fff',
                  transition: 'height 0.3s ease',
                  borderRadius: '0 2px 2px 0',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}
    </AnimatePresence>
  );
}

export default SideBar;
