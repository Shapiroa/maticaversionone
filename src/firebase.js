// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATGzJ7U0rkgUN38-uMOn-tnG0YuOAQn2U",
  authDomain: "maticaversionone.firebaseapp.com",
  projectId: "maticaversionone",
  storageBucket: "maticaversionone.appspot.com",
  messagingSenderId: "758566575189",
  appId: "1:758566575189:web:28cc3f3e7d3467bde188dc",
  measurementId: "G-5ZGN46TKV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };