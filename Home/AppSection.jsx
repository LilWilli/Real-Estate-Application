import React from 'react'; // Importing React
import Link from 'next/link'; // Importing Link from Next.js
import Image from 'next/image'; // Importing Next.js Image component

// Importing images for the app section
import social from '../public/assets/images/app/01.jpg';
import social2 from '../public/assets/images/app/02.jpg';

// Setting up the button text
const btnText = "Sign Up for Free";

// Setting up the title and description for the app section
const title = "Find Your Home Anytime, Anywhere";
const desc = "Explore various houses and estates on any of your devices with our app. Start your journey to finding the perfect home.";

// Creating the AppSection component
const AppSection = () => {
  return (
    // Wrapping the app section in a div with the class name 'app-section padding-tb'
    <div className='app-section padding-tb'>
      <div className='container'>
        {/* Wrapping the section header in a div with the class name 'section-header text-center' */}
        <div className="section-header text-center">
          {/* Adding a link to the sign-up page with the button text */}
          <Link href="/sign-up" className='lab-btn mb-4' legacyBehavior>
            {btnText}
          </Link>
          {/* Adding the title */}
          <h2 className='title'>{title}</h2>
          {/* Adding the description */}
          <p>{desc}</p>
        </div>
        {/* Wrapping the section wrapper in a div with the class name 'section-wrapper' */}
        <div className="section-wrapper">
          {/* Adding an unordered list with the class name 'lab-ul' */}
          <ul className='lab-ul'>
            {/* Adding the first social media image */}
            <li>
              <Link href="#" legacyBehavior>
                <Image src={social} alt="" />
              </Link>
            </li>
            {/* Adding the second social media image */}
            <li>
              <Link href="#" legacyBehavior>
                <Image src={social2} alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Exporting the AppSection component
export default AppSection;

