import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyAD40y3I6xzYuTkZ3X_vpmRO66T7pgBss0",
  authDomain: "a-track-b0211.firebaseapp.com",
  projectId: "a-track-b0211",
  storageBucket: "a-track-b0211.appspot.com",
  messagingSenderId: "295770753745",
  appId: "1:295770753745:web:b97ce2952e601cb6b153f0"
=======
  apiKey: "AIzaSyDiKd-Yd7tZkC6k8rjtsGPztcL5i0l5Z5E",
  authDomain: "attendance-testing-92b14.firebaseapp.com",
  projectId: "attendance-testing-92b14",
  storageBucket: "attendance-testing-92b14.appspot.com",
  messagingSenderId: "578326838869",
  appId: "1:578326838869:web:8a86f06a97ca291b6c5edc",
>>>>>>> 8dcc167 (added signout)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth();

export default app;

export { db, auth };
