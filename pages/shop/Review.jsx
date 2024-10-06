import React, { useState } from 'react'; // Import React and useState for managing component state
import Image from 'next/image'; // Import Next.js Image component for optimized image rendering
import instructor1 from "../../public/assets/images/instructor/01.jpg"; // Import images for reviews
import instructor2 from "../../public/assets/images/instructor/02.jpg";
import instructor3 from "../../public/assets/images/instructor/03.jpg";
import instructor4 from "../../public/assets/images/instructor/04.jpg";
import dummy from "../../public/assets/images/images.jpeg";
import { Flex, Icon, Button, useDisclosure, Text } from '@chakra-ui/react'; // Import Chakra UI components for layout and UI elements
import { BsFillHandThumbsUpFill } from 'react-icons/bs'; // Import Bootstrap's thumbs-up icon from react-icons
import Rating from 'Component/Rating'; // Import custom Rating component (assumed to be defined elsewhere)

const reviewTitle = "Add Your Review"; // Set a constant string for the review section title

// Example ReviewList array to hold review data
let ReviewList = [
    {
        imgUrl: instructor1, // Image URL
        imgAlt: 'Instructor 1', // Alt text for the image
        name: 'John Doe', // Reviewer name
        date: 'August 15, 2024', // Date of the review
        desc: 'This is a great product! I highly recommend it.', // Review content
    },
    {
        imgUrl: instructor2,
        imgAlt: 'Instructor 2',
        name: 'Jane Smith',
        date: 'August 10, 2024',
        desc: 'The quality is amazing and it arrived on time.',
    },
    {
        imgUrl: instructor3,
        imgAlt: 'Instructor 3',
        name: 'Alice Johnson',
        date: 'August 8, 2024',
        desc: 'Good value for the price. I am satisfied with my purchase.',
    },
    {
        imgUrl: instructor4,
        imgAlt: 'Instructor 4',
        name: 'Bob Brown',
        date: 'August 5, 2024',
        desc: 'The product did not meet my expectations, but the customer service was excellent.',
    },
];

const Review = () => {
    // State variables to manage form input, review section toggle, and modal visibility
    const [email, setEmail] = useState(''); // State for storing email input
    const [reviewShow, setReviewShow] = useState(true); // State to toggle between review and description
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for managing modal state
    const [message, setMessage] = useState(''); // State for storing message input

    // Handle email input change
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (email) {
            onOpen(); // Open the full-screen confirmation after form submission
            setEmail(''); // Clear the email input
            setMessage(''); // Clear the message input
        }
    };

    return (
        <>
            {/* Conditional rendering: Show either the review form or the confirmation modal */}
            {!isOpen ? (
                <>
                    {/* Navigation tabs for toggling between description and reviews */}
                    <ul className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DescActive"}`}>
                        <li className='desc' onClick={() => setReviewShow(!reviewShow)}>Description</li>
                        <li className='rev' onClick={() => setReviewShow(!reviewShow)}>Reviews {ReviewList.length}</li>
                    </ul>

                    {/* Content section for reviews or description */}
                    <div className={`review-content ${reviewShow ? "review-content-show" : "description-show"}`}>
                        <div className='review-showing'>
                            {/* List of reviews */}
                            <ul className='content lab-ul'>
                                {ReviewList.map((val, i) => (
                                    <li key={i}>
                                        {/* Displaying the image and content of each review */}
                                        <div className='post-thumb'>
                                            <Image src={val.imgUrl} alt={val.imgAlt} layout="responsive" width={100} height={100} /> {/* Ensure alt is provided */}
                                        </div>
                                        <div className='post-content'>
                                            <div className='entry-meta'>
                                                <div className="posted-on">
                                                    <a href="#">{val.name}</a>
                                                    <p>{val.date}</p>
                                                </div>
                                            </div>
                                            <div className="entry-content">
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Review form for submitting a new review */}
                            <div className='client-review'>
                                <div className="review-form">
                                    <div className="review-title">
                                        <h5>{reviewTitle}</h5> {/* Review form title */}
                                    </div>
                                    <form action="action" className='row' onSubmit={handleSubmit}>
                                        {/* Full Name input field */}
                                        <div className='col-md-4 col-12'>
                                            <input type="text" name='name' placeholder='Full Name' required />
                                        </div>
                                        {/* Email input field */}
                                        <div className='col-md-4 col-12'>
                                            <input type="email" name='email' value={email} onChange={handleEmailChange} placeholder='Your Email' id='name' required />
                                        </div>
                                        {/* Rating input field */}
                                        <div className='col-md-4 col-12'>
                                            <div className='ratting'>
                                                <span className='me-1'>Your Rating </span>
                                                <Rating /> {/* Custom Rating component */}
                                            </div>
                                        </div>
                                        {/* Message textarea */}
                                        <div className="col-md-12 col-12">
                                            <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows="8" placeholder='Type More Messages' required></textarea>
                                        </div>
                                        {/* Submit button */}
                                        <div className='col-md-12 col-12'>
                                            <button type="submit" className='default-button'><span>Send</span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='description'>
                            <p>
                                Our goal is to provide high-quality, affordable housing options to individuals and families in need. We believe that everyone deserves a safe and comfortable place to call home, and we are committed to helping make that a reality. Our properties are carefully selected and managed to ensure that they meet the needs of our residents and provide a positive living environment. We offer a range of housing options, from apartments and houses to condominiums and townhomes, so that we can accommodate a variety of needs and preferences. We also provide a range of amenities, including on-site laundry, off-street parking, and community space, to make our residents' lives easier and more enjoyable. At RE/MAX, we are dedicated to providing the best possible service to our residents and to making a positive impact in our community.
                            </p>
                            <div className='post-item'>
                                <div className='post-thumb'>
                                    <Image src={dummy} alt="Description Image" layout="responsive" width={100} height={100} /> {/* Ensure alt is provided */}
                                </div>
                                <div className='post-content'>
                                    <ul className='lab-ul'>
                                        <li><span>Stunning Views</span> Our properties offer breathtaking views of the surrounding landscape.</li>
                                        <li><span>Modern Amenities</span> Enjoy the latest amenities, including state-of-the-art appliances, high-speed internet, and modern fixtures.</li>
                                        <li><span>Pet-Friendly</span> We welcome pets and provide pet-friendly amenities, such as dog parks and pet washing stations.</li>
                                        <li><span>Community Events</span> Join us for community events, such as potluck dinners, outdoor concerts, and holiday parties.</li>
                                        <li><span>24/7 Maintenance</span> Our maintenance team is available 24/7 to ensure your home is always in top condition.</li>
                                    </ul>
                                </div>
                            </div>
                            <p>At RE/MAX, we understand that finding the right home can be a challenge. That's why we're committed to providing a wide range of properties to choose from, including apartments, houses, condominiums, and townhomes. Our properties are carefully selected and managed to ensure that they meet the needs of our residents and provide a positive living environment.</p>
                            <Button className='btn' onClick={onOpen} leftIcon={<Icon as={BsFillHandThumbsUpFill} />}>Like</Button>
                        </div>
                    </div>
                </>
            ) : (
                // Full-screen confirmation modal
                <div className="confirmation-modal" onClick={onClose}>
                    <h2>Thank you for your review!</h2>
                    <p>Your feedback is important to us.</p>
                    <Button onClick={onClose}>Close</Button>
                </div>
            )}
        </>
    );
};

export default Review; // Export the Review component for use in other files
