"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

interface UseSessionReturn {
  user: any;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const { user: firebaseUser, loading: authLoading, signInWithGoogle, signOut: firebaseSignOut } = useAuth();

  useEffect(() => {
    if (firebaseUser && !authLoading) {
      console.log("User logged in, redirecting to dashboard:", firebaseUser.email);
      window.location.href = "/dashboard";
    }
  }, [firebaseUser, authLoading]);

  const signOut = async () => {
    await firebaseSignOut();
    window.location.href = "/login";
  };

  return {
    user: firebaseUser ? {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      role: "user"
    } : null,
    loading: authLoading,
    signInWithGoogle,
    signOut,
  };
}
