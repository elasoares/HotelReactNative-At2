// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAh9Hyz04H4jsX-cHBvcBlTWMHuXpd6j1s",
  authDomain: "projetoatpb.firebaseapp.com",
  databaseURL: "https://projetoatpb-default-rtdb.firebaseio.com",
  projectId: "projetoatpb",
  storageBucket: "projetoatpb.appspot.com",
  messagingSenderId: "569440219241",
  appId: "1:569440219241:web:532815eb39e74f4f90f2f8",
  measurementId: "G-N297KV36HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;