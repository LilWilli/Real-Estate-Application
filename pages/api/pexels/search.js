// Importing axios for making HTTP requests
import axios from 'axios';

// Defining an async function named handler which takes in two parameters: req and res
export default async function handler(req, res) {
  // Destructuring the query property from the query parameter of the req object
  const { query } = req.query;

  try {
    // Making a GET request to the Pexels API with the query parameter and setting the per_page to 1
    const response = await axios.get('https://api.pexels.com/v1/search', {
      // Setting the Authorization header with the value of the PEXELS_API_KEY environment variable
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      // Setting the query parameter to the value of the query variable and setting the per_page parameter to 1
      params: {
        query,
        per_page: 1,
      },
    });

    // Sending a JSON response with the data from the Pexels API response
    res.status(200).json(response.data);

  } catch (error) {
    // Logging the error to the console
    console.error('Error fetching images from Pexels:', error);

    // Sending a JSON response with an error message
    res.status(500).json({ error: 'Error fetching images from Pexels' });
  }
}

