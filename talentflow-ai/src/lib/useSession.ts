"use client";

import { User } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SessionUser {
  uid: string;
  email: string | null;
  name: string | null;
  role: string;
}

interface UseSessionReturn {
  user: SessionUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const { user: firebaseUser, loading: authLoading, signInWithGoogle, signOut: firebaseSignOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (firebaseUser && !authLoading) {
      console.log("User logged in, redirecting to dashboard:", firebaseUser.email);
      router.push("/dashboard");
      router.refresh();
    }
  }, [firebaseUser, authLoading, router]);

  const signOut = async () => {
    await firebaseSignOut();
    router.push("/login");
    router.refresh();
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
