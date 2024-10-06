import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import image1 from '../public/assets/images/shape-img/icon/01.png';
import image2 from '../public/assets/images/shape-img/icon/02.png';
import CategoryFilter from './CategoryFilter'; // Import CategoryFilter component
import Rating from 'Component/Rating';
import Link from 'next/link';

const CategoryFilterPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'real estate',
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          },
        });
        const data = response.data.results;

        // Extract tags from the items
        const tags = data.flatMap(item => (item.tags ? item.tags.map(tag => tag.title) : []));
        const uniqueTags = [...new Set(tags)];

        // Ensure each item gets a unique tag
        const itemsWithUniqueTags = data.map((item, index) => ({
          ...item,
          uniqueTag: uniqueTags[index % uniqueTags.length] || 'No Tag',
        }));

        // Set items and categories
        setItems(itemsWithUniqueTags);
        setFilteredItems(itemsWithUniqueTags);
        setCategories(['All', ...uniqueTags]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const updatedList = items.filter((item) => item.uniqueTag === category);
      setFilteredItems(updatedList);
    }
  };

  const title = "Our Real Estate Images";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='course-section style-3 padding-tb'>
      <div className='course-shape one'><Image src={image1} alt="" /></div>
      <div className='course-shape two'><Image src={image2} alt="" /></div>
      <div className='container'>
        <div className='section-header'>
          <h2 className='title'>{title}</h2>
          <div className='course-filter-group'>
            <CategoryFilter onCategoryChange={handleCategoryChange} categories={categories} />
          </div>
        </div>
        <div className='section-wrapper'>
          <div className='row'>
            {filteredItems.map((item) => (
              <div key={item.id} className='col-md-4'>
                <div className='course-item style-4'>
                  <div className='course-inner'>
                    <div className='course-thumb'>
                      <Image src={item.urls.small} alt={item.alt_description} width={300} height={200} />
                      <div className='course-category'>
                        <div className='course-cate'>
                          <a href="#">{item.alt_description || 'No Tag'}</a>
                        </div>
                        <div className='course-review'>
                          <Rating />
                        </div>
                      </div>
                    </div>
                    <div className='course-content'>
                      <Link href={`/shop/${item.id}`}>
                        Good For Sale
                      </Link>
                      <div className='course-footer'>
                        <Link href="#">{item.brand}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterPage;
