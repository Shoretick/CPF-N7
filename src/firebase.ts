// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Importamos las herramientas de autenticación de Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF32zYXdkj5Fn9Hv3C8Uiv5VddufbL7bA",
  authDomain: "cpf-n7.firebaseapp.com",
  projectId: "cpf-n7",
  storageBucket: "cpf-n7.firebasestorage.app",
  messagingSenderId: "934541472904",
  appId: "1:934541472904:web:c3d5751596170d561e9b3d",
  measurementId: "G-LEDN2FPV27"
};

// Inicializar Firebase y Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar y exportar la Autenticación
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };