// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiYhFnUpkBOKfbNi42A2jHKOUg9nho1Zk",
  authDomain: "pottery-e-commerce.firebaseapp.com",
  projectId: "pottery-e-commerce",
  storageBucket: "pottery-e-commerce.appspot.com",
  messagingSenderId: "253130616054",
  appId: "1:253130616054:web:5be3a0cde75c54cee810d7",
  measurementId: "G-S6CY985F2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;