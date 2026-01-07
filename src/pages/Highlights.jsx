import { Box, Typography, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandIcon } from '../constants/platforms.jsx';
import { useState } from 'react';

// Latest release specific platform links
const latestReleasePlatforms = [
  {
    name: 'Spotify',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    color: '#1ED760',
    url: 'https://open.spotify.com/track/YOUR_TRACK_ID_HERE'
  },
  {
    name: 'Apple Music',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M11.976 0C5.368 0 0 5.368 0 11.976s5.368 11.976 11.976 11.976 11.976-5.368 11.976-11.976S18.584 0 11.976 0zm5.492 8.531v7.75c0 .418-.34.758-.758.758h-.004c-.418 0-.758-.34-.758-.758v-7.75c0-.418.34-.758.758-.758h.004c.418 0 .758.34.758.758zm-4.5 0v7.75c0 .418-.34.758-.758.758h-.004c-.418 0-.758-.34-.758-.758v-7.75c0-.418.34-.758.758-.758h.004c.418 0 .758.34.758.758zm-4.5 0v7.75c0 .418-.34.758-.758.758h-.004c-.418 0-.758-.34-.758-.758v-7.75c0-.418.34-.758.758-.758h.004c.418 0 .758.34.758.758z"/>
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
    color: '#000000',
    url: 'https://tidal.com/browse/album/YOUR_ALBUM_ID_HERE'
  },
  {
    name: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.06-1.36 1.77-.05.12-.09.24-.11.36-.35 1.64.55 3.37 2.18 3.92.75.27 1.62.21 2.34-.21.84-.53 1.48-1.52 1.6-2.52.03-.18.06-.36.06-.54.01-2.97-.01-5.93-.02-8.9-.05-.3-.09-.61-.15-.91z"/>
      </svg>
    ),
    color: '#EE1D52',
    url: 'https://tiktok.com/@stonecompassmusic/video/YOUR_VIDEO_ID_HERE'
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
      </svg>
    ),
    color: '#DD2A7B',
    url: 'https://www.instagram.com/p/YOUR_POST_ID_HERE'
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