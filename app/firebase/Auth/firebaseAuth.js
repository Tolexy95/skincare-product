// firebaseAuth.js
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);

    // Save user credentials and additional info (email and full name)
    const userInfo = {
      email: user.email,
      fullName: user.displayName, // Assuming you have stored the full name in the user's profile
    };
    localStorage.setItem('user', JSON.stringify(userInfo));

    return user;
  } catch (error) {

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

// Function to check if the user is logged in
export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return !!user;
};