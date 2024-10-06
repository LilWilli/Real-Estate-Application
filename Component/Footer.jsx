import React from 'react'; // Importing React
import Link from 'next/link'; // Importing Link from Next.js

// Title and description for the footer section
const title = 'About EstateCart';
const desc = 'Individual Theme Number for one Class Business University in the world Out There';

// Titles for different sections in the footer
const itemTitle = 'Categories';
const quickTitle = 'Quick Links';
const tweetTitle = 'Recent Tweets';

// Array of address information
const addressList = [
  {
    iconName: 'icofont-google-map',
    text: ' New York, USA.',
  },
  {
    iconName: 'icofont-phone',
    text: ' +234 908 4988 744',
  },
  {
    iconName: 'icofont-envelope',
    text: ' demi.adepitan@gmail.com',
  },
];

// Array of social media links
const socialList = [
  {
    iconName: 'icofont-facebook',
    siteLink: '#',
    className: 'facebook',
  },
  {
    iconName: 'icofont-twitter',
    siteLink: '#',
    className: 'twitter',
  },
  {
    iconName: 'icofont-linkedin',
    siteLink: '#',
    className: 'linkedin',
  },
  {
    iconName: 'icofont-instagram',
    siteLink: '#',
    className: 'instagram',
  },
  {
    iconName: 'icofont-pinterest',
    siteLink: '#',
    className: 'pinterest',
  },
];

// Array of category items
const itemsList = [
  { text: 'All Houses', link: '/about' },
  { text: 'Estate', link: '/estate' },
  { text: 'Blog', link: '/blog' },
  { text: 'About', link: '/about' },
  { text: 'Policy', link: '#' },
  { text: 'FAQs', link: '/about' },
];

// Array of quick links
const quickList = [
  { text: 'Summer Shelter', link: '#shelter' },
  { text: 'Building Events', link: '#events' },
  { text: 'House Gallery', link: '#gallery' },
  { text: 'Building Forums', link: '#forums' },
  { text: 'Privacy Policy', link: '#privacy' },
  { text: 'Terms Of Use', link: '#Terms' },
];

// Array of recent tweets
const tweetList = [
  {
    iconName: 'icofont-twitter',
    desc: 'Admiring LilWilli @Realestate Greetings! @React_Template Grab your item and 50% Big Sale Offer!!',
  },
  {
    iconName: 'icofont-twitter',
    desc: 'Admiring LilWilli @Realestate Greetings! @React_Template Grab your item and 50% Big Sale Offer!!',
  },
];

// Array of footer bottom links
const footerBottomList = [
  { text: 'Faculty', link: '#faculty' },
  { text: 'Staff', link: '#staff' },
  { text: "Students", link: "#students" },
  { text: "LilWilli", link: "#link" },
];

// Component for rendering footer items
const FooterItem = ({ title, content }) => (
  <div className="col-md-3 col-sm-6">
    <div className="footer-item our-address">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="title">
            <h4>{title}</h4>
          </div>
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Footer component
const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer-top dark-view padding-tb">
        <div className="container">
          <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
            <FooterItem
              title={title}
              content={
                <>
                  <p>{desc}</p>
                  <ul className="lab-ul office-address">
                    {addressList.map((val, i) => (
                      <li key={i}>
                        <i className={val.iconName}></i> {val.text}
                      </li>
                    ))}
                  </ul>
                  <ul className="lab-ul social-icons">
                    {socialList.map((val, i) => (
                      <li key={i}>
                        <a href={val.siteLink} className={val.className}>
                          <i className={val.iconName}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
            <FooterItem
              title={itemTitle}
              content={
                <ul className="lab-ul office-address">
                  {itemsList.map((val, i) => (
                    <li key={i}>
                      <Link href={val.link} legacyBehavior>
                        <a>{val.text}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            />
            <FooterItem
              title={quickTitle}
              content={
                <ul className="lab-ul office-address">
                  {quickList.map((val, i) => (
                    <li key={i}>
                      <Link href={val.link} legacyBehavior>
                        <a>{val.text}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            />
            <FooterItem
              title={tweetTitle}
              content={
                <ul className="lab-ul office-address">
                  {tweetList.map((val, i) => (
                    <li key={i}>
                      <i className={val.iconName}></i> {val.desc}
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="section-wrapper">
            <p>
              &copy; 2024{' '}
              <Link href="/" legacyBehavior>
                <a>House Cart</a>
              </Link>{' '}
              Designed by <a href="/" target="_blank">LilWilli</a>
            </p>
            <div className="footer-bottom-list">
              {footerBottomList.map((val, i) => (
                <Link href={val.link} key={i} legacyBehavior>
                  <a>{val.text}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

