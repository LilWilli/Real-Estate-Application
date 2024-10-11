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

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching images from Pexels:', error);
        res.status(500).json({ error: 'Error fetching images from Pexels' });
    }
}
