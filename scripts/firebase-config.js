// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyAhqfXhv2ikNKYDjs5WfEk0R99Az1XPjM8",
  authDomain: "omrchecker-884d2.firebaseapp.com",
  projectId: "omrchecker-884d2",
  storageBucket: "omrchecker-884d2.appspot.com",
  messagingSenderId: "706020565677",
  appId: "1:706020565677:web:ef04e86db3caca05841c24"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
