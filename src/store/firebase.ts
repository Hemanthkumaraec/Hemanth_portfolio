// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC11wMK_juzl-m0T4pG5ONh53sz9VtjtWM",
  authDomain: "hemanth-portfolio-ab565.firebaseapp.com",
  projectId: "hemanth-portfolio-ab565",
  storageBucket: "hemanth-portfolio-ab565.firebasestorage.app",
  messagingSenderId: "490601844665",
  appId: "1:490601844665:web:fec8db702d94d56b64b068",
  measurementId: "G-L7ZBF8V4CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);