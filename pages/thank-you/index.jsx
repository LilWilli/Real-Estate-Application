import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import styles from '../../Component/thankyou.module.css'; // Optional styling, create your own CSS module if needed.

const ThankYouPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page after 5 seconds
        const timer = setTimeout(() => {
            router.push('/'); // Corrected to redirect to the homepage
        }, 5000); // 5 seconds

        // Cleanup timer if the component is unmounted before redirection
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.thankYouPage}>
            <div className={styles.container}>
                <h1>Thank You for Your Purchase!</h1>
                <p>Your order has been placed successfully.</p>
                <p>You will be redirected to the homepage shortly...</p>
                <Button variant="primary" onClick={() => router.push('/')}>
                    Go to Homepage Now
                </Button>
            </div>
        </div>
    );
};

export default ThankYouPage;
