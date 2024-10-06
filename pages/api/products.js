// Importing the data from the JSON file located in the public folder
import data from '../../public/products.json';

// This is an asynchronous function named handler that takes two parameters: req and res
export default async function handler(req, res) {
    // Setting the status of the response to 200 OK and sending the data as a JSON response
    res.status(200).json(data);
}

