import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import img from '../public/assets/images/app/03.png';
import { setCookie } from 'cookies-next';
import { AuthContext } from 'context/AuthProvider';

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const user = useContext(AuthContext);
  console.log(user)
  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to set the navigation access cookie
  const handleNavigation = () => {
    setCookie('nav-access', 'true', { maxAge: 3600 }); // 1-hour cookie
  };

  return (
    <header className={`header-section style-4 ${headerFixed ? 'header-fixed fadeIn' : ''}`}>
      <div className="header-top d-md-none">
        <div className="container">
          <div className="header-top-area">
            <Link href="/signup" className="lab-btn me-3" onClick={handleNavigation}>
              <span>Create Account</span>
            </Link>
            <Link href="/login" onClick={handleNavigation}>
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2 col-6">
              <div className="logo">
                <Link href="/">
                  <Image width={100} height={100} src={img} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-10 col-6">
              <div className="menu-area d-flex justify-content-end align-items-center">
                <div className="menu">
                  <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                    <li>
                      <Link href="/" onClick={handleNavigation}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop" onClick={handleNavigation}>
                        Estate Shop
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" onClick={handleNavigation}>
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" onClick={handleNavigation}>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" onClick={handleNavigation}>
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/signup" className='lab-btn' onClick={handleNavigation}>
                        Create Account
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" onClick={handleNavigation}>
                        Log In
                      </Link>
                    </li>
                  </ul>
                </div>
                <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={`ellepsis-bar d-md-none ${socialToggle ? "active" : ""}`} onClick={() => setSocialToggle(!socialToggle)}>
                  <i className='icofont-info-square'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
