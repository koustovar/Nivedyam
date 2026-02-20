
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpH2NOoMKCNwKcb5dfWE4Zfm1IaqYdayY",
    authDomain: "nivedyam-8c009.firebaseapp.com",
    projectId: "nivedyam-8c009",
    storageBucket: "nivedyam-8c009.firebasestorage.app",
    messagingSenderId: "1024644995343",
    appId: "1:1024644995343:web:cab6d8b41e60f4d35a067a",
    measurementId: "G-CE1PJ6KSJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
