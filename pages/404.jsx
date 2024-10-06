import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import invalid_page from '../public/assets/images/404.png';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center p-4 not-found-container">
      <div className="mb-4 animated bounceIn">
        <Image src={invalid_page} alt="404 Not Found" width={300} height={300} className="img-fluid rounded shadow" />
      </div>
      <h1 className="mb-3 text-primary animated fadeInDown">It's Not Your Fault!</h1>
      <p className="mb-4 text-muted animated fadeInUp">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
      <Link href="/" legacyBehavior>
        <a className="btn btn-primary btn-lg animated bounceIn delay-1s">Go Back to Home</a>
      </Link>
    </div>
  );
};

export default NotFound;
