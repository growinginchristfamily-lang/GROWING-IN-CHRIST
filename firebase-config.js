/* ================================================================
   GROWING IN CHRIST MINISTRY — Firebase Configuration
   firebase-config.js
   ================================================================
   TODO: Replace ALL values below with your actual Firebase project
         settings from https://console.firebase.google.com
         Project Settings → Your Apps → SDK setup and configuration

   SETUP STEPS:
   1. Go to https://console.firebase.google.com
   2. Create a new project (or select existing)
   3. Add a Web App → copy the firebaseConfig object below
   4. Enable Firestore Database (Build → Firestore Database → Create)
      - Start in production mode
      - Choose region (e.g. europe-west1 for Kenya proximity)
   5. Enable Authentication (Build → Authentication → Sign-in method)
      - Enable "Email/Password" provider
      - Add user: growinginchristfamily@gmail.com with your chosen password
   6. Set Firestore Security Rules (see bottom of this file)
   ================================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey:            "TODO_YOUR_API_KEY",
  authDomain:        "TODO_YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "TODO_YOUR_PROJECT_ID",
  storageBucket:     "TODO_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "TODO_YOUR_MESSAGING_SENDER_ID",
  appId:             "TODO_YOUR_APP_ID"
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
