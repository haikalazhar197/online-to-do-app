//To initialize firebase sdk and after effects

import * as firebase from "firebase/app";
import "firebase/auth"; //Enable Auth
import "firebase/firestore"; //Enable Firestore

//Initialize app with credentials

const app = firebase.initializeApp({
  apiKey: "AIzaSyAzK048PvWrjEJ8lue6Imezpz1G1bzYP6Q",
  authDomain: "online-to-do.firebaseapp.com",
  databaseURL: "https://online-to-do.firebaseio.com",
  projectId: "online-to-do",
  storageBucket: "online-to-do.appspot.com",
  messagingSenderId: "738812176383",
  appId: "1:738812176383:web:418aac82584ed29413e9ca",
  measurementId: "G-G0LE9PYFZB",
});

export default app;
