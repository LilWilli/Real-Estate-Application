import React from 'react'; // Importing React library
import Image from 'next/image'; // Importing Next.js Image component
import Link from 'next/link'; // Importing Next.js Link component
import avatar from '../public/assets/images/clients/avater.jpg'; // Importing avatar image

// Setting up the title and description variables
const title = "More Than 60,000 Customers";
const desc = "Buy Products on our app on any device & enjoy your time what you want. Just download & install & start to shopping";

// Creating an array of client objects
const clientList = [
    { imgUrl: avatar, imgAlt: "Education thumb rajibraj91 rajibraj", text: "Join with Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
    { imgUrl: avatar, imgAlt: "Education thumb rajubraj91 rajibraj", text: "Join With Us" },
];

// Creating a functional component named LocationSprade
const LocationSprade = () => {
    return (
        // Returning JSX code
        <div className='clients-section style-2 padding-tb'>
            {/* Wrapping the content with a div element with class name 'clients-section style-2 padding-tb' */}
            <div className='container'>
                {/* Wrapping the content with a div element with class name 'container' */}
                <div className='section-header text-center'>
                    {/* Wrapping the content with a div element with class name 'section-header text-center' */}
                    <h2 className='title'>{title}</h2> {/* Displaying the title */}
                    <p>{desc}</p> {/* Displaying the description */}
                </div>
                <div className='section-wrapper'>
                    {/* Wrapping the content with a div element with class name 'section-wrapper' */}
                    <div className='clients'>
                        {/* Wrapping the content with a div element with class name 'clients' */}
                        {clientList.map((val, i) => (
                            // Rendering a div element with class name 'client-list'
                            <div key={i} className='client-list'>
                                <Link href="/sign-up" legacyBehavior>
                                    {/* Rendering a Link component with href and legacyBehavior props */}
                                    <a className='client-content'>
                                        {/* Rendering an anchor element with class name 'client-content' */}
                                        <span>{val.text}</span> {/* Displaying the text property of the current item */}
                                    </a>
                                </Link>
                                <div className='client-thumb'>
                                    {/* Rendering a div element with class name 'client-thumb' */}
                                    <Image src={val.imgUrl} alt={val.imgAlt}  width={500} height={500} />
                                    {/* Rendering an Image component with src, alt, width, and height properties */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSprade;

