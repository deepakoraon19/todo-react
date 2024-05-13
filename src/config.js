// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB92m44aK3hNusBYsZsLddU2se6wuuuQD4",
  authDomain: "moviebuffapi.firebaseapp.com",
  projectId: "moviebuffapi",
  storageBucket: "moviebuffapi.appspot.com",
  messagingSenderId: "621794742046",
  appId: "1:621794742046:web:998eb5d7fe726f911bc30f",
  measurementId: "G-5JVR6YG73L"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;