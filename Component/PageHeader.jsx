// Import the React library for building user interfaces
import React from 'react';

// Import the Link component from Next.js for navigation
import Link from 'next/link';

// This is a functional component that takes two props:
// - title: the title of the page (string)
// - curPage: the current page (string), formatted like "Estate / Home"
// It returns a JSX element that represents the page header.
const PageHeader = ({ title, curPage }) => {
    // Split the curPage into segments
    const segments = curPage.split(' / ');

    // Return a JSX element that represents the page header
    return (
        // The outermost div has a class of 'pageheader-section'
        <div className='pageheader-section'>
            {/* The page header is contained within a div with a class of 'container' */}
            <div className="container">
                {/* The page header is contained within a div with a class of 'row' */}
                <div className="row">
                    {/* The page header is contained within a div with a class of 'col-12' */}
                    <div className="col-12">
                        {/* The page header content is contained within a div with a class of 'pageheader-content' */}
                        <div className="pageheader-content text-center">
                            {/* Display the title of the page */}
                            <h2>{title}</h2>
                            {/* Display the breadcrumb navigation */}
                            <nav aria-label='breadcrumb'>
                                <ol className='breadcrumb justify-content-center'>
                                    {/* Home link */}
                                    <li className='breadcrumb-item'>
                                        {/* Navigate to the home page */}
                                        <Link href="/">Home</Link>
                                    </li>
                                    {/* Dynamically create breadcrumb items from segments */}
                                    {segments.map((segment, index) => {
                                        // Determine if the segment is the last one
                                        const isLast = index === segments.length - 1;
                                        // Determine the href for the link
                                        const href = index === 0 ? '/shop' : '#'; // Adjust as needed
                                        // Return a breadcrumb item
                                        return (
                                            <li
                                                key={index}
                                                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                                                aria-current={isLast ? "page" : undefined}
                                            >
                                                {/* If the segment is not the last one, create a link */}
                                                {!isLast ? (
                                                    <Link href={href}>{segment}</Link>
                                                ) : (
                                                    // Otherwise, display the segment as plain text
                                                    segment
                                                )}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the PageHeader component as the default export
export default PageHeader;

