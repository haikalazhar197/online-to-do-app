//To initialize firebase sdk and after effects

import * as firebase from "firebase/app";
import "firebase/auth"; //Enable Auth
import "firebase/firestore"; //Enable Firestore

//Initialize app with credentials
const app = firebase.initializeApp({
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  //   databaseURL: "YOUR_DATABASE_URL",
  //   projectId: "YOUR_PROJECT_ID",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGE_SENDER_ID",
  //   appId: "YOUR_APP_ID",
  //   measurementId: "YOUR_MEASUREMENT_ID",
});

export default app;
