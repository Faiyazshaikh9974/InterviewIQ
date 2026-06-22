// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "inteviewiq-c745a.firebaseapp.com",
  projectId: "inteviewiq-c745a",
  storageBucket: "inteviewiq-c745a.firebasestorage.app",
  messagingSenderId: "885697649899",
  appId: "1:885697649899:web:37657eeb95c9f77bb032ae",
  measurementId: "G-L5FZ2Y4FC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}