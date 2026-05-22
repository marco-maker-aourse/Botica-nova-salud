import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBzfqFyR_qEnZOZu9BWKOtQbCTL83izmVA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "react-bd-c79b3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "react-bd-c79b3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "react-bd-c79b3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "665474025047",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:665474025047:web:ffb9f5d06f3cbb108c0512",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TWT1E60T0H",
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.trim().length > 0,
);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const analyticsPromise =
  app && typeof window !== "undefined"
    ? isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null)
    : Promise.resolve(null);
export default app;
