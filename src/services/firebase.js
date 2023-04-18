// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyApRGp3kKENzliV8zrIdHWSW-k8j-720kM",
  authDomain: "task-tracker-f14d6.firebaseapp.com",
  projectId: "task-tracker-f14d6",
  storageBucket: "task-tracker-f14d6.appspot.com",
  messagingSenderId: "833356675452",
  appId: "1:833356675452:web:6f990f1eeb712fc5c5ccf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
