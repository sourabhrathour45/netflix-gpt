// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSL6rw0s421UzpMXTqm0ZZS-HFwaZJpRM",
  authDomain: "netflixgpt-ai.firebaseapp.com",
  projectId: "netflixgpt-ai",
  storageBucket: "netflixgpt-ai.appspot.com",
  messagingSenderId: "1022886862880",
  appId: "1:1022886862880:web:a4f6e5456436f6d2a9dc45",
  measurementId: "G-G8L3D2XM69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth,  } from "firebase/auth";

export const auth = getAuth();