import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "",
  authDomain: "blooddonorapp-51d81.firebaseapp.com",
  projectId: "blooddonorapp-51d81",
  storageBucket: "blooddonorapp-51d81.appspot.com",
  messagingSenderId: "671157557578",
  appId: "1:671157557578:web:785694d5fb99d7c323c9b3",
  measurementId: "G-WM2W0F74B5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);















