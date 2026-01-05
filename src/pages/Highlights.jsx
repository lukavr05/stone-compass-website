import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { platforms, BrandIcon } from '../constants/platforms.jsx';

export default function Highlights() {
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
          maxWidth: '1200px',
          mx: 'auto'
        }}
      >
        {/* Cover Art */}
        <Box
          component="img"
          src="/images/reflection.JPEG"
          alt="Latest Release Cover"
          sx={{
            width: '100%',
            borderRadius: '4px',
            boxShadow: '0 0 40px rgba(255,255,255,0.15)'
          }}
        />

        {/* Info */}
        <Box>
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.2em', opacity: 0.7 }}
          >
            Latest Release
          </Typography>

          <Typography
            variant="h3"
            sx={{ mt: 1, fontWeight: 'bold' }}
          >
            RELEASE TITLE
          </Typography>

          <Typography sx={{ mt: 2, maxWidth: '520px', opacity: 0.85 }}>
            A short description of the track or EP — tone, mood, or concept.
          </Typography>

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
                    filter: `drop-shadow(0 0 8px ${color})`
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

