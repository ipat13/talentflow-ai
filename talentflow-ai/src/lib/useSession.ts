"use client";

import { useState, useCallback, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { getAuthInstance, getGoogleProvider } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "./rbac";

export interface SessionUser {
  uid: string;
  email: string | null;
  name: string | null;
  role: Role;
}

interface UseSessionReturn {
  user: SessionUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const { user: firebaseUser, loading: authLoading, signOut: firebaseSignOut } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    if (firebaseUser) {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setSessionUser(data.user);
          }
        })
        .catch(console.error);
    } else {
      setSessionUser(null);
    }
  }, [firebaseUser]);

  const signInWithGoogle = useCallback(async () => {
    setIsSigningIn(true);
    try {
      const auth = getAuthInstance();
      const provider = getGoogleProvider();
      
      if (!auth || !provider) {
        throw new Error("Firebase not initialized");
      }
      
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();
      setSessionUser(data.user);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  }, [router]);

  const signOut = useCallback(async () => {
    await firebaseSignOut();
    await fetch("/api/auth/session", { method: "DELETE" });
    setSessionUser(null);
    router.push("/login");
    router.refresh();
  }, [firebaseSignOut, router]);

  return {
    user: sessionUser,
    loading: authLoading || isSigningIn,
    signInWithGoogle,
    signOut,
  };
}
