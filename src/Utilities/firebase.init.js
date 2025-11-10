import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCkT-irKri1e3wp9uyY51IdS3q9aw-3z_o",
  authDomain: "authentication-habit-tracker.firebaseapp.com",
  projectId: "authentication-habit-tracker",
  storageBucket: "authentication-habit-tracker.firebasestorage.app",
  messagingSenderId: "163311706195",
  appId: "1:163311706195:web:a931f60349fe60387b26a6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
