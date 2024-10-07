//  Firebase configuration with project's configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyCvSaKQo98k6DSzrG01bLjkOeYoeq4E7DY",
//   authDomain: "water-level-indicator-14606.firebaseapp.com",
//   projectId: "water-level-indicator-14606",
//   databaseURL:
//     "https://water-level-indicator-14606-default-rtdb.firebaseio.com/",
//   storageBucket: "water-level-indicator-14606.appspot.com",

//   messagingSenderId: "56987502786",
//   appId: "1:56987502786:web:fdf8ea92b2f14bdec1935b",
// };
//nc app
const firebaseConfig = {
    apiKey: "AIzaSyAUo5mq9Od16XAQY4eey7qFnkpwhI2iy1w",
    authDomain: "nc-app1.firebaseapp.com",
    databaseURL: "https://nc-app1-default-rtdb.firebaseio.com",
    projectId: "nc-app1",
    storageBucket: "nc-app1.appspot.com",
    messagingSenderId: "851652831721",
    appId: "1:851652831721:web:c30e82e904e7a863810378",
    measurementId: "G-6RE1YN8ZQ3"
  };
//const firebaseConfig = {
  //apiKey: "AIzaSyCB9l1rMhRBvhzZpGXjlgEqfrWczfhoJxI",
 // authDomain: "wc01-d8bcc.firebaseapp.com",
 // databaseURL: "https://wc01-d8bcc-default-rtdb.firebaseio.com",
//  projectId: "wc01-d8bcc",
 // storageBucket: "wc01-d8bcc.appspot.com",
 // messagingSenderId: "190367232875",
  //appId: "1:190367232875:web:ca86d79e9f844c50b5522e",
  //measurementId: "G-272GDMX5T4"
//};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();
const connectDB = getDatabase();
export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
};
export { connectDB, ref, get, set, child, update, remove };
