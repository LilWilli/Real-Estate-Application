import NavItems from 'Component/NavItems';
import PageHeader from 'Component/PageHeader';
import Link from 'next/link';
import delImgUrl from '../../public/assets/images/shop/del.png';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Container, Row, Col, ModalTitle } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import CheckoutPage from 'pages/shop/CheckoutPage';
const Successful = () => {
    const [cartItem, setCartItem] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalItems, setModalItems] = useState([]); // State to hold items for the modal
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItem(storedCart);
    }, []);

    useEffect(() => {
        calculateShipping();
    }, [cartItem, selectedCountry]);

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const calculateShipping = () => {
        const flatRate = 10;
        setShipping(flatRate);
    };

    const handleIncrease = (id) => {
        const newCartItem = cartItem.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItem(newCartItem);
        updateLocalStorage(newCartItem);
    };

    const handleDecrease = (id) => {
        const newCartItem = cartItem.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(item.quantity - 1, 1) };
            }
            return item;
        });
        setCartItem(newCartItem);
        updateLocalStorage(newCartItem);
    };

    const handleRemove = (id) => {
        const updatedCart = cartItem.filter((item) => item.id !== id);
        setCartItem(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItem.reduce((total, item) => total + calculateTotalPrice(item), 0);
    };

    const cartSubtotal = calculateTotal();

    const orderTotal = () => {
        const discountAmount = discount;
        return cartSubtotal - discountAmount + shipping;
    };

    const applyDiscount = async () => {
        try {
            const { data } = await axios.post('/api/discount', { code: coupon });
            const { discount: newDiscount, used } = data;
            if (used) {
                toast.error('Discount code already used');
            } else {
                setDiscount(Number(newDiscount));
                toast.success('Discount applied!');
            }
        } catch (error) {
            console.error('Error applying discount:', error);
            toast.error('Invalid discount code');
        }
    };

    const handleImageClick = (id) => {
        router.push(`/shop/${id}`);
    };

    const handleUpdateCart = (e) => {
        e.preventDefault();
        setModalItems(cartItem); // Set all items for the modal
        setShowModal(true); // Show the modal
    };

    const handleModalUpdate = (id) => {
        router.push(`/shop/${id}`);
    };

    return (
        <div>
            <NavItems />
            <PageHeader title={"Real Estate"} curPage={"HomePage"} />
            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='cat-product'>Product</th>
                                        <th className='cat-price'>Price</th>
                                        <th className='cat-quantity'>Quantity</th>
                                        <th className='cat-toprice'>Total</th>
                                        <th className='cat-edit'>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItem.map((item) => (
                                        <tr key={item.id}>
                                            <td className='product-item cat-product'>
                                                <div className='p-thumb'>
                                                    <Link href={`/shop`}>
                                                        <img src={item.image} alt={item.title} />
                                                    </Link>
                                                </div>
                                                <div className='p-content'>
                                                    <Link href={`/shop`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='cat-price'>
                                                {discount > 0 ? (
                                                    <>
                                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                        <span> ${(item.price - discount).toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    `$${item.price.toFixed(2)}`
                                                )}
                                            </td>
                                            <td className='cat-quantity'>
                                                <div className='cart-plus-minus'>
                                                    <div className='dec qtybutton' onClick={() => handleDecrease(item.id)}>
                                                        -
                                                    </div>
                                                    <input type="text" className='cart-plus-minus-box' name='qtybutton' value={item.quantity} readOnly />
                                                    <div className='inc qtybutton' onClick={() => handleIncrease(item.id)}>
                                                        +
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='cat-toprice'>
                                                {discount > 0 ? (
                                                    <>
                                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>
                                                            ${(calculateTotalPrice(item)).toFixed(2)}
                                                        </span>
                                                        <span> ${(calculateTotalPrice(item) - discount).toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    `$${calculateTotalPrice(item).toFixed(2)}`
                                                )}
                                            </td>
                                            <td className='cat-edit'>
                                                <a href="#" onClick={(e) => handleRemove(item.id)}>
                                                    <Image src={delImgUrl} alt="delete" width={20} height={20} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-bottom">
                            <div className="cart-checkout-box">
                                <form className='coupon' onSubmit={(e) => { e.preventDefault(); applyDiscount(); }}>
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        className='cart-page-input-text'
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        required
                                    />
                                    <input type="submit" value="Apply Coupon" />
                                </form>
                                <form className='cart-checkout' onSubmit={(e) => e.preventDefault()}>
                                    <input type="submit" value="Update Cart" onClick={handleUpdateCart} />
                                    <div>
                                        <CheckoutPage />
                                    </div>
                                </form>
                            </div>
                            <div className="shiping-box">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="calculate-shiping">
                                            <h3>Calculate Shipping</h3>
                                            <div className="outline-select">
                                                <select
                                                    value={selectedCountry}
                                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                                >
                                                    <option value="" disabled>Select a Country</option>
                                                    <option value="US">United States (US)</option>
                                                    <option value="CA">Canada (CA)</option>
                                                    <option value="GB">United Kingdom (GB)</option>
                                                    {/* Add additional countries as needed */}
                                                </select>
                                                <span className='select-icon'><i className="icofont-rounded-down"></i></span>
                                            </div>
                                            <div className='outline-select shipping-select'>
                                                <select
                                                    value={selectedCity}
                                                    onChange={(e) => setSelectedCity(e.target.value)}
                                                >
                                                    <option value="" disabled>Select a City</option>
                                                    <option value="NewYork">New York</option>
                                                    <option value="LosAngeles">Los Angeles</option>
                                                    <option value="Chicago">Chicago</option>
                                                    {/* Add additional cities as needed */}
                                                </select>
                                                <span className='select-icon'><i className="icofont-rounded-down"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="cart-overview">
                                            <h3>Order Total</h3>
                                            <ul className="cart-total">
                                                <li><span className="pull-left">Cart Subtotal</span><p className="pull-right">${cartSubtotal.toFixed(2)}</p></li>
                                                <li><span className="pull-left">Shipping</span><p className="pull-right">${shipping.toFixed(2)}</p></li>
                                                <li><span className="pull-left">Discount</span><p className="pull-right">-${discount.toFixed(2)}</p></li>
                                                <li><span className="pull-left">Order Total</span><p className="pull-right">${orderTotal().toFixed(2)}</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for updating cart */}
            {/* Modal for updating cart */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Update Cart</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        {modalItems.length > 0 ? (
                            modalItems.map((item) => (
                                <Row key={item.id} className="mb-3">
                                    <Col md={5}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={250}
                                            height={250}
                                            onClick={() => handleImageClick(item.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <h5>{item.name}</h5>
                                        <p>{item.description}</p>
                                        <div className='section-wrapper'>
                                            <div className='cart-bottom'>
                                                <div className="cart-checkout-box">
                                                    <form
                                                        onSubmit={(e) => { e.preventDefault(); handleModalUpdate(item.id); }}
                                                        className='cart-checkout'
                                                    >
                                                        <ChakraButton
                                                            type="submit"
                                                            colorScheme="blue" // Use a color scheme that stands out
                                                            variant="solid"
                                                            size="lg" // Larger button for emphasis
                                                            width="100%" // Full-width button
                                                            leftIcon={<FaShoppingCart />} // Icon on the left of the text
                                                            _hover={{ bg: "blue.600" }} // Darker blue on hover
                                                            _focus={{ boxShadow: "outline" }} // Focus effect for accessibility
                                                        >
                                                            Update Cart
                                                        </ChakraButton>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <p>No items in the cart.</p>
                        )}
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    );
};

export default Successful;
