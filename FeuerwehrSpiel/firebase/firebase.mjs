import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCscLHeHmDxKAEKo_ayX7OajUKQIrlYC3s",
  authDomain: "wfp1-eceac.firebaseapp.com",
  projectId: "wfp1-eceac",
  storageBucket: "wfp1-eceac.appspot.com",
  messagingSenderId: "988978460804",
  appId: "1:988978460804:web:5cc1ad7f24aef0a61bead1",
  measurementId: "G-TBTK5NPHS3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Authentication

export { db, auth }; // Export db and auth
