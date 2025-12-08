import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";

type User = {
  id: string;
  email: string;
} | null;

export type AuthContextType = {
  user: User;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("supabase getSession error:", error);
        }
        if (mounted && data?.session?.user) {
          const u = data.session.user;
          setUser({ id: u.id, email: u.email ?? "" });
        }
      } catch (err) {
        console.error("init auth error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    // subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? "" });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      // safe unsubscribe
      try {
        listener?.subscription?.unsubscribe();
      } catch (e) {
        // ignore if unsubscribe not available
      }
    };
  }, []);

  // sign up
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // sign in
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);

      // pokud session existuje, nastaví uživatele okamžitě
      if (data?.session?.user) {
        setUser({ id: data.session.user.id, email: data.session.user.email ?? "" });
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    
    const redirectTo = `${window.location.origin}/auth/reset-confirm`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw new Error(error.message);
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
    // optional: update local user state if needed (email unchanged)
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
