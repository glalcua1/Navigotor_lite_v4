import React from 'react';
import ReactDOM from 'react-dom/client';
import DebugPage from './DebugPage';
import './index.css';

console.log('Debug app starting...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    console.error('Root element not found in the DOM');
  } else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <DebugPage />
      </React.StrictMode>
    );
    console.log('Debug render completed');
  }
} catch (error) {
  console.error('Error during rendering:', error);
} 