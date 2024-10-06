import React from 'react';

// Define an array of categories
const categories = [
  'all',
  'Apartment',
  'Condo',
  'TownHouse',
  'Villa',
  'Cotton',
  'TerraceHouse',
  'Estate',
  'Chalet',
  'Ranch',
  'StudioApartment',
  'Duplex',
  'Bungalow',
  'Cabin',
  'Mansion',
  'FarmHouse',
  'PentHouse',
  'StoreyBuilding',
];

// Define a functional component for rendering a select element
const SelectedCategories = ({ onCategoryChange }) => {
  // Define a function to handle category change
  const handleChange = (event) => {
    // Check if the event target value is defined
    if (event.target.value !== undefined) {
      // Call the onCategoryChange function with the selected category
      onCategoryChange(event.target.value);
    }
  };

  // Render a select element with options for each category
  return (
    <select onChange={handleChange}>
      {categories.map((category, index) => (
        // Render an option element for each category
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

// Export the SelectedCategories component
export default SelectedCategories;
