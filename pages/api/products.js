import data from '../../public/products.json';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    res.status(200).json(data);
}
