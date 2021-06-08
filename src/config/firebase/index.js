import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMDOutxEbTWEEOZ5ZizV5zA2QWuP2pa8M",
  authDomain: "notes-firebase-9deec.firebaseapp.com",
  databaseURL: "https://notes-firebase-9deec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notes-firebase-9deec",
  storageBucket: "notes-firebase-9deec.appspot.com",
  messagingSenderId: "718675111321",
  appId: "1:718675111321:web:9d09f65dda6e73d1bc3708",
  measurementId: "G-GF7ZLRTV64"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();


  export default firebase;