// pages/api/contact.js
export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, number, subject, message } = req.body;

        // Optional: Add server-side validation here

        // Simulating email sending (you can integrate Nodemailer or other email services)
        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
