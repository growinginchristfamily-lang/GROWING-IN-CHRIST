/* ================================================================
   GROWING IN CHRIST MINISTRY — Firebase Configuration
   firebase-config.js
   ================================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyA91wOFtWuHnSsRvDY6vK42PeIapYTbFpw",
  authDomain:        "growing-in-christ-1e1b3.firebaseapp.com",
  projectId:         "growing-in-christ-1e1b3",
  storageBucket:     "growing-in-christ-1e1b3.firebasestorage.app",
  messagingSenderId: "512573627085",
  appId:             "1:512573627085:web:dab06d53cf3d39844e2784",
  measurementId:     "G-DDXN90PE2N"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, doc, getDoc, setDoc, onSnapshot, collection,
         signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged };

/* ================================================================
   REQUIRED FIRESTORE SECURITY RULES
   Paste these in Firebase Console → Firestore Database → Rules
   ================================================================

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Site data: anyone can read, only authenticated admins can write
    match /siteData/{document=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'growinginchristfamily@gmail.com';
    }

    // Gallery: anyone can read, only authenticated admins can write
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'growinginchristfamily@gmail.com';
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

   ================================================================ */
