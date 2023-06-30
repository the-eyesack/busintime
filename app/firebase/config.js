// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiCk4oJyEGwTqCe3UJ36GCtujbG3FGz2Q",
    authDomain: "busintime-3a456.firebaseapp.com",
    projectId: "busintime-3a456",
    storageBucket: "busintime-3a456.appspot.com",
    messagingSenderId: "990554833007",
    appId: "1:990554833007:web:75b678bdf7f0b0b51f8d9a",
    measurementId: "G-4K0096X0YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app)