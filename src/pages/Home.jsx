import { Box, Typography, Button } from "@mui/material"
import { 
  PlayArrow, 
  MusicNote,
  Instagram,
  Apple,
  LibraryMusic
} from '@mui/icons-material'
import Highlights from "./Highlights";

function Home() {
  // Social media and streaming platform links
  const socialLinks = [
    {
      name: 'Spotify',
      icon: <MusicNote />,
      url: 'https://open.spotify.com/artist/3wUFlvi969GemCVnpuF7eG', // Replace with your Spotify URL
      color: '#1DB954'
    },
    {
      name: 'Apple Music',
      icon: <Apple />,
      url: 'https://music.apple.com/artist/stone-compass/1738926067', // Replace with your Apple Music URL
      color: '#FA243C'
    },
    {
      name: 'Amazon Music',
      url: 'https://music.amazon.com/artists/your-artist-id', // Replace with your Amazon Music URL
      color: '#FF9900'
    },
    {
      name: 'iTunes',
      icon: <LibraryMusic />,
      url: 'https://music.apple.com/artist/your-artist-id', // Replace with your iTunes URL
      color: '#A855F7'
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      url: 'https://instagram.com/stonecompassmusic', // Replace with your Instagram URL
      color: '#E4405F'
    },
    {
      name: 'TikTok',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://tiktok.com/@stonecompassmusic', // Replace with your TikTok URL
      color: '#000000'
    },
    {
      name: 'Bandcamp',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 18.75l7.437-13.5h16.563l-7.437 13.5z"/>
        </svg>
      ),
      url: 'https://your-band.bandcamp.com', // Replace with your Bandcamp URL
      color: '#629AA0'
    }
  ];

  const handleListenNowClick = () => {
    // Replace with your preferred link (Spotify, Linktree, etc.)
    window.open('https://linktr.ee/your-band', '_blank');
  };

  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
          pt: 8
        }}
      >
        {/* Animated Band Name Title */}
        <Box
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '6rem', lg: '8rem' },
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'black',
            mb: 4,
            textTransform: 'lowercase',
            lineHeight: 0.9,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '@keyframes fontCycle': {
              '0%': { fontFamily: '"Cutive Mono", monospace' },
              '20%': { fontFamily: '"Chivo Mono", monospace' },
              '40%': { fontFamily: '"Doto", monospace' },
              '60%': { fontFamily: '"Ubuntu Mono", monospace' },
              '80%': { fontFamily: '"Fira Code", monospace' },
              '100%': { fontFamily: '"Cutive Mono", monospace' }
            }
          }}
        >
          {['s','t','o','n','e',' ','c','o','m','p','a','s','s'].map((letter, index) => {
            // Random delays to break the wave pattern
            const randomDelays = [0, 2.3, 4.7, 1.1, 3.8, 0.5, 2.9, 4.2, 0.7, 3.1, 1.6, 4.5, 2.0];
            return (
              <Box
                key={index}
                component="span"
                sx={{
                  display: 'inline-block',
                  animation: `fontCycle 6s infinite ease-in-out`,
                  animationDelay: `${randomDelays[index]}s`,
                  minWidth: letter === ' ' ? '0.5em' : 'auto'
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </Box>
            );
          })}
        </Box>

        {/* Listen Now Button */}
        <Button
          onClick={handleListenNowClick}
          startIcon={<PlayArrow />}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#000000',
            color: 'white',
            position: 'relative',
            top: '80%',
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '50px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#333333',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
            },
            '&:active': {
              transform: 'translateY(0px)',
            }
          }}
        >
          Listen Now
        </Button>
      </Box>

      {/* Social Media Icons Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 2, sm: 3, md: 4 },
          pb: 4,
          px: 2,
          flexWrap: 'wrap'
        }}
      >
        {socialLinks.map((platform) => (
          <Box
            key={platform.name}
            component="a"
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.05)',
              color: platform.color,
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': {
                transform: 'scale(1.1) translateY(-2px)',
                backgroundColor: platform.color,
                color: 'white',
                boxShadow: `0 8px 32px ${platform.color}40`,
              },
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
            {platform.icon}
          </Box>
        ))}
      </Box>
    </Box>

    <Box
        sx={{
          backgroundColor: 'background.default',
          borderTop: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Highlights />
    </Box>
    </>
  );
}

export default Home;
