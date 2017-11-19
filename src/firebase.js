import { initializeApp } from 'firebase';

const app  = initializeApp ({
  apiKey: "AIzaSyC2L7tHsuA-OcHikpCnQzQ7mCsEAb80CZs",
  authDomain: "test-firebase-44b55.firebaseapp.com",
  databaseURL: "https://test-firebase-44b55.firebaseio.com",
  projectId: "test-firebase-44b55",
  storageBucket: "test-firebase-44b55.appspot.com",
  messagingSenderId: "305646262086"
});

// let app = Firebase.initializeApp(config);
export const db = app.database();
export const booksRef = db.ref('books');
