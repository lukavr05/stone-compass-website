import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  Grid, 
  Container
} from "@mui/material"
import { 
  PlayArrow
} from '@mui/icons-material'

function Highlights() {
  // YouTube videos data - replace with your actual video data
  const youtubeVideos = [
    {
      id: '1',
      title: 'Stone Compass (Live at ACM Studio Lounge)',
      thumbnail: 'images/scpromo1.JPEG', // Replace with actual video ID
      videoId: 'WoPssh0v0yM', // Replace with actual video ID
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Artificial Moon (Lyric Video)',
      thumbnail: 'https://img.youtube.com/vi/pUGQ7wZAF1g/maxresdefault.jpg', // Replace with actual video ID
      videoId: 'pUGQ7wZAF1g', // Replace with actual video ID
      uploadDate: '2024-01-08'
    },
  ];

  const recentSingles = [
    {
      id: '1',
      title: 'night',
      coverArt: 'images/night.jpg',
      releaseDate: '2025-07-31',
      streamingLinks: {
        spotify: 'https://open.spotify.com/track/65muv5C7mzTehaBM6hxpPh'
      }
    },
    {
      id: '2',
      title: 'reflection',
      coverArt: '/api/placeholder/400/400', // Replace with actual cover art URL
      releaseDate: '2025-04-17',
      streamingLinks: {
        spotify: 'https://open.spotify.com/track/2lDRqbv6sRTlbq4PM8oVgR'
      }
    },
  ];

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleSingleClick = (url) => {
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 300,
            color: 'text.primary',
            mb: 8,
            textAlign: 'center',
            letterSpacing: '0.05em'
          }}
        >
          Latest Releases
        </Typography>
        
        <Grid container spacing={6}>
          {recentSingles.map((single) => (
            <Grid item xs={12} sm={4} key={single.id}>
              <Box
                onClick={() => handleSingleClick(single.streamingLinks.spotify)}
                sx={{
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={single.coverArt}
                  alt={single.title}
                  sx={{ 
                    height: 400,
                    width: 400,
                    aspectRatio: '1/1',
                    backgroundColor: 'grey.100',
                    mb: 3,
                    borderRadius: 0
                  }}
                />
                
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 30,
                    fontWeight: 400,
                    color: 'text.primary',
                    mb: 1,
                    lineHeight: 1.4
                  }}
                >
                  {single.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontWeight: 300 }}
                >
                  {formatDate(single.releaseDate)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Videos Section */}
      <Box sx={{ mb: 16 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 300,
            color: 'text.primary',
            mb: 8,
            textAlign: 'center',
            letterSpacing: '0.05em'
          }}
        >
          Videos
        </Typography>
        
        <Grid container spacing={6}>
          {youtubeVideos.map((video) => (
            <Grid item xs={12} md={4} key={video.id}>
              <Box
                onClick={() => handleVideoClick(video.videoId)}
                sx={{
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{ 
                      aspectRatio: '16/9',
                      backgroundColor: 'grey.100',
                      borderRadius: 0
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <PlayArrow sx={{ color: 'black', fontSize: 24, ml: 0.5 }} />
                  </Box>
                </Box>
                
                <Typography
                  variant="body1"
                  sx={{ 
                    fontWeight: 400,
                    color: 'text.primary',
                    mb: 1,
                    lineHeight: 1.4
                  }}
                >
                  {video.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontWeight: 300 }}
                >
                  {formatDate(video.uploadDate)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Container>
  );
}

export default Highlights;
