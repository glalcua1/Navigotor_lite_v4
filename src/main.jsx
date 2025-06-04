import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import FixedApp from './FixedApp.jsx';
import './index.css';

// Create a simple theme
const theme = createTheme();

// Simple rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FixedApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
); 