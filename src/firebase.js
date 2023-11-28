// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL9P9UtvHhcVyUE9rUCAGyBenYX-SQ94M",
  authDomain: "podcast-platform-75665.firebaseapp.com",
  projectId: "podcast-platform-75665",
  storageBucket: "podcast-platform-75665.appspot.com",
  messagingSenderId: "246106771074",
  appId: "1:246106771074:web:bda3ce86dcb7bdd4736e9b",
  measurementId: "G-Q066GTTQFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, analytics };
