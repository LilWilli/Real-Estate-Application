// /components/ProductDisplay.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const ProductDisplay = ({ item }) => {
    // Initialize all states at the top level
    const [preQuantity, setPreQuantity] = useState(1); // Quantity default to 1
    const [coupon, setCoupon] = useState(''); // State for coupon code
    const [discount, setDiscount] = useState(0); // State for discount
    const [isDiscountApplied, setIsDiscountApplied] = useState(false); // State to check if discount is applied

    // Handle case when item is undefined
    if (!item) {
        return <p>Loading...</p>; // You can also render a Not Found page
    }

    const { name, id, price, seller, ratingCount, image, description } = item;

    const handleDecrease = () => {
        if (preQuantity > 1) {
            setPreQuantity(preQuantity - 1);
        }
    };

    const handleIncrease = () => {
        setPreQuantity(preQuantity + 1);
    };

    const applyDiscount = async () => {
        if (!coupon) {
            toast.error("Please enter a coupon code.", { autoClose: 2000 });
            return;
        }
        try {
            const response = await axios.post('/api/discount', { code: coupon });
            setDiscount(response.data.discount);
            setIsDiscountApplied(true);
            toast.success("Discount applied successfully!", { autoClose: 2000 });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Invalid discount code", { autoClose: 2000 });
            } else if (error.response && error.response.status === 400) {
                toast.error("Discount code already used", { autoClose: 2000 });
            } else {
                toast.error("An error occurred. Please try again.", { autoClose: 2000 });
            }
        }
    };

    const finalPrice = price - discount;

    const handleAddToCart = () => {
        if (preQuantity <= 0) {
            toast.error('Please specify a valid quantity.', { autoClose: 2000 });
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            if (existingItem.quantity === preQuantity) {
                toast.info('Product is already in the cart with the same quantity.', { autoClose: 2000 });
            } else {
                existingItem.quantity = preQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                toast.success('Product updated in cart successfully!', { autoClose: 2000 });
            }
        } else {
            cart.push({ ...item, quantity: preQuantity });
            localStorage.setItem('cart', JSON.stringify(cart));
            toast.success('Product added to cart successfully!', { autoClose: 2000 });
        }
    };

    return (
        <div>
            <div>
                <h4>{name}</h4>
                <p className='rating'>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <span> {ratingCount} reviews</span>
                </p>
                {isDiscountApplied ? (
                    <div className='d-flex'>
                        <h4 style={{ textDecoration: 'line-through', color: 'red' }}>${price.toFixed(2)}</h4>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h4>${finalPrice.toFixed(2)}</h4>
                    </div>
                ) : (
                    <h4>${price.toFixed(2)}</h4>
                )}
                <h4>{seller}</h4>
                <p>{description}</p>
            </div>

            <div className='cart-plus-minus'>
                <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                <input
                    type="text"
                    name='qtybutton'
                    id='qtybutton'
                    value={preQuantity}
                    className='cart-plus-minus-box'
                    onChange={(e) => setPreQuantity(parseInt(e.target.value, 10) || 1)}
                />
                <div className='inc qtybutton' onClick={handleIncrease}>+</div>
            </div>

            <div className='accordion mt-4' id='discountAccordion'>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingOne'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                            How to Get a Discount Code
                        </button>
                    </h2>
                    <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#discountAccordion'>
                        <div className='accordion-body'>
                            To receive a discount code, you can subscribe to our newsletter, participate in our promotional events, or follow us on social media. Keep an eye out for special offers and promotions where we share exclusive discount codes!
                        </div>
                    </div>
                </div>
            </div>

            <div className='discount-code mb-2'>
                <input
                    type="text"
                    placeholder='Enter coupon code'
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={applyDiscount} className="btn btn-success text-light">Apply Discount</button>
            </div>
            <button type='button' className='lab-btn' onClick={handleAddToCart}><span> Add To Cart</span></button>
            <Link href="/cart-page" className='lab-btn bg-primary'><span> Checkout</span></Link>
        </div>
    );
};

export default ProductDisplay;
