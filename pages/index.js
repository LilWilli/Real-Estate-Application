// pages/index.js
// This is the main page of the application.
// It imports and exports the Index function.

// Importing the Footer, Home, and NavItems components from their respective directories.
import Footer from 'Component/Footer'; // Importing the Footer component.
import Home from '../Home/Home'; // Importing the Home component.
import NavItems from 'Component/NavItems'; // Importing the NavItems component.

// Exporting the Index function as the default export of this module.
export default function Index() {
  // Returning a fragment containing the NavItems, Home, and Footer components.
  return (
    <>
      {/* Rendering the NavItems component */}
      <NavItems />

      {/* Rendering the Home component */}
      <Home />

      {/* Rendering the Footer component */}
      <Footer/>
    </>
  );
}

