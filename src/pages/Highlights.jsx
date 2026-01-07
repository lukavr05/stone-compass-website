import { Box, Typography, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { platforms, BrandIcon } from '../constants/platforms.jsx';
import { useState } from 'react';

export default function Highlights() {
  const [showLyrics, setShowLyrics] = useState(false);

  const lyrics = `there's no
there's no comfort in my bed
because i'm
haunted by
all the things i've left unsaid

oh i've heard it all before
you can find me on the floor
because time won't
heal the scars
if i forget it

i know i can't be something
that lasts forever
but i hop i made you smile

i know that these words 
betray my mind
and every conversation 
ends in goodbye

i've heard it all before
and you can find me on the floor
because time on't dim the stars
if i don't let it
`;

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };
  return (
    <Box
      id="release"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 8 }
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '420px 1fr' },
          gap: '3rem',
          maxWidth: '1400px',
          mx: 'auto'
        }}
      >
        {/* Cover Art */}
        <Box
          component="img"
          src="/images/find_me_on_the_floor_cover.JPEG"
          alt="Latest Release Cover"
          sx={{
            width: '100%',
            borderRadius: '4px',
            boxShadow: '0 0 40px rgba(255,255,255,0.15)'
          }}
        />

        {/* Info */}
        <Box>
          {/* Header with Title and Button */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="overline"
                sx={{ 
                  letterSpacing: '0.2em',
                  color: '#aaa',
                  fontFamily: '"Cascadia Code", monospace',
                }}
              >
                Latest Release
              </Typography>

              <Typography
                variant="h3"
                sx={{ mt: 1, fontWeight: 'bold' }}
              >
                find me on the floor
              </Typography>
            </Box>

            {/* View Lyrics Button */}
            <Button
              variant="outlined"
              onClick={toggleLyrics}
              sx={{
                mt: 1,
                borderColor: '#aaa',
                color: '#aaa',
                fontFamily: '"Cascadia Code", monospace',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '0.9rem',
                padding: '8px 20px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: '#fff',
                  borderColor: '#fff',
                  boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                }
              }}
            >
              {showLyrics ? 'hide hyrics' : 'show lyrics'}
            </Button>
          </Box>

          {/* Lyrics Display */}
          <AnimatePresence>
            {showLyrics && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '520px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography
                    component="pre"
                    sx={{
                      fontFamily: '"Cascadia Code", monospace',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.85)',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      margin: 0
                    }}
                  >
                    {lyrics}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Platforms */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {platforms.map(({ icon, color, url }) => (
              <IconButton
                key={url}
                onClick={() => window.open(url, '_blank')}
                sx={{
                  color: '#fff',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color,
                    transform: 'scale(1.2)',
                  }
                }}
              >
                <BrandIcon icon={icon} size={26} />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
