// BoxComponent.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const BoxComponent = ({ children, size }) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: '200px', minHeight: '200px' };
      case 'medium':
        return { width: '300px', minHeight: '300px' };
      case 'large':
        return { width: '400px', minHeight: '400px' };
      case 'xlarge':
        return { width: '500px', minHeight: '500px' };
      case 'xxlarge':
        return { width: '600px', minHeight: '600px' };
      case 'xxxlarge':
          return { width: '700px', minHeight: '700px' };
      default:
        return { width: '300px', minHeight: '300px' }; // Default to medium size
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Adjust this value based on your layout needs
    >
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white', ...getSizeStyle(), borderRadius: '12px' }}>
        {children}
      </Paper>
    </Box>
  );
};

export default BoxComponent;
