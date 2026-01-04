import { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Apple, LibraryMusic, Instagram } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const streamingLinks = [
    {
      name: 'Spotify',
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      url: 'https://open.spotify.com/artist/3wUFlvi969GemCVnpuF7eG'
    },
    {
      name: 'Apple Music',
      icon: <Apple />,
      url: 'https://music.apple.com/artist/stone-compass/1738926067'
    },
    {
      name: 'Amazon Music',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="currentColor">
          <path d="M 15.183594 3 C 11.820594 3 8.0848281 4.2580938 7.2988281 8.3710938 C 7.2148281 8.8090937 7.5215469 9.0336562 7.8105469 9.0976562 L 11.224609 9.4453125 C 11.545609 9.4283125 11.801281 9.1304531 11.863281 8.8144531 C 12.157281 7.3974531 13.357125 6.6972656 14.703125 6.6972656 C 15.430125 6.6972656 16.253594 6.9692812 16.683594 7.6132812 C 17.180594 8.3322813 17.097656 9.3095781 17.097656 10.142578 L 17.097656 10.615234 C 15.048656 10.843234 12.376937 10.982406 10.460938 11.816406 C 8.2469375 12.763406 6.6933594 14.695156 6.6933594 17.535156 C 6.6933594 21.169156 9.0171875 23.001953 11.992188 23.001953 C 14.505187 23.001953 15.860781 22.399359 17.800781 20.443359 C 18.441781 21.362359 18.66975 21.81425 19.84375 22.78125 C 20.10775 22.92125 20.440828 22.8955 20.673828 22.6875 L 20.673828 22.71875 C 21.378828 22.09675 22.664766 20.981859 23.384766 20.380859 C 23.671766 20.146859 23.609766 19.781891 23.384766 19.462891 C 22.738766 18.579891 22.076172 17.847031 22.076172 16.207031 L 22.076172 10.771484 C 22.076172 8.4624844 22.232672 6.3263281 20.513672 4.7363281 C 19.156672 3.4483281 16.901594 3 15.183594 3 z M 16.140625 13.425781 C 16.459625 13.404781 16.777656 13.425781 17.097656 13.425781 L 17.097656 14.183594 C 17.098656 15.547594 17.152984 16.668859 16.458984 17.880859 C 15.896984 18.864859 14.993953 19.460938 14.001953 19.460938 C 12.645953 19.460938 11.861328 18.445641 11.861328 16.931641 C 11.861328 14.326641 13.910625 13.570781 16.140625 13.425781 z M 26.080078 22.220703 C 25.171078 22.233703 24.106016 22.424234 23.291016 22.990234 C 23.041016 23.164234 23.077469 23.409953 23.355469 23.376953 C 24.272469 23.267953 26.299063 23.011656 26.664062 23.472656 C 27.028063 23.934656 26.261922 25.832641 25.919922 26.681641 C 25.815922 26.937641 26.041391 27.036797 26.275391 26.841797 C 27.801391 25.577797 28.208484 22.956266 27.896484 22.572266 C 27.741484 22.385266 26.990078 22.207703 26.080078 22.220703 z M 2.1777344 22.701172 C 1.9877344 22.726172 1.9132812 22.973344 2.1132812 23.152344 C 5.5052812 26.184344 9.9770781 28 14.955078 28 C 18.506078 28 22.651094 26.899312 25.496094 24.820312 C 25.966094 24.475313 25.557172 23.943484 25.076172 24.146484 C 21.887172 25.486484 18.401047 26.136719 15.248047 26.136719 C 10.573047 26.136719 6.06525 24.873625 2.40625 22.765625 C 2.32525 22.719625 2.2397344 22.693172 2.1777344 22.701172 z"/>
        </svg>
      ),
      url: 'https://music.amazon.com/artists/B0BB8M6B8V/stone-compass'
    },
    {
      name: 'Bandcamp',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 18.75l7.437-13.5h16.563l-7.437 13.5z"/>
        </svg>
      ),
      url: 'https://stonecompass.bandcamp.com/'
    },
    {
      name: 'TikTok',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://tiktok.com/@stonecompassmusic'
    },
  ];

  const handleListenNowClick = () => {
    // Optional: could do something on click if needed
  };

  const handlePlatformClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      overflow: 'auto'
    }}>
      {/* Load Konkhmer Sleokchher font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Konkhmer+Sleokchher&display=swap');
          
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes noise {
            0%, 100% { background-position: 0 0; }
            10% { background-position: -5% -10%; }
            20% { background-position: -15% 5%; }
            30% { background-position: 7% -25%; }
            40% { background-position: 20% 25%; }
            50% { background-position: -25% 10%; }
            60% { background-position: 15% 5%; }
            70% { background-position: 0 15%; }
            80% { background-position: 25% 35%; }
            90% { background-position: -10% 10%; }
          }
          
          .dither-effect {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            animation: noise 0.2s infinite;
          }
          
          .terminal-font {
            font-family: 'Courier New', Courier, monospace;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          
          .logo-text {
            font-family: 'Konkhmer Sleokchher', cursive;
            text-transform: lowercase;
            letter-spacing: 0.1em;
          }
        `}
      </style>

      {/* Dither overlay */}
      <Box className="dither-effect" sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Main Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        {/* Logo */}
        <Box
          component="img"
          src="/STONE COMPASS.png"
          alt="Stone Compass"
          className="logo-text"
          sx={{
            width: 'clamp(300px, 80vw, 800px)',
            height: 'auto',
            marginBottom: '4rem',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
          }}
        />

        {/* Listen Now Button */}
        <Box
          component={motion.div}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            component={motion.div}
            animate={{
              width: isExpanded ? '400px' : '280px',
              backgroundColor: isExpanded ? '#ffffff' : 'transparent',
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut'
            }}
            className="terminal-font"
            sx={{
              color: isExpanded ? '#000000' : '#ffffff',
              border: '2px solid #ffffff',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              cursor: 'pointer',
              boxShadow: isExpanded ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {isExpanded && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                animation: 'scanline 1s linear infinite'
              }} />
            )}
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
                  &gt; listen_now
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
                  {streamingLinks.map((platform, index) => (
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
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
                          }
                        }}
                      >
                        {platform.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {/* Terminal cursor effect */}
        <Typography className="terminal-font" sx={{
          marginTop: '4rem',
          fontSize: '1rem',
          opacity: 0.7
        }}>
          <span style={{ animation: 'flicker 1s infinite' }}>_</span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
