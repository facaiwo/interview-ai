'use client';

import { useEffect, useState } from 'react';

export default function StagewiseToolbarWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsDev(process.env.NODE_ENV === 'development');
  }, []);

  useEffect(() => {
    if (isClient && isDev) {
      // Dynamically import and initialize the toolbar only in development
      import('@stagewise/toolbar-next').then(({ StagewiseToolbar }) => {
        import('@stagewise-plugins/react').then(({ ReactPlugin }) => {
          // Create a container for the toolbar if it doesn't exist
          const container = document.createElement('div');
          container.id = 'stagewise-toolbar-container';
          document.body.appendChild(container);

          // Initialize the toolbar manually with error handling
          try {
            const { createElement } = require('react');
            const { createRoot } = require('react-dom/client');
            
            const root = createRoot(container);
            root.render(createElement(StagewiseToolbar, {
              config: {
                plugins: [ReactPlugin],
                // Add error handling for VS Code connection
                onError: (error: Error) => {
                  if (error.message.includes('Failed to fetch')) {
                    console.warn('Stagewise toolbar: VS Code connection not available');
                    return;
                  }
                  console.warn('Stagewise toolbar error:', error);
                }
              }
            }));
          } catch (error) {
            console.warn('Stagewise toolbar failed to initialize:', error);
            // Clean up container if initialization fails
            container.remove();
          }
        }).catch((error) => {
          console.warn('Failed to load React plugin:', error);
        });
      }).catch((error) => {
        console.warn('Failed to load Stagewise toolbar:', error);
      });
    }

    return () => {
      // Cleanup
      const container = document.getElementById('stagewise-toolbar-container');
      if (container) {
        container.remove();
      }
    };
  }, [isClient, isDev]);

  return null; // This component doesn't render anything directly
} 