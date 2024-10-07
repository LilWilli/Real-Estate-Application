import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from 'Component/Rating';

// Defining the ProductCards component
const ProductCards = ({ gridList, products }) => {
    return (
        <div className={`shop-product-wrap row justify-content-center ${gridList ? "grid" : "list"}`}>
            {products.map((product, i) => (
                <div key={i} className='col-lg-4 col-md-6 col-12'>
                    <div className='product-item'>
                        <div className='product-thumb'>
                            <div className='pro-thumb' style={{ position: 'relative', width: '100%', height: 'auto', paddingBottom: '100%' }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className='product-action-link'>
                                <Link href={`/shop/${product.id}`} passHref>
                                    <i className='icofont-eye'></i>
                                </Link>
                                <a href="#"><i className='icofont-heart'></i></a>
                                <Link href="/shop/cart" passHref>
                                    <i className='icofont-cart-alt'></i>
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <h5>
                                <Link href={`/shop/${product.id}`} passHref>
                                    {product.name}
                                </Link>
                            </h5>
                            <p className='text-warning'>
                                <Rating />
                            </p>
                            <h6>&pound;{product.price}</h6>
                        </div>
                    </div>

                    {/* Second product card for list view */}
                    <div className='product-list-item'>
                        <div className='product-thumb'>
                            <div className='pro-thumb' style={{ position: 'relative', width: '100%', height: 'auto', paddingBottom: '100%' }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className='product-action-link'>
                                <Link href={`/estates/${product.id}`} passHref legacyBehavior>
                                    <i className='icofont-eye'></i>
                                </Link>
                                <a href="#"><i className='icofont-heart'></i></a>
                                <Link href="/estate-cart" passHref legacyBehavior>
                                    <i className='icofont-cart-alt'></i>
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <h5>
                                <Link href={`/estates/${product.id}`} passHref legacyBehavior>
                                    {product.name}
                                </Link>
                            </h5>
                            <p className='text-warning'>
                                <Rating />
                            </p>
                            <h6>&pound;{product.price}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;
