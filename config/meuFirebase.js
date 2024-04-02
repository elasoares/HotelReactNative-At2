
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAh9Hyz04H4jsX-cHBvcBlTWMHuXpd6j1s",
  authDomain: "projetoatpb.firebaseapp.com",
  databaseURL: "https://projetoatpb-default-rtdb.firebaseio.com",
  projectId: "projetoatpb",
  storageBucket: "projetoatpb.appspot.com",
  messagingSenderId: "569440219241",
  appId: "1:569440219241:web:262d504b14bef07590f2f8",
  measurementId: "G-7HW77TK6E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;