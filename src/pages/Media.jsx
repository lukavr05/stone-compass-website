import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

function Media() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sample media data - replace with your actual images
  const mediaItems = [
    {
      id: 1,
      src: 'images/luka1.jpg',
      alt: 'Stone Compass Live Performance',
      title: 'Live at ACM Studio',
      rows: 2,
      cols: 1,
    },
    {
      id: 2,
      src: 'images/scpromo2.jpg',
      alt: 'Night Single Cover',
      title: 'Night - Single Cover',
      rows: 1,
      cols: 1,
    },
    {
      id: 3,
      src: 'images/scpromo4.jpg',
      alt: 'Reflection Single Cover',
      title: 'Reflection - Single Cover',
      rows: 1,
      cols: 1,
    },
    // Add more images with varying dimensions
    {
      id: 4,
      src: 'images/IMG_1646.jpg',
      alt: 'Concert Photo',
      title: 'Live Performance',
      rows: 2,
      cols: 1,
    },
    {
      id: 5,
      src: 'images/IMG_6009.JPG',
      alt: 'Behind the Scenes',
      title: 'Home Recording',
      rows: 1,
      cols: 2,
    },
    {
      id: 6,
      src: 'images/IMG_6151.JPG',
      alt: 'Band Photo',
      title: 'Band Portrait',
      rows: 1,
      cols: 1,
    },
    {
      id: 7,
      src: 'images/IMG_6107.JPG',
      alt: 'Festival Performance',
      title: 'Festival Show',
      rows: 2,
      cols: 1,
    },
    {
      id: 8,
      src: 'images/scpromo3.jpg',
      alt: 'Recording Session',
      title: 'In the Studio',
      rows: 1,
      cols: 1,
    },
    {
      id: 9,
      src: 'images/IMG_5636.JPEG',
      alt: 'Venue Photo',
      title: 'Venue Performance',
      rows: 3,
      cols: 1,
    },
    {
      id: 10,
      src: 'images/IMG_5449.JPG',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    },
    {
      id: 11,
      src: 'images/IMG_6117.JPG',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    },
    {
      id: 12,
      src: 'images/rosie.jpg',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    },
    {
      id: 13,
      src: 'images/IMG_6103.JPG',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    },
    {
      id: 14,
      src: 'images/IMG_6168.JPG',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    },
    {
      id: 15,
      src: 'images/IMG_6179.JPG',
      alt: 'Equipment Setup',
      title: 'Gear Setup',
      rows: 1,
      cols: 2,
    }
  ];

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setSelectedIndex(0);
  };

  const handlePrevImage = () => {
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : mediaItems.length - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(mediaItems[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = selectedIndex < mediaItems.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(nextIndex);
    setSelectedImage(mediaItems[nextIndex]);
  };

  // Determine number of columns based on screen size
  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 2,
            letterSpacing: '0.05em'
          }}
        >
          Media Gallery
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 300,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Behind the scenes, live performances, and moments from our musical journey
        </Typography>
      </Box>

      {/* Masonry Image Grid */}
      <ImageList
        cols={getColumns()}
        gap={16}
        variant="masonry"
        sx={{
          mb: 4,
          '& .MuiImageListItem-root': {
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }
          }
        }}
      >
        {mediaItems.map((item, index) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleImageClick(item, index)}
            sx={{
              '& img': {
                transition: 'all 0.3s ease',
              },
              '&:hover img': {
                filter: 'brightness(1.1)',
              }
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Image Dialog/Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
          }
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            backgroundColor: 'transparent'
          }}
        >
          {selectedImage && (
            <>
              {/* Close Button */}
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Previous Button */}
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <ChevronLeft />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <ChevronRight />
              </IconButton>

              {/* Main Image */}
              <Box
                component="img"
                src={selectedImage.src}
                alt={selectedImage.alt}
                sx={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />

              {/* Image Info */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {selectedImage.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {selectedIndex + 1} of {mediaItems.length}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Media;
