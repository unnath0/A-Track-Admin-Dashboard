import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD40y3I6xzYuTkZ3X_vpmRO66T7pgBss0",
  authDomain: "a-track-b0211.firebaseapp.com",
  projectId: "a-track-b0211",
  storageBucket: "a-track-b0211.appspot.com",
  messagingSenderId: "295770753745",
  appId: "1:295770753745:web:b97ce2952e601cb6b153f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth();

export default app;

export { db, auth };
