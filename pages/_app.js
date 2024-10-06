// Importing React and useEffect hook
import React, { useEffect } from 'react';

// Importing Chakra UI provider and other necessary modules
import { ChakraProvider } from '@chakra-ui/react';

// Importing Bootstrap CSS stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing other required CSS stylesheets
import 'swiper/css';
import '../public/assets/css/icofont.min.css';
import '../public/assets/css/animate.css';
import '../public/assets/css/style.min.css';
import '../styles/globals.css';

// Importing NextNProgress component for displaying progress bar
import NextNProgress from 'nextjs-progressbar';

// Importing ToastContainer component for displaying toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing Script component for dynamically loading client-side scripts
import Script from 'next/script';

// Importing the AuthProvider
import AuthProvider from '../context/AuthProvider'; // Adjust the path if necessary

// Defining the App component
function App({ Component, pageProps }) {
  // Using useEffect to initialize the lightbox feature on the client side
  useEffect(() => {
    const initializeLightbox = async () => {
      if (typeof window !== 'undefined') {
        const GLightbox = (await import('glightbox')).default;
        GLightbox({ selector: '.glightbox' });
      }
    };
    initializeLightbox();
  }, []);

  return (
    <AuthProvider> {/* Wrap the entire app in the AuthProvider */}
      <ChakraProvider>
        {/* Load Bootstrap JS dynamically for client-side */}
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.3/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Bootstrap JS loaded');
          }}
        />

        {/* Set the title of the page */}
        <title>Real Estate App</title>

        {/* Render the NextNProgress component */}
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />

        {/* Render the page component */}
        <Component {...pageProps} />

        {/* Render the ToastContainer for notifications */}
        <ToastContainer />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
