import React from 'react';
import CountUp from 'react-countup';
import Image from 'next/image';
import BusinessMan1 from '../public/assets/images/instructor/01.png';
import Link from 'next/link';

// This is the main component for the About Us section
const AboutUs = () => {
  // Array of objects containing information about the counts
  const countList = [
    {
      iconName: 'icofont-users-alt-4',
      count: '12600',
      text: 'BusinessMan Enrolled',
    },
    {
      iconName: 'icofont-graduate-alt',
      count: '30',
      text: 'Certified Discords',
    },
    {
      iconName: 'icofont-notification',
      count: '100',
      text: 'Rewards and Certificates',
    },
  ];

  return (
    <div className='instructor-section style-2 padding-tb section-bg-ash'>
      <div className='container'>
        <div className='section-wrapper'>
          {/* Row with three columns */}
          <div className="row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3">
            {/* Column for counters */}
            <div className="col">
              {/* Map over the countList array and render a count item for each object */}
              {countList.map((val, i) => (
                <div key={i} className='count-item'>
                  <div className='count-inner'>
                    <div className='count-icon'>
                      {/* Render the icon based on the iconName property */}
                      <i className={val.iconName}></i>
                    </div>
                    <div className="count-content">
                      <h2>
                        <span className='count'>
                          {/* Render the count with animation using CountUp */}
                          <CountUp end={val.count} />
                        </span>
                        <span>+</span>
                      </h2>
                      {/* Render the text */}
                      <a className='white-hover'>{val.text}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Column for content */}
            <div className='col'>
              <div className="instructor-content">
                {/* Render the subtitle */}
                <span className='subtitle'>Why Choose Us</span>
                {/* Render the title */}
                <h2 className='title'>Become a Special Business Man</h2>
                {/* Render the description */}
                <p>
                  Take courses on any of your devices with our contact Page & 
                  learn all about business and anything you want to learn. Just 
                  download & install & start to learn.
                </p>
                {/* Render the button */}
                <Link href="/sign-up" className='lab-btn' legacyBehavior>
                  Go for it Now! Hurry
                </Link>
              </div>
            </div>
            {/* Column for image */}
            <div className='col'>
              <div className="instructor-thumb">
                {/* Render the image */}
                <Image src={BusinessMan1} alt={BusinessMan1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
