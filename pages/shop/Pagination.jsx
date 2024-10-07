import React from 'react';
import styles from './pagination.module.css';

// This component is used for pagination in the shop page
const Pagination = ({ productPerPage, totalProducts, paginate, activePage }) => {
    // Calculate the total number of pages based on the total number of products and products per page
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumber.push(i);
    }

    // Function to handle the click event for the previous button
    const handlePrevious = (e) => {
        e.preventDefault(); // Prevent the default action of the click event
        if (activePage > 1) { // Check if the current page is not the first page
            paginate(activePage - 1); // Call the paginate function to navigate to the previous page
        }
    };

    // Function to handle the click event for the next button
    const handleNext = (e) => {
        e.preventDefault(); // Prevent the default action of the click event
        if (activePage < pageNumber.length) { // Check if the current page is not the last page
            paginate(activePage + 1); // Call the paginate function to navigate to the next page
        }
    };

    // Function to handle the click event for the page number buttons
    const handlePageClick = (e, number) => {
        e.preventDefault(); // Prevent the default action of the click event
        paginate(number); // Call the paginate function to navigate to the selected page
    };

    return (
        <ul className='default-pagination lab-ul'>
            <li>
                {/* Previous button */}
                <a href="#" onClick={handlePrevious}>
                    <i className='icofont-rounded-left'></i>
                </a>
            </li>
            {
                // Render the page number buttons
                pageNumber.map((number) => (
                    <li key={number} className={`${styles.page_item} ${number === activePage ? 'bg-warning' : ''}`}>
                        <button onClick={(e) => handlePageClick(e, number)} className='bg-transparent'>{number}</button>
                    </li>
                ))
            }
            <li>
                {/* Next button */}
                <a href="#" onClick={handleNext}>
                    <i className='icofont-rounded-right'></i>
                </a>
            </li>
        </ul>
    );
}

export default Pagination;
