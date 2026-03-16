"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getAuthInstance, getGoogleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const auth = getAuthInstance();
    if (!auth) {
      // Firebase não está configurado - isso é normal em desenvolvimento
      // ou quando as variáveis de ambiente não estão definidas
      console.log("🔧 Firebase não configurado - Modo de demonstração ativo");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Auth state changed: User logged in", user.email);
      } else {
        // Não mostrar log quando não há usuário - isso é normal
      }
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuthInstance();
    const provider = getGoogleProvider();
    
    if (!auth || !provider) {
      // Modo de demonstração - simular login bem-sucedido
      console.log("🔧 Modo de demonstração: Login simulado");
      
      // Criar um usuário de demonstração
      const demoUser = {
        uid: 'demo-user-123',
        email: 'demo@talentflow.ai',
        displayName: 'Usuário de Demonstração',
        photoURL: null
      };
      
      // Simular delay de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar estado com usuário de demonstração
      setUser(demoUser as any);
      return;
    }

    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Sign in success:", result.user.email);
    } catch (error: any) {
      console.error("Sign in error:", error);
      if (
        error.code === "auth/user-cancelled" ||
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        return;
      }
      throw error;
    }
  };

  const signOut = async () => {
    const auth = getAuthInstance();
    if (!auth) {
      // Modo de demonstração - simular logout
      console.log("🔧 Modo de demonstração: Logout simulado");
      setUser(null);
      return;
    }
    
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
