/*
 * Importing the React library for building user interfaces.
 * We're using this to create a reusable UI component.
 */
import React from 'react'

/*
 * Defining a functional component named Rating. 
 * This component will return a rating component with 5 stars.
 */
const Rating = () => {
  // Returning a JSX element, which is a React component.
  return (
    // The JSX element is a span with a class name of 'ratting'.
    <span className='ratting'>
      {/* 5 em elements representing stars are placed inside the span. */}
      <i className='icofont-ui-rating'></i>
      <i className='icofont-ui-rating'></i>
      <i className='icofont-ui-rating'></i>
      <i className='icofont-ui-rating'></i>
      <i className='icofont-ui-rating'></i>
    </span>
  )
}

/*
 * Exporting the Rating component as the default export.
 * This means it can be imported and used in other files like this:
 * import Rating from 'path/to/Rating'
 */
export default Rating
