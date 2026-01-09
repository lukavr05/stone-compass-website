import { Box, Typography, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandIcon } from '../constants/platforms.jsx';
import { useState } from 'react';
import {
  siSpotify,
  siApplemusic,
  siTidal,
  siYoutubemusic,
} from 'simple-icons';

// Latest release specific platform links (same as home page but excluding TikTok and Instagram)
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
        <path d="M15.183594 3C11.820594 3 8.0848281 4.2580938 7.2988281 8.3710938 7.2148281 8.8090937 7.5215469 9.0336562 7.8105469 9.0976562 L11.224609 9.4453125C11.545609 9.4283125 11.801281 9.1304531 11.863281 8.8144531 12.157281 7.3974531 13.357125 6.6972656 14.703125 6.6972656 15.430125 6.6972656 16.253594 6.9692812 16.683594 7.6132812 17.180594 8.3322813 17.097656 9.3095781 17.097656 10.142578 L17.097656 10.615234C15.048656 10.843234 12.376937 10.982406 10.460938 11.816406 8.2469375 12.763406 6.6933594 14.695156 6.6933594 17.535156 6.6933594 21.169156 9.0171875 23.001953 11.992188 23.001953 14.505187 23.001953 15.860781 22.399359 17.800781 20.443359 18.441781 21.362359 18.66975 21.81425 19.84375 22.78125 20.10775 22.92125 20.440828 22.8955 20.673828 22.6875 L20.673828 22.71875C21.378828 22.09675 22.664766 20.981859 23.384766 20.380859 23.671766 20.146859 23.609766 19.781891 23.384766 19.462891 22.738766 18.579891 22.076172 17.847031 22.076172 16.207031 L22.076172 10.771484C22.076172 8.4624844 22.232672 6.3263281 20.513672 4.7363281 19.156672 3.4483281 16.901594 3 15.183594 3z M16.140625 13.425781C16.459625 13.404781 16.777656 13.425781 17.097656 13.425781 L17.097656 14.183594C17.098656 15.547594 17.152984 16.668859 16.458984 17.880859 15.896984 18.864859 14.993953 19.460938 14.001953 19.460938 12.645953 19.460938 11.861328 18.445641 11.861328 16.931641 11.861328 14.326641 13.910625 13.570781 16.140625 13.425781z M26.080078 22.220703C25.171078 22.233703 24.106016 22.424234 23.291016 22.990234 23.041016 23.164234 23.077469 23.409953 23.355469 23.376953 24.272469 23.267953 26.299063 23.011656 26.664062 23.472656 27.028063 23.934656 26.261922 25.832641 25.919922 26.681641 25.815922 26.937641 26.041391 27.036797 26.275391 26.841797 27.801391 25.577797 28.208484 22.956266 27.896484 22.572266 27.741484 22.385266 26.990078 22.207703 26.080078 22.220703z M2.1777344 22.701172C1.9877344 22.726172 1...."/>
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
        px: { xs: 3, md: 8 },
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal',
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
          {/* Header with Title */}
          <Box>
            <Typography
              variant="overline"
              sx={{ 
                letterSpacing: '0.2em',
                color: '#aaa',
                fontFamily: '"Cascadia Code", monospace',
                fontSize: '1rem',
              }}
            >
              Latest_Release
            </Typography>

            <Typography
              variant="h3"
              sx={{ 
                mt: 1, 
                fontWeight: 'bold',
                fontSize: '2.2rem',
              }}
            >
              find me on the floor
            </Typography>

            {/* View Lyrics Button */}
            <Button
              variant="outlined"
              onClick={toggleLyrics}
              sx={{
                mt: 2,
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
              {showLyrics ? 'hide_hyrics' : 'show_lyrics'}
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
            {latestReleasePlatforms.map(({ icon, color, url }) => (
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
