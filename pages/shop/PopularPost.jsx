import React from 'react'; // Importing React library
import Link from 'next/link'; // Importing Link component from Next.js
import Image from 'next/image'; // Importing Image component from Next.js

// Defining the title of the widget
const title = "Most Popular Post";

// Array of objects containing information about the popular posts
const postList = [
    {
        id: 1, // Unique identifier for the post
        imgUrl: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost%252Es3%252Eamazonaws%252Ecom%2Fpublic%2FRGR2VBAUYDUP6ZKPSD6YB4PG6M%252Ejpg&w=128&h=128", // URL of the post image
        imgAlt: "Samsung", // Alternative text for the image
        title: "New Samsung Laptop release by the Samsung community", // Title of the post
        date: "March 06,2022", // Date of the post
    },
    {
        id: 2,
        imgUrl: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost%252Es3%252Eamazonaws%252Ecom%2Fpublic%2FPIZOPYCUCG4IEARDF23YGPVG6I_size-normalized%252Ejpg&w=464&h=260",
        imgAlt: "BasketBall",
        title: "U.S. women’s basketball add punch to starting lineup, put away Nigeria to reach semifinals",
        date: "August 07, 2024",
    },
    {
        id: 3,
        imgUrl: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost%252Es3%252Eamazonaws%252Ecom%2Fpublic%2F23SYTXRBLEI6XLKTJQP5USMQPU_size-normalized%252Ejpg&w=128&h=128",
        imgAlt: "Trump Announcement",
        title: "After a week of U.K. riots, thousands fill the streets to decry racism",
        date: "September 09, 2023",
    },
    {
        id: 4,
        imgUrl: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost%252Es3%252Eamazonaws%252Ecom%2Fpublic%2FMCD6ZVV5DFG47ISXMQNFBUTY6Q%252EJPG&w=128&h=128",
        imgAlt: "Swimming Medal",
        title: "Ending 20-year medal drought, U.S. wins silver in artistic swimming",
        date: "June 05, 2022"
    },
];

// Defining the PopularPost component
const PopularPost = () => {
    return (
        // JSX for the PopularPost widget
        <div className='widget widget-post'>
            <div className="widget-header">
                <h5 className='title'>{title}</h5> {/* Displaying the title */}
            </div>
            <ul className='widget-wrapper list-unstyled'>
                {postList.map((blog) => (
                    // Mapping over the postList array and rendering a list item for each post
                    <li key={blog.id} className='d-flex align-items-start mb-3'>
                        <div className="post-thumb me-3">
                            <Link href={`/blog/${blog.id}`} passHref>
                                <Image src={blog.imgUrl} alt={blog.imgAlt} width={128} height={128} layout="intrinsic" /> {/* Displaying the post image */}
                            </Link>
                        </div>
                        <div className="post-content">
                            <Link href={`/blog/${blog.id}`} passHref>
                                <h6 className='mb-1'>{blog.title}</h6> {/* Displaying the post title */}
                            </Link>
                            <p className='text-muted mb-0'>{blog.date}</p> {/* Displaying the post date */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularPost; // Exporting the PopularPost component
