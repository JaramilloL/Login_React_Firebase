// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  //?inicializacion de la app
import { getAnalytics } from "firebase/analytics";  //?analicis de la app
import { getAuth } from "firebase/auth";            //? autenticaciones de usuarios
import { getFirestore } from 'firebase/firestore'   //? guardar  datos en la base de datos de firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMQ6baDIbputlnSNjCM3_VI0wHNRYcBWk",
  authDomain: "p-ingenieria.firebaseapp.com",
  projectId: "p-ingenieria",
  storageBucket: "p-ingenieria.appspot.com",
  messagingSenderId: "579996355709",
  appId: "1:579996355709:web:c15bcc91d7907b63943514",
  measurementId: "G-9LHS7NVSCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const store = getFirestore(app);
export { app, analytics, auth, store };