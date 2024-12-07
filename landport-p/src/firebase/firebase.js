// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";     // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBn49LlUNu5dLL3RnCq21eiPEAatvVGQE",
    authDomain: "landport-p2.firebaseapp.com",
    projectId: "landport-p2",
    storageBucket: "landport-p2.firebasestorage.app",
    messagingSenderId: "423260586687",
    appId: "1:423260586687:web:c942411974b3fa9d163c0a",
    measurementId: "G-51MY7WTXP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Analytics (Optional, only if you're using it)
const analytics = getAnalytics(app);

export { app, firestore, storage, analytics };

