import { AuthContext } from 'context/AuthProvider';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js router
import Link from 'next/link';
import { toast } from 'react-toastify';
import { faFacebook, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = () => { // Changed the component name to Signup
  const title = "Sign Up"; // Updated title for Sign Up
  const socialTitle = "Sign Up with Social Media"; // Updated social title
  const btnText = "Sign Up Now"; // Updated button text
  const [errorMessage, setErrorMessage] = useState();
  const { signUpWithGitHub, signUpWithGmail, signInWithFacebook, signInWithTwitter } = useContext(AuthContext); // Include social sign-up functions
  const router = useRouter();
  const from = router.query?.from || "/successful"; // Getting the route where the user came from

  // Handle signup process with Node.js backend
  const handleSignUp = async (event) => { // Keeping the signup handling method
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup Successful');
        router.replace(from); // Redirect after successful signup
      } else {
        setErrorMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='login-section padding-tb section-bg'>
      <div className="container">
        <div className="account-wrapper">
          <h3 className='title'>{title}</h3> {/* Updated title here */}

          <form className='account-form' onSubmit={handleSignUp}> {/* Use handleSignUp only */}
            <div className='form-group'>
              <input type="email" name='email' id='email' placeholder='Email Address *' required />
            </div>
            <div className='form-group'>
              <input type="password" name='password' id='password' placeholder='Enter Password *' required />
            </div>
            <div className='form-group'>
              <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password *' required /> {/* Changed placeholder for clarity */}
            </div>
            <div>
              {errorMessage && (
                <div className='error-message text-danger'>
                  {errorMessage}
                </div>
              )}
            </div>
            <div className='form-group'>
              <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                <div className='checkgroup'>
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <Link href={"/forgetpass"}>Forgot Password</Link>
              </div>
            </div>
            <div className='form-group'>
              <button type='submit' className='d-block lab-btn'>
                <span>{btnText}</span> {/* Updated button text */}
              </button>
            </div>
          </form>

          <div className="account-bottom">
            <span className='d-block cate pt-10'>
              Already have an account?{" "}
              <Link href="/login" style={{ cursor: 'pointer' }}>
                Login
              </Link>
            </span>
            <span className='or'>
              <span>or</span>
            </span>
            <h5 className='subtitle'>{socialTitle}</h5> {/* Updated social title */}
            <ul className='lab-ul social-icons justify-content-center'>
              <li>
                <a className='github' onClick={signUpWithGitHub}><FontAwesomeIcon icon={faGithub} /></a>
              </li>
              <li>
                <a className='google' onClick={signUpWithGmail}><FontAwesomeIcon icon={faGoogle} /></a>
              </li>
              <li>
                <a className='twitter' onClick={signInWithTwitter}><FontAwesomeIcon icon={faTwitter} /></a>
              </li>
              <li>
                <a className='facebook' onClick={signInWithFacebook}><FontAwesomeIcon icon={faFacebook} /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; // Exporting the updated component
