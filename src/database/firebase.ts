import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiKd-Yd7tZkC6k8rjtsGPztcL5i0l5Z5E",
  authDomain: "attendance-testing-92b14.firebaseapp.com",
  projectId: "attendance-testing-92b14",
  storageBucket: "attendance-testing-92b14.appspot.com",
  messagingSenderId: "578326838869",
  appId: "1:578326838869:web:8a86f06a97ca291b6c5edc",
  measurementId: "G-E5Z61H70FS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth();

export default app;

export {db, auth};
