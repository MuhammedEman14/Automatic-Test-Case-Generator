// GradientButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const GradientButton = styled(Button)(({ theme, color }) => ({
  background: `linear-gradient(45deg, ${theme.palette[color].main} 30%, ${theme.palette[color].dark} 90%)`,
  color: theme.palette.getContrastText(theme.palette[color].main),
  boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
  transition: 'box-shadow 0.3s',

  '&:hover': {
    boxShadow: `0 6px 10px 5px rgba(255, 105, 135, .3)`,
  },
}));

export default GradientButton;
