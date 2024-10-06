import React, { useState, useEffect } from 'react';
import EstateData from '../public/products.json';
import Link from 'next/link';
import SelectedCategories from '../Component/SelectedCategories';

// Component for the banner section
const Banner = () => {
    // State variables for search input, selected category, and filtered houses
    const [searchInput, setSearchInput] = useState("");
    const [category, setCategory] = useState("all");
    const [filteredHouses, setFilteredHouses] = useState(EstateData);

    // UseEffect hook to filter the houses based on category and search input whenever they change
    useEffect(() => {
        let filtered = EstateData;
        if (category !== "all") {
            filtered = filtered.filter(estate => estate.category.toLowerCase() === category.toLowerCase());
        }
        if (searchInput) {
            filtered = filtered.filter(estate => estate.name.toLowerCase().includes(searchInput.toLowerCase()));
        }
        setFilteredHouses(filtered);
    }, [searchInput, category]);

    // Event handler for search input change
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    }

    // Event handler for category change
    const handleCategoryChange = (value) => {
        setCategory(value);
    }

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let filtered = EstateData;
        if (category !== "all") {
            filtered = filtered.filter(estate => estate.category.toLowerCase() === category.toLowerCase().trim());
        }
        if (searchInput) {
            filtered = filtered.filter(estate => estate.name.toLowerCase().includes(searchInput.toLowerCase().trim()));
        }
        setFilteredHouses(filtered);
    }

    // JSX for the component
    return (
        <div className='banner-section style-4'>
            <div className="container">
                <div className="banner-content">
                    {/* Title for the banner section */}
                    <h2>Search Your Dream Home From <span>Thousands</span> of Listings</h2>
                    {/* Form for searching and filtering houses */}
                    <form onSubmit={handleSubmit}>
                        <SelectedCategories onCategoryChange={handleCategoryChange} />
                        <input type="text" name='search' id='search' placeholder='Search Your House' value={searchInput} onChange={handleSearch} />
                        <button type='submit'>
                            <em className='icofont-search'></em>
                        </button>
                    </form>
                    {/* Description for the banner section */}
                    <p>We Have The Largest Collection of Houses</p>
                    {/* List of filtered houses */}
                    {filteredHouses.length > 0 ? (
                        <ul className='lab-ul'>
                            {filteredHouses.map((House, i) => (
                                <li key={i}><Link href={`/shop/${House.id}`} legacyBehavior>{House.name}</Link></li>
                            ))}
                        </ul>
                    ) : (
                        <p>No houses of this category are available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Banner;

