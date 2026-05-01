// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVlUv5MVuPIzecI-MGjLfESVGoXYexIg4",
  authDomain: "grow-us-724c2.firebaseapp.com",
  projectId: "grow-us-724c2",
  storageBucket: "grow-us-724c2.firebasestorage.app",
  messagingSenderId: "34496067763",
  appId: "1:34496067763:web:dbe4244bc7e85e8f5a18c6",
  measurementId: "G-ZNNYFPSQB4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
