// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
  apiKey: "AIzaSyCBv0lgUxKTagqU_Lwr4m3FmPTCDE4jdh8",
  authDomain: "glow-and-glam-e-commerce.firebaseapp.com",
  projectId: "glow-and-glam-e-commerce",
  storageBucket: "glow-and-glam-e-commerce.appspot.com",
  messagingSenderId: "901762030495",
  appId: "1:901762030495:web:3342774615e2fef7d87baa",
  measurementId: "G-MKWGXC80BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);