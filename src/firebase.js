// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdIuTxMeBxK_wlyu_EPn-Vfj3CLdNp4hc",
  authDomain: "locksoffer-d5108.firebaseapp.com",
  projectId: "locksoffer-d5108",
  storageBucket: "locksoffer-d5108.appspot.com",
  messagingSenderId: "28414686493",
  appId: "1:28414686493:web:4570982b24449cd62f5df4",
  measurementId: "G-6ZM7RTLB81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };