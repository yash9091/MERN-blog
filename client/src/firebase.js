// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-79555.firebaseapp.com",
  projectId: "mern-blog-79555",
  storageBucket: "mern-blog-79555.appspot.com",
  messagingSenderId: "912851973015",
  appId: "1:912851973015:web:ce6fdb49091fb189eecad2"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);