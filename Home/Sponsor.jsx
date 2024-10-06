// This is a React component that displays a section of sponsors.
// The sponsors are imported as images and displayed in a swiper slider.
// The swiper slider has different configurations for different screen sizes.

import React from 'react'; // Importing React library
import Image from 'next/image'; // Importing Image component from next/image

// Importing sponsor images
import sponsor1 from '../public/assets/images/sponsor/01.png';
import sponsor2 from '../public/assets/images/sponsor/02.png';
import sponsor3 from '../public/assets/images/sponsor/03.png';
import sponsor4 from '../public/assets/images/sponsor/04.png';
import sponsor5 from '../public/assets/images/sponsor/05.png';
import sponsor6 from '../public/assets/images/sponsor/06.png';

// Importing Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

// An array of objects containing the URL of each sponsor image
const sponsorList = [
  { imgUrl: sponsor1 },
  { imgUrl: sponsor2 },
  { imgUrl: sponsor3 },
  { imgUrl: sponsor4 },
  { imgUrl: sponsor5 },
  { imgUrl: sponsor6 },
];

// The Sponsor component
const Sponsor = () => {
  return (
    // The sponsor section
    <div className="sponsor-section section-bg">
      <div className="container">
        <div className="section-wrapper">
          <div className="sponsor-slider">
            {/* The swiper slider */}
            <Swiper
              slidesPerView={2} // Number of slides to show per view
              spaceBetween={20} // Space between slides in px
              autoplay={{
                delay: 1500, // Delay between transitions in ms
                disableOnInteraction: false, // Stop autoplay on interaction
              }}
              breakpoints={{
                // Breakpoints for different screen sizes
                640: {
                  slidesPerView: 1, // Number of slides to show per view
                  spaceBetween: 20, // Space between slides in px
                },
                768: {
                  slidesPerView: 3, // Number of slides to show per view
                  spaceBetween: 40, // Space between slides in px
                },
                1024: {
                  slidesPerView: 4, // Number of slides to show per view
                  spaceBetween: 50, // Space between slides in px
                },
              }}
              modules={[Autoplay]} // Autoplay module
              className="mySwiper" // CSS class for the swiper container
            >
              {/* Map each sponsor to a SwiperSlide */}
              {sponsorList.map((val, i) => (
                <SwiperSlide key={i}>
                  <div className="sponsor-item">
                    <div className="sponsor-thumb">
                      {/* Display the sponsor image */}
                      <Image src={val.imgUrl} alt={`Sponsor ${i + 1}`} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor; // Exporting the Sponsor component

