import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const isConfigured = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isConfigured) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export function getAuthInstance(): Auth | null {
  if (!auth) {
    console.warn("⚠️ Firebase Auth not initialized - Check if environment variables are configured");
    console.warn("   This is expected if you're running locally without Firebase config");
    console.warn("   For production, add Firebase config to Vercel environment variables");
  }
  return auth;
}

export function getGoogleProvider(): GoogleAuthProvider | null {
  if (!googleProvider) {
    console.error("Google Provider not initialized");
  }
  return googleProvider;
}

export function getDb(): Firestore | null {
  if (!app) {
    console.error("Firebase not initialized");
    return null;
  }
  return getFirestore(app);
}

export function getStorageInstance(): FirebaseStorage | null {
  if (!app) {
    console.error("Firebase not initialized");
    return null;
  }
  return getStorage(app);
}

export { app };
