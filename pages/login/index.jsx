import { AuthContext } from 'context/AuthProvider';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js router
import Link from 'next/link';
import { toast } from 'react-toastify';
import { faFacebook, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const title = "Login";
  const socialTitle = "Login with Social Media";
  const btnText = "Login Now";
  const [errorMessage, setErrorMessage] = useState();
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup
  const { signUpWithGitHub, logIn, signUpWithGmail, signInWithFacebook, signInWithTwitter } = useContext(AuthContext); // Include Facebook and Twitter
  const router = useRouter();
  const from = router.query?.from || "/successful"; // Getting the route where the user came from

  // Handle login process with Node.js backend
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login Successful');
        router.replace(from); // Redirect after successful login
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  // Handle signup process with Node.js backend
  const handleSignUp = async (event) => {
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
          <h3 className='title'>{isSignUp ? 'Sign Up' : title}</h3>

          <form className='account-form' onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <div className='form-group'>
              <input type="email" name='email' id='email' placeholder='Email Address *' required />
            </div>
            <div className='form-group'>
              <input type="password" name='password' id='password' placeholder='Enter Password *' required />
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
                <span>{isSignUp ? 'Sign Up Now' : btnText}</span>
              </button>
            </div>
          </form>

          <div className="account-bottom">
            <span className='d-block cate pt-10'>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{" "}
              <a onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer' }}>
                {isSignUp ? 'Login' : 'Sign Up'}
              </a>
            </span>
            <span className='or'>
              <span>or</span>
            </span>
            <h5 className='subtitle'>{socialTitle}</h5>
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

export default Login;
