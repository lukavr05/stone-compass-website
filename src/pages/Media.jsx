import { Box, Typography, IconButton, Skeleton } from '@mui/material';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { BrandIcon } from '../constants/platforms.jsx';
import {
  siYoutubemusic,
  siInstagram,
  siTiktok,
} from 'simple-icons';

// Media items
const mediaItems = [
  {
    id: 1,
    type: 'photo',
    src: '/images/luka1.jpg',
    alt: 'Stone Compass Live Performance'
  },
  {
    id: 2,
    type: 'photo',
    src: '/images/scpromo2.jpg',
    alt: 'Night Single Cover'
  },
  {
    id: 3,
    type: 'photo',
    src: '/images/scpromo4.jpg',
    alt: 'Reflection Single Cover'
  },
  {
    id: 4,
    type: 'photo',
    src: '/images/IMG_1646.jpg',
    alt: 'Concert Photo'
  },
  {
    id: 5,
    type: 'photo',
    src: '/images/IMG_6009.JPG',
    alt: 'Behind the Scenes'
  },
  {
    id: 6,
    type: 'photo',
    src: '/images/IMG_6151.JPG',
    alt: 'Band Photo'
  },
  {
    id: 7,
    type: 'photo',
    src: '/images/IMG_6107.JPG',
    alt: 'Festival Performance'
  },
  {
    id: 8,
    type: 'photo',
    src: '/images/scpromo3.jpg',
    alt: 'Recording Session'
  },
  {
    id: 9,
    type: 'photo',
    src: '/images/IMG_5636.JPEG',
    alt: 'Venue Photo'
  },
  {
    id: 10,
    type: 'photo',
    src: '/images/IMG_5449.JPG',
    alt: 'Equipment Setup'
  },
  {
    id: 11,
    type: 'photo',
    src: '/images/IMG_6117.JPG',
    alt: 'Equipment Setup'
  },
  {
    id: 12,
    type: 'photo',
    src: '/images/rosie.jpg',
    alt: 'Equipment Setup'
  }
];

// Social media platforms for media section
const mediaPlatforms = [
  {
    name: 'YouTube',
    icon: siYoutubemusic,
    color: '#FF0000',
    url: 'https://www.youtube.com/channel/UCDxrFlpeL4LB40u27yVfXjg'
  },
  {
    name: 'TikTok',
    icon: siTiktok,
    color: '#EE1D52',
    url: 'https://tiktok.com/@stonecompassmusic'
  },
  {
    name: 'Instagram',
    icon: siInstagram,
    color: '#DD2A7B',
    url: 'https://www.instagram.com/stonecompassmusic/'
  }
];

export default function Media() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);

  // Simulate loading delay for demo - remove this in production
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePlatformClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      id="media"
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Parallax Header Image */}
      <Box
        sx={{
          height: '50vh',
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
            backgroundImage: 'url(/images/scpromo2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            willChange: 'transform'
          }}
        />
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
          }}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ px: { xs: 3, sm: 6, md: 10, lg: 24, xl: 24 }, py: 8 }}>
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: '0.2em',
              color: '#aaa',
              fontFamily: '"Cascadia Code", monospace',
              fontSize: '1rem',
              display: 'block',
              mb: 2
            }}
          >
            Media_Gallery
          </Typography>

        </Box>

        {/* Masonry Image Gallery */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            columnCount: { xs: '2', sm: '2', md: '2', lg: '3' },
            columnGap: '24px',
            mb: 8,
            '& > div': {
              breakInside: 'avoid',
              marginBottom: '24px'
            }
          }}
        >
          {!imagesLoaded ? (
            // Skeleton loading state with natural aspect ratios
            [...Array(12)].map((_, index) => {
              const heights = ['180px', '220px', '260px', '200px', '240px', '280px', '210px', '250px', '230px', '270px', '190px', '300px'];
              return (
                <Box
                  key={`skeleton-${index}`}
                  sx={{
                    height: heights[index % heights.length],
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    marginBottom: '24px',
                    breakInside: 'avoid'
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
              );
            })
          ) : (
            // Actual images with natural aspect ratios
            mediaItems.map((item, index) => (
              <Box
                key={item.id}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: 'easeOut'
                }}
                onClick={() => handleImageClick(item)}
                sx={{
                  marginBottom: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  breakInside: 'avoid'
                }}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.alt}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Box>
            ))
          )}
        </Box>

        {/* Social Media Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: '0.2em',
              color: '#aaa',
              fontFamily: '"Cascadia Code", monospace',
              fontSize: '1rem',
              display: 'block',
              mb: 3
            }}
          >
            Follow_Us
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            {mediaPlatforms.map(({ icon, color, url }) => (
              <IconButton
                key={url}
                onClick={() => handlePlatformClick(url)}
                sx={{
                  color: '#fff',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color,
                    transform: 'scale(1.2)',
                  }
                }}
              >
                <BrandIcon icon={icon} size={28} />
              </IconButton>
            ))}
          </Box>

           <Box sx={{ textAlign: 'center' }}>
             <Typography
               variant="body2"
               sx={{
                 color: '#aaa',
                 fontFamily: '"Cascadia Code", monospace',
                 fontSize: '0.85rem',
                 maxWidth: '600px',
                 lineHeight: 1.6,
                 mx: 'auto'
               }}
             >
               Thank you for scrolling this far! Any and all support, no matter how insignificant it may seem, is beyond appreciated. Keep loving music. 
             </Typography>
           </Box>
        </Box>
      </Box>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={handleCloseModal}
          >
            <Box
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              sx={{
                maxWidth: '90%',
                maxHeight: '85vh',
                position: 'relative',
                marginTop: '2rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                component="img"
                src={selectedImage.src}
                alt={selectedImage.alt}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
              
              {/* Close button */}
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: 0,
                  color: '#fff',
                  '&:hover': {
                    color: '#aaa'
                  }
                }}
              >
                <Box sx={{ fontSize: '2rem', fontFamily: 'monospace' }}>×</Box>
              </IconButton>


            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
