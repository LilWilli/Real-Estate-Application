import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import 'glightbox/dist/css/glightbox.min.css';

const subtitle = "Choose Any Estate";
const title = "Buy Houses with us";
const btnText = "Get Started Now With a few of our Houses";

const categoryList = [
    { iconName: "icofont-building-alt", title: "Mansion", query: "mansion" },
    { iconName: "icofont-home", title: "TownHouse", query: "townhouse" },
    { iconName: "icofont-home", title: "Cabin", query: "cabin" },
    { iconName: "icofont-home", title: "Bungalow", query: "bungalow" },
    { iconName: "icofont-home", title: "Studio Apartment", query: "studio apartment" },
    { iconName: "icofont-tree-alt", title: "Chalet", query: "chalet" },
    { iconName: "icofont-architecture-alt", title: "Cottage", query: "cottage" },
    { iconName: "icofont-brand-windows", title: "Estate", query: "estate" },
    { iconName: "icofont-brand-windows", title: "Villa", query: "villa" },
    { iconName: "icofont-brand-windows", title: "Duplex", query: "duplex" },
    { iconName: "icofont-brand-windows", title: "Apartment", query: "apartment" },
    { iconName: "icofont-brand-windows", title: "FarmHouse", query: "farmhouse" },
    { iconName: "icofont-architecture-alt", title: "PentHouse", query: "penthouse" },
    { iconName: "icofont-building", title: "Others", query: "others" },
];

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
};

const HomeCategory = () => {
    const [categoryImages, setCategoryImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const filteredCategories = categoryList.filter(
                    category => category.title !== 'TownHouse' && category.title !== 'Chalet' && category.title !== 'Duplex'
                );

                const responses = await Promise.all(
                    filteredCategories.map(category => 
                        fetchWithRetry(`/api/pexels/search?query=${category.query}&per_page=5`)
                    )
                );

                const images = responses.map((response, index) => {
                    const photos = response.photos;
                    const validPhoto = photos.find(photo => photo.src && photo.src.medium);
                    if (validPhoto) {
                        return {
                            imgUrl: validPhoto.src.medium,
                            title: filteredCategories[index].title,
                            iconName: filteredCategories[index].iconName,
                            query: filteredCategories[index].query,  
                        };
                    }
                    return null;
                }).filter(image => image !== null);

                console.log('Category images:', images);
                setCategoryImages(images.slice(0, 9));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <section className="category-section style-4 padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <h6 className="section-subtitle">{subtitle}</h6>
                    <h2 className="section-title">{title}</h2>
                    <Link href="/categories" legacyBehavior>
                        <a className="lab-btn"><span>{btnText}</span></a>
                    </Link>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
                        {categoryImages.length === 0 && (
                            <p>No categories available right now</p>
                        )}
                        {categoryImages.map((category, index) => (
                            <div key={index} className="col">
                                <div className="category-item">
                                    <Link href={`/category/${category.query}`} legacyBehavior>
                                        <a>
                                            <img src={category.imgUrl} alt={category.title || 'No Title Available'} />
                                        </a>
                                    </Link>
                                    <div className="course-item style-4">
                                        {/* Add classes for yellow background and white icon */}
                                        <h6 className="category-title showcase-title">
                                            {category.title}
                                        </h6>
                                        <i className={`white-icon ${category.iconName}`}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCategory;
