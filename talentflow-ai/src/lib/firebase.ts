import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY. Define no .env.local e reinicia.");
}

if (!firebaseConfig.authDomain || !firebaseConfig.projectId) {
  throw new Error("Missing Firebase config. Verifica .env.local");
}

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function getAuthInstance(): Auth {
  return auth;
}

export function getGoogleProvider(): GoogleAuthProvider {
  return googleProvider;
}

export function getDb(): Firestore {
  return getFirestore(app);
}

export function getStorageInstance(): FirebaseStorage {
  return getStorage(app);
}

export { app };
