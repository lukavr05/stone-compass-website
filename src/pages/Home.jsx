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
      icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
      ),
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
      url: 'https://music.amazon.com/artists/B0BB8M6B8V/stone-compass',
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
    <path d="M 15.183594 3 C 11.820594 3 8.0848281 4.2580938 7.2988281 8.3710938 C 7.2148281 8.8090937 7.5215469 9.0336562 7.8105469 9.0976562 L 11.224609 9.4453125 C 11.545609 9.4283125 11.801281 9.1304531 11.863281 8.8144531 C 12.157281 7.3974531 13.357125 6.6972656 14.703125 6.6972656 C 15.430125 6.6972656 16.253594 6.9692812 16.683594 7.6132812 C 17.180594 8.3322813 17.097656 9.3095781 17.097656 10.142578 L 17.097656 10.615234 C 15.048656 10.843234 12.376937 10.982406 10.460938 11.816406 C 8.2469375 12.763406 6.6933594 14.695156 6.6933594 17.535156 C 6.6933594 21.169156 9.0171875 23.001953 11.992188 23.001953 C 14.505187 23.001953 15.860781 22.399359 17.800781 20.443359 C 18.441781 21.362359 18.66975 21.81425 19.84375 22.78125 C 20.10775 22.92125 20.440828 22.8955 20.673828 22.6875 L 20.673828 22.71875 C 21.378828 22.09675 22.664766 20.981859 23.384766 20.380859 C 23.671766 20.146859 23.609766 19.781891 23.384766 19.462891 C 22.738766 18.579891 22.076172 17.847031 22.076172 16.207031 L 22.076172 10.771484 C 22.076172 8.4624844 22.232672 6.3263281 20.513672 4.7363281 C 19.156672 3.4483281 16.901594 3 15.183594 3 z M 16.140625 13.425781 C 16.459625 13.404781 16.777656 13.425781 17.097656 13.425781 L 17.097656 14.183594 C 17.098656 15.547594 17.152984 16.668859 16.458984 17.880859 C 15.896984 18.864859 14.993953 19.460938 14.001953 19.460938 C 12.645953 19.460938 11.861328 18.445641 11.861328 16.931641 C 11.861328 14.326641 13.910625 13.570781 16.140625 13.425781 z M 26.080078 22.220703 C 25.171078 22.233703 24.106016 22.424234 23.291016 22.990234 C 23.041016 23.164234 23.077469 23.409953 23.355469 23.376953 C 24.272469 23.267953 26.299063 23.011656 26.664062 23.472656 C 27.028063 23.934656 26.261922 25.832641 25.919922 26.681641 C 25.815922 26.937641 26.041391 27.036797 26.275391 26.841797 C 27.801391 25.577797 28.208484 22.956266 27.896484 22.572266 C 27.741484 22.385266 26.990078 22.207703 26.080078 22.220703 z M 2.1777344 22.701172 C 1.9877344 22.726172 1.9132812 22.973344 2.1132812 23.152344 C 5.5052812 26.184344 9.9770781 28 14.955078 28 C 18.506078 28 22.651094 26.899312 25.496094 24.820312 C 25.966094 24.475313 25.557172 23.943484 25.076172 24.146484 C 21.887172 25.486484 18.401047 26.136719 15.248047 26.136719 C 10.573047 26.136719 6.06525 24.873625 2.40625 22.765625 C 2.32525 22.719625 2.2397344 22.693172 2.1777344 22.701172 z"></path>
    </svg>
      ),
      color: '#FF9900'
    },
    {
      name: 'iTunes',
      icon: <LibraryMusic />,
      url: 'https://music.apple.com/artist/stone-compass/1738926067', // Replace with your iTunes URL
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
    window.open('https://open.spotify.com/playlist/57J7IYmuuzja6p5DWOKFkX', '_blank');
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
