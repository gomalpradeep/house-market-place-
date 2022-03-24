// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBiMtgB4kMySwPF7YlQun2Uz6fwysRSRzg",

  authDomain: "react-test-d8566.firebaseapp.com",

  projectId: "react-test-d8566",

  storageBucket: "react-test-d8566.appspot.com",

  messagingSenderId: "115840414930",

  appId: "1:115840414930:web:99db776890c48689bca90b"

};


// Initialize Firebase

//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const db = getFirestore();
