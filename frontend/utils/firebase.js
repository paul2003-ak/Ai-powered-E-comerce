import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "onecart-6dd0e.firebaseapp.com",
  projectId: "onecart-6dd0e",
  storageBucket: "onecart-6dd0e.firebasestorage.app",
  messagingSenderId: "729043700006",
  appId: "1:729043700006:web:cbf65d8799d187bbd019e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider= new GoogleAuthProvider()



export {auth,provider}