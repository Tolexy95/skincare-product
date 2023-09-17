// firebaseAuth.js
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase"; // Import your Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firebase authentication functions
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // You can save user data to your database here
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};


export const signInEmail = async (email, password) => {
  try {
    // Check if the user exists by attempting to sign in with provided credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user credentials (example: store in local storage)
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  } catch (error) {
    // Handle specific error codes
    if (error.code === 'auth/user-not-found') {
      // User does not exist, prompt to sign up
      throw new Error("User does not exist. Please sign up first.");
    } else if (error.code === 'auth/wrong-password') {
      // Incorrect password, credentials don't match
      throw new Error("Incorrect email or password. Please try again.");
    } else {
      console.error("Error signing in:", error);
      throw error;
    }
  }
};


export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    // Save user credentials (example: store in local storage)
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};


export const signOutUser = async () => {
  try {
    await signOut(auth);
    // Clear user credentials (example: remove from local storage)
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // Email sent, inform the user
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export const listenToAuthStateChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      // Save user credentials (example: store in local storage)
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // User is signed out
      // Clear user credentials (example: remove from local storage)
      localStorage.removeItem("user");
    }
    callback(user);
  });
};
