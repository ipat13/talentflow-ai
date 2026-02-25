import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let googleProvider: GoogleAuthProvider | undefined;

function getFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey || !authDomain || !projectId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

function getFirebaseApp(): FirebaseApp | undefined {
  if (app) return app;

  if (getApps().length > 0) {
    app = getApp();
    return app;
  }

  const config = getFirebaseConfig();
  if (!config) {
    console.warn("Firebase client credentials not configured");
    return undefined;
  }

  app = initializeApp(config);
  return app;
}

export function getAuthInstance(): Auth | undefined {
  if (auth) return auth;
  
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;
  
  auth = getAuth(firebaseApp);
  return auth;
}

export function getDb(): Firestore | undefined {
  if (db) return db;
  
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;
  
  db = getFirestore(firebaseApp);
  return db;
}

export function getStorageInstance(): FirebaseStorage | undefined {
  if (storage) return storage;
  
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;
  
  storage = getStorage(firebaseApp);
  return storage;
}

export function getGoogleProvider(): GoogleAuthProvider | undefined {
  if (googleProvider) return googleProvider;
  
  const authInstance = getAuthInstance();
  if (!authInstance) return undefined;
  
  googleProvider = new GoogleAuthProvider();
  return googleProvider;
}
