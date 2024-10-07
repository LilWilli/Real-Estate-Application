import React from 'react';

const EstateCategory = ({ filterItems, setProducts, menuItems, selectedCategory, Data }) => {
    return (
        <>
            <div className='widget-header'>
                <h5 className='ms-2'>All Categories</h5>
            </div>
            <div>
                <button 
                    className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`} 
                    onClick={() => {
                        setProducts(Data);
                        filterItems("All"); 
                    }}
                >
                    All
                </button>
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

export default EstateCategory;
