import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link
} from '@mui/material'

function Navbar() {
  const navigationItems = [
    { id: 'about', label: 'about', href: '/about' },
    { id: 'events', label: 'events', href: '/events' },
    { id: 'media', label: 'media', href: '/media' },
  ];

  const renderNavigationButtons = () => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          component={Link}
          to={item.href}
          color='inherit'
          sx={{
            color: 'primary.main',
            textTransform: 'none'
          }}
        >
          <Typography variant='h3'>
            {item.label}
          </Typography>
        </Button>
      ))}
    </>
  );
  
  return (
    <>
      <AppBar 
        position="static"
        elevation={1}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Box sx={{}}>
            <Box sx={{}}>
              {renderNavigationButtons()}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
