// pages/api/pexels/search.js
import axios from 'axios';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    const { query } = req.query;

    try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
            headers: {
                Authorization: process.env.PEXELS_API_KEY,
            },
            params: {
                query,
                per_page: 1,
            },
        });

        if (response.status === 200) {
            res.status(200).json(response.data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch images from Pexels' });
        }
    } catch (error) {
        console.error('Error fetching images from Pexels:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
