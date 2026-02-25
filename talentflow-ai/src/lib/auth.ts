import { onAuthStateChanged, User } from "firebase/auth";
import { getAuthInstance } from "./firebase";

export async function getCurrentUser(): Promise<User | null> {
  const auth = getAuthInstance();
  if (!auth) return null;
  
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
