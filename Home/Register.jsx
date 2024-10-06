import React, { useState } from 'react'; // Importing React and useState hook
import axios from 'axios'; // Importing axios for making API calls
import { toast } from 'react-toastify'; // Importing toast for displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing styles for toast notifications
import { useRouter } from 'next/router'; // Importing useRouter hook for navigation

// Register component
const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '', // Username
    email: '', // Email
    phone: '', // Phone number
    password: '', // Password
  });

  // Router object for navigation
  const router = useRouter();

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring name and value from event target
    setFormData({ ...formData, [name]: value }); // Updating form data with new value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission

    try {
      // Sending registration request to backend API
      const response = await axios.post('/api/register', formData);
      toast.success('Registration successful! Redirecting to confirmation page.'); // Displaying success toast message
      console.log('Registration successful:', response.data); // Logging response data

      // Adding slight delay to ensure toast message is shown before redirection
      setTimeout(() => {
        router.push('/confirmation?registered=true'); // Redirecting to confirmation page
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong, please try again.'); // Displaying error toast message
      console.error('Registration failed:', error.response?.data); // Logging error response data
    }
  };

  return (
    // Register section
    <section className='register-section padding-tb pb-0'>
      <div className="container">
        <div className='row g-4 row-cols-lg-2 row-cols-1 align-items-center'>
          <div className="col">
            <div className="section-header">
              <span className='subtitle'>Save The Stress</span>
              <h2 className='title'>
                Join on Day Long Free Websites for <b>Advance <span>Sales</span></b> on Purchase
              </h2>
              <p>Discount for Limited Time Offer! Hurry Up</p>
            </div>
          </div>
          <div className="col">
            <div className='section-wrapper'>
              <h4>Register Now</h4>
              <form className='register-form' onSubmit={handleSubmit}>
                {/* Input fields for username, email, phone, password */}
                <input
                  type="text"
                  name='name'
                  placeholder='UserName'
                  className='reg-input'
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name='email'
                  placeholder='Email'
                  className='reg-input'
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name='phone'
                  placeholder='Phone'
                  className='reg-input'
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name='password'
                  placeholder='Password'
                  className='reg-input'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type='submit' className='lab-btn'>
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

