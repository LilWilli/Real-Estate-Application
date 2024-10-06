// Importing necessary modules
import React from 'react'; // Importing React
import Image from 'next/image'; // Importing Image from Next.js
import Link from 'next/link'; // Importing Link from Next.js
import Rating from 'Component/Rating'; // Importing Rating component

// Defining the ProductCards component
const ProductCards = ({ gridList, products }) => {
    // Returning JSX
    return (
        // Wrapping the product cards in a div with class names
        <div className={`shop-product-wrap row justify-content-center ${gridList ? "grid" : "list"}`}>
            {/* Mapping over the products array */}
            {products.map((product, i) => (
                // Wrapping each product card in a div with class names
                <div key={i} className='col-lg-4 col-md-6 col-12'>
                    {/* Wrapping each product card in a div with class name 'product-item' */}
                    <div className='product-item'>
                        {/* Wrapping the product image and actions in a div with class name 'product-thumb' */}
                        <div className='product-thumb'>
                            {/* Wrapping the image in a div with class names 'pro-thumb' and styles */}
                            <div className='pro-thumb' style={{ position: 'relative', width: '100%', height: 'auto', paddingBottom: '100%' }}>
                                {/* Rendering the Image component with necessary props */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            {/* Wrapping the product actions in a div with class name 'product-action-link' */}
                            <div className='product-action-link'>
                                {/* Rendering the Link component with necessary props */}
                                <Link href={`/shop/${product.id}`} passHref>
                                    <i className='icofont-eye'></i>
                                </Link>
                                <a href="#"><i className='icofont-heart'></i></a>
                                <Link href="/shop/cart" passHref>
                                    <i className='icofont-cart-alt'></i>
                                </Link>
                            </div>
                        </div>
                        {/* Wrapping the product content in a div with class name 'product-content' */}
                        <div className="product-content">
                            {/* Rendering the Link component with necessary props */}
                            <h5>
                                <Link href={`/shop/${product.id}`} passHref>
                                    {product.name}
                                </Link>
                            </h5>
                            {/* Rendering the Rating component */}
                            <p className='text-warning'>
                                <Rating />
                            </p>
                            {/* Rendering the product price */}
                            <h6>&pound;{product.price}</h6>
                        </div>
                    </div>

                    {/* Second product card for list view */}
                    <div className='product-list-item'>
                        {/* Wrapping the product image and actions in a div with class name 'product-thumb' */}
                        <div className='product-thumb'>
                            {/* Wrapping the image in a div with class names 'pro-thumb' and styles */}
                            <div className='pro-thumb' style={{ position: 'relative', width: '100%', height: 'auto', paddingBottom: '100%' }}>
                                {/* Rendering the Image component with necessary props */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            {/* Wrapping the product actions in a div with class name 'product-action-link' */}
                            <div className='product-action-link'>
                                {/* Rendering the Link component with necessary props */}
                                <Link href={`/estates/${product.id}`} passHref legacyBehavior>
                                    <i className='icofont-eye'></i>
                                </Link>
                                <a href="#"><i className='icofont-heart'></i></a>
                                <Link href="/estate-cart" passHref legacyBehavior>
                                    <i className='icofont-cart-alt'></i>
                                </Link>
                            </div>
                        </div>
                        {/* Wrapping the product content in a div with class name 'product-content' */}
                        <div className="product-content">
                            {/* Rendering the Link component with necessary props */}
                            <h5>
                                <Link href={`/estates/${product.id}`} passHref legacyBehavior>
                                    {product.name}
                                </Link>
                            </h5>
                            {/* Rendering the Rating component */}
                            <p className='text-warning'>
                                <Rating />
                            </p>
                            {/* Rendering the product price */}
                            <h6>&pound;{product.price}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Exporting the ProductCards component
export default ProductCards;

