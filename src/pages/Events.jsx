import { Box, Typography, Button, Container } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Events() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the image (moves both up and down)
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Placeholder show data - replace with actual show info
  const nextShow = {
    title: "Stone Compass Live",
    venue: "O2 Academy Islington",
    location: "London",
    date: "Jan 19, 2025",
    time: "8:00 PM",
    doors: "6:00 PM",
    ticketUrl: "https://bit.ly/stonecompass",
    
  };

  return (
    <Box
      id="events"
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal',
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
            backgroundImage: 'url(/images/rehearsal1.JPEG)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            willChange: 'transform'
          }}
        />
        {/* Dark overlay for text readability */}
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

      {/* Show Information */}
      <Container maxWidth="md" sx={{ py: 8, position: 'relative' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
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
            Upcoming_Shows
          </Typography>

          {/* Show Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 4,
              lineHeight: 1.2
            }}
          >
            {nextShow.title}
          </Typography>

          {/* Show Details Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
              mb: 4,
              p: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Date */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CalendarTodayIcon sx={{ color: '#aaa', mt: 0.5 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#aaa',
                    fontFamily: '"Cascadia Code", monospace',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  Date
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cascadia Code", monospace',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {nextShow.date}
                </Typography>
              </Box>
            </Box>

            {/* Time */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <AccessTimeIcon sx={{ color: '#aaa', mt: 0.5 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#aaa',
                    fontFamily: '"Cascadia Code", monospace',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  Time
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cascadia Code", monospace',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {nextShow.time}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#aaa',
                    fontFamily: '"Cascadia Code", monospace'
                  }}
                >
                  Doors: {nextShow.doors}
                </Typography>
              </Box>
            </Box>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <LocationOnIcon sx={{ color: '#aaa', mt: 0.5 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#aaa',
                    fontFamily: '"Cascadia Code", monospace',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  Location
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cascadia Code", monospace',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {nextShow.venue}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#aaa',
                    fontFamily: '"Cascadia Code", monospace'
                  }}
                >
                  {nextShow.location}
                </Typography>
              </Box>
            </Box>
          </Box>

          

          {/* Get Tickets Button */}
          <Button
            variant="contained"
            onClick={() => window.open(nextShow.ticketUrl, '_blank')}
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              fontFamily: '"Cascadia Code", monospace',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'lowercase',
              padding: '1rem 3rem',
              borderRadius: '8px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#fff',
                transform: 'scale(1.05)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            get_tickets
          </Button>

          {/* Additional Info */}
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              color: '#aaa',
              fontFamily: '"Cascadia Code", monospace',
              fontSize: '0.85rem'
            }}
          >
            More shows to be announced soon. Follow us on social media for updates.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
