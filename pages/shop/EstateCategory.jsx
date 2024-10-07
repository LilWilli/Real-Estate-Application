import React from 'react';

// Creating a functional component EstateCategory
const EstateCategory = ({ filterItems, setProducts, menuItems, selectedCategory, Data }) => {
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
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`} 
          onClick={() => {
            setProducts(Data);
            filterItems("All"); 
          }}
        >
          All
        </button>
        {/* Mapping over menuItems array to create category buttons */}
        {menuItems.map((menuItem, index) => (
          <button 
            key={index} 
            className={`m-2 ${selectedCategory === menuItem ? "bg-warning" : ""}`} 
            onClick={() => {
              filterItems(menuItem); 
            }}
          >
            {menuItem}
          </button>
        ))}
      </div>
    </>
  );
};

// Exporting the EstateCategory component
export default EstateCategory;
