import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from 'firebase/auth';
import app from '../pages/Firebase/firebase.config';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const createUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      console.log('User created:', user);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      console.log('User logged in:', user);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGmail = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      setUser(user);
      console.log('User signed in with Google:', user);
      toast.success('User signed in with Google!');
    } catch (error) {
      setLoading(false);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithFacebook = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;
      setUser(user);
      console.log('User signed in with Facebook:', user);
      toast.success('User signed in with Facebook!');
    } catch (error) {
      setLoading(false);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithTwitter = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, twitterProvider);
      const user = userCredential.user;
      setUser(user);
      console.log('User signed in with Twitter:', user);
      toast.success('User signed in with Twitter!');
    } catch (error) {
      setLoading(false);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGitHub = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, githubProvider);
      const user = userCredential.user;
      setUser(user);
      console.log('User signed in with GitHub:', user);
      toast.success('User signed in with GitHub!');
    } catch (error) {
      setLoading(false);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleError = (error) => {
    if (error.code === 'auth/popup-closed-by-user') {
      console.warn('User closed sign-in popup.');
      toast.warning('Sign-in popup closed by user.');
    } else {
      console.error('Error during sign-in:', error);
      toast.error('An error occurred during sign-in. Please try again.');
    }
  };

  const authInfo = {
    user,
    loading,
    error,
    createUser,
    logIn,
    signUpWithGmail,
    logOut,
    signUpWithFacebook,
    signUpWithTwitter,
    signUpWithGitHub,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
