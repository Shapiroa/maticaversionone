// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATGzJ7U0rkgUN38-uMOn-tnG0YuOAQn2U",
  authDomain: "maticaversionone.firebaseapp.com",
  projectId: "maticaversionone",
  storageBucket: "maticaversionone.firebasestorage.app",
  messagingSenderId: "758566575189",
  appId: "1:758566575189:web:28cc3f3e7d3467bde188dc",
  measurementId: "G-5ZGN46TKV7"
};

let app;
let analytics;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { app, analytics };