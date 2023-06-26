// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8hvLu1-JROmPvq5HbvvyY5tUpiwv3TSE",
    authDomain: "nbcburewala-75283.firebaseapp.com",
    projectId: "nbcburewala-75283",
    storageBucket: "nbcburewala-75283.appspot.com",
    messagingSenderId: "938469826682",
    appId: "1:938469826682:web:dce7147fd93207ae015bc3",
    measurementId: "G-KPNBMQLJ3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }