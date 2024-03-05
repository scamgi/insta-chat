// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA24n8V5PqOrhdHcAxDtvO17Uj80dH-t2I",
  authDomain: "insta-chat-bf398.firebaseapp.com",
  projectId: "insta-chat-bf398",
  storageBucket: "insta-chat-bf398.appspot.com",
  messagingSenderId: "883666803263",
  appId: "1:883666803263:web:d58096cd00741a5716f68a",
  measurementId: "G-WJM92EJNGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
