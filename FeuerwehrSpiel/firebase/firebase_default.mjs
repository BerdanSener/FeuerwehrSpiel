// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCscLHeHmDxKAEKo_ayX7OajUKQIrlYC3s",
  authDomain: "wfp1-eceac.firebaseapp.com",
  projectId: "wfp1-eceac",
  storageBucket: "wfp1-eceac.appspot.com",
  messagingSenderId: "988978460804",
  appId: "1:988978460804:web:5cc1ad7f24aef0a61bead1",
  measurementId: "G-TBTK5NPHS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
