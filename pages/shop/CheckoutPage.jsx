import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import styles from '../../Component/modal.module.css';  // Import the CSS module
import { useRouter } from 'next/router';  // Import useRouter from Next.js

// External image URLs
const paypalImage = "https://i.imgur.com/yK7EDD1.png";
const visaImage = "https://i.imgur.com/sB4jftM.png";

const CheckoutPage = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState("visa");
    const [form, setForm] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
        email: '',
        paypalName: '',
        extraInfo1: '',
        extraInfo2: ''
    });

    const router = useRouter();  // Using Next.js router

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleOrderConfirm = () => {
        const { name, number, expiry, cvv, email, paypalName, extraInfo1, extraInfo2 } = form;
        const allFieldsFilled = (activeTab === "visa" && name && number && expiry && cvv) ||
            (activeTab === "paypal" && email && paypalName && extraInfo1 && extraInfo2);

        if (allFieldsFilled) {
            toast.success("Your Order is Placed Successfully");
            localStorage.removeItem("cart");
            router.push("/thank-you");  // Navigate to a "Thank You" page after order confirmation
        } else {
            toast.error("Please fill out all required fields");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    return (
        <div className={styles.modalCard}>
            <Button variant='primary' className='py-2' onClick={handleShow}>
                Proceed to Checkout
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} centered>
                <div className='modal-dialog'>
                    <h5 className='px-3 mb-3'>Select Your Payment Method</h5>
                    <div className='modal-content'>
                        <div className={`${styles.modalBody} modal-body`}>
                            <div className="tabs mt-3">
                                <ul className={`nav nav-tabs ${styles.navTabs}`} id='myTab' role="tablist">
                                    <li className='nav-item' role="presentation">
                                        <a className={`nav-link ${activeTab === "visa" ? "active" : ""}`} href="#visa" id='visa-tab' data-bs-toggle="tab" data-bs-target="#visa" role="tab" aria-controls="visa" aria-selected={activeTab === "visa"} onClick={() => handleTabChange("visa")}>
                                            <Image src={visaImage} alt="Visa" width={80} height={10} />
                                        </a>
                                    </li>
                                    <li className='nav-item' role="presentation">
                                        <a className={`nav-link ${activeTab === "paypal" ? "active" : ""}`} href="#paypal" id='paypal-tab' data-bs-toggle="tab" data-bs-target="#paypal" role="tab" aria-controls="paypal" aria-selected={activeTab === "paypal"} onClick={() => handleTabChange("paypal")}>
                                            <Image src={paypalImage} alt="PayPal" width={80} height={10} />
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`} id="visa" role="tabpanel" aria-labelledby="visa-tab">
                                        <div className='mt-4 mx-4'>
                                            <div className='text-center'>
                                                <h5>Credit card</h5>
                                            </div>
                                            <div className='form mt-3'>
                                                <div className={styles.inputbox}>
                                                    <input type="text" name='name' value={form.name} onChange={handleInputChange} className='form-control' required />
                                                    <span>Name on card</span>
                                                </div>
                                                <div className={styles.inputbox}>
                                                    <input type="text" name='number' value={form.number} onChange={handleInputChange} className='form-control' required />
                                                    <span>Card number</span>
                                                    <i className='fa fa-eye'></i>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <div className={styles.inputbox}>
                                                        <input type="text" name='expiry' value={form.expiry} onChange={handleInputChange} className='form-control' required />
                                                        <span>Expiration Date</span>
                                                    </div>
                                                    <div className={styles.inputbox}>
                                                        <input type="text" name='cvv' value={form.cvv} onChange={handleInputChange} className='form-control' required />
                                                        <span>CVV</span>
                                                    </div>
                                                </div>
                                                <div className={`px-5 ${styles.pay}`}>
                                                    <button className='btn btn-success btn-block' onClick={handleOrderConfirm}>Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`} id="paypal" role="tabpanel" aria-labelledby="paypal-tab">
                                        <div className='mt-4 mx-4'>
                                            <div className='text-center'>
                                                <h5>PayPal Account Info</h5>
                                            </div>
                                            <div className='form mt-3'>
                                                <div className={styles.inputbox}>
                                                    <input type="text" name='email' value={form.email} onChange={handleInputChange} className='form-control' required />
                                                    <span>Enter your email</span>
                                                </div>
                                                <div className={styles.inputbox}>
                                                    <input type="text" name='paypalName' value={form.paypalName} onChange={handleInputChange} className='form-control' required />
                                                    <span>Your Name</span>
                                                </div>
                                                <div className='d-flex flex-row'>
                                                    <div className={styles.inputbox}>
                                                        <input type="text" name='extraInfo1' value={form.extraInfo1} onChange={handleInputChange} className='form-control' required />
                                                        <span>Extra Info</span>
                                                    </div>
                                                    <div className={styles.inputbox}>
                                                        <input type="text" name='extraInfo2' value={form.extraInfo2} onChange={handleInputChange} className='form-control' required />
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div className={`px-5 ${styles.pay}`}>
                                                    <button className='btn btn-primary btn-block' onClick={handleOrderConfirm}>Add PayPal</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-3 px-4 p-Disclaimer'>
                                    <em>Payment Disclaimer:</em> In no event shall payment or partial payment by owner for any material or service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </div>
    );
}

export default CheckoutPage;
