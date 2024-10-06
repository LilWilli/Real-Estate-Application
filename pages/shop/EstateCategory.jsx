// Importing React library
import React from 'react';

// Creating a functional component EstateCategory
const EstateCategory = ({ filterItems, setProducts, menuItems, selectedCategory, Data }) => {
  // Returning JSX code
  return (
    <>
      {/* Div with class 'widget-header' for header */}
      <div className='widget-header'>
        {/* H5 element with class 'ms-2' for category title */}
        <h5 className='ms-2'>All Categories</h5>
      </div>
      {/* Div element for category buttons */}
      <div>
        {/* 'All' button with onClick event handler */}
        <button 
          // Class name is 'm-2' for margin and 'bg-warning' if 'All' is selected
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`} 
          // OnClick event handler for 'All' button
          onClick={() => {
            // Set all products to Data
            setProducts(Data);
            // Call filterItems function with 'All' argument
            filterItems("All"); 
          }}
        >
          {/* Button text 'All' */}
          All
        </button>
        {/* Mapping menuItems excluding 'All' */}
        {menuItems.filter(item => item !== "All").map((val, id) => (
          // Button for each category
          <button 
            // Key for each button
            key={id} 
            // Class name is 'm-2' for margin and 'bg-warning' if category is selected
            className={`m-2 ${selectedCategory === val ? "bg-warning" : ""}`} 
            // OnClick event handler for each button
            onClick={() => filterItems(val)}
          >
            {/* Button text for each category */}
            {val}
          </button>
        ))}
      </div>
    </>
  );
};

// Exporting EstateCategory as default
export default EstateCategory;

