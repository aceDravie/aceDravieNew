import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBZSNynMm3E4zLWQDYJVZV2PCT-ieMiaE4",
    authDomain: "acedravieproject.firebaseapp.com",
    projectId: "acedravieproject",
    storageBucket: "acedravieproject.appspot.com",
    messagingSenderId: "811658719394",
    appId: "1:811658719394:web:f4cb06e19cc0c7d21527fb",
    measurementId: "G-WL0NPS7Z39"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
const analytics = getAnalytics(app);