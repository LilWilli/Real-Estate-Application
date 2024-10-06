import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No need to fetch categories here; categories are passed as a prop
    setLoading(false);
  }, [categories]);

  const handleChange = (e) => {
    if (e.target && e.target.value !== undefined) {
      onCategoryChange(e.target.value);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <select onChange={handleChange}>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
