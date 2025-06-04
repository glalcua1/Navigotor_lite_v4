import React from 'react';
import { Typography, Box, Container } from '@mui/material';

export default function SimpleApp() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ 
        p: 4, 
        bgcolor: 'white', 
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Navigator App
        </Typography>
        <Typography variant="body1" paragraph>
          This is a simplified version of the app to help diagnose rendering issues.
        </Typography>
        <Typography variant="body1">
          If you can see this content, the basic app structure is working correctly.
        </Typography>
      </Box>
    </Container>
  );
} 