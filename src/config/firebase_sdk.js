import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCcltuq7g_X5JrOMPEisNo5kgdTAEhdXm8",
  authDomain: "v-world-399314.firebaseapp.com",
  projectId: "v-world-399314",
  storageBucket: "v-world-399314.appspot.com",
  messagingSenderId: "439877519923",
  appId: "1:439877519923:web:7eca6f0a5f3d4b24f07146",
  measurementId: "G-PJ17K3DXNM"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)