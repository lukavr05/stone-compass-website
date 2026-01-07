import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Highlights from './Highlights';
import { platforms, BrandIcon } from '../constants/platforms.jsx';

function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollY } = useScroll();

  // Moves image slower than scroll (parallax)
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);


  const handlePlatformClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: '"Courier New", Courier, monospace',
      overflow: 'auto',
      position: 'relative'
    }}>
      
      <Box
        component={motion.div}
        sx={{
          height: '74vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          component={motion.div}
          style={{ y: yParallax }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120%',
            backgroundImage: 'url(/images/scpromo3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            willChange: 'transform'
          }}
        />
      </Box>


      {/* Bottom 1/3 - Black */}
      <Box sx={{
        height: '26vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: { xs: '2rem', md: '4rem' },
        paddingTop: '3rem'
      }}>
        {/* Listen Now Button */}
        <Box
          component={motion.div}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <Box
            component={motion.div}
            animate={{
              width: isExpanded ? '560px' : '244px',
              backgroundColor: isExpanded ? '#ffffff' : 'transparent',
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut'
            }}
            
            sx={{
              color: isExpanded ? '#000000' : '#ffffff',
              border: '2px solid #ffffff',
              borderRadius: '5px',
              height: '60px',
              fontFamily: '"Cascadia Code", monospace',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: isExpanded ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '2rem',
              transition: 'color 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'relative', zIndex: 1 }}
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
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    position: 'relative',
                    zIndex: 1
                  }}
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
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlatformClick(platform.url);
                        }}
                        sx={{
                          color: 'inherit',
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            color: platform.color,
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <BrandIcon icon={platform.icon} />
                      </IconButton>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      {/* Logo - positioned above the black section with padding */}
      <Box
        component="img"
        src="/STONE COMPASS.png"
        alt="Stone Compass"
        sx={{
          position: 'absolute',
          left: { xs: '2rem', md: '4rem' },
          top: {xs: '53vh', md: '50vh', lg: '44vh'},
          width: { xs: '600px', md: '700px', lg: '960px' },
          height: 'auto',
          zIndex: 10
        }}
      />
      <Highlights />
    </Box>
  );
}

export default Home;
