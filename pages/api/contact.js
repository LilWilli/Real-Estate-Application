export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, number, subject, message } = req.body;

        // Perform any additional validation or security checks

        // Simulate sending email (you can integrate Nodemailer or any email service here)
        // For now, just return success
        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
