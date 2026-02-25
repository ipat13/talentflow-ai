import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Storage, getStorage } from "firebase-admin/storage";

let app: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;
let adminStorage: Storage | undefined;

function getFirebaseApp(): App | undefined {
  if (app) return app;
  
  if (getApps().length > 0) {
    app = getApps()[0];
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase Admin credentials not configured");
    return undefined;
  }

  app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return app;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) {
      throw new Error("Firebase Admin not initialized");
    }
    adminAuth = getAuth(firebaseApp);
  }
  return adminAuth;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) {
      throw new Error("Firebase Admin not initialized");
    }
    adminDb = getFirestore(firebaseApp);
  }
  return adminDb;
}

export function getAdminStorage(): Storage {
  if (!adminStorage) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) {
      throw new Error("Firebase Admin not initialized");
    }
    adminStorage = getStorage(firebaseApp);
  }
  return adminStorage;
}

export async function verifyIdToken(token: string) {
  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
