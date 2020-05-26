import * as firebase from "firebase/app";
// import * as Firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

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
