'use client';

import { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  UserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, createUser, updateUser } from "./api";
import type { User } from "../types/api";

interface AuthContextType {
  authUser: FirebaseUser | null;
  loading: boolean;
  isNewUser: boolean;
  profileData: User | null;
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setUserProfileComplete: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ensures the user exists in the backend - returns user data
  const ensureUserExists = async (): Promise<User | null> => {
    if (!authUser) return null;
    
    try {
      // Try to get existing user
      const userData = await getCurrentUser();
      return userData;
    } catch (err: any) {
      // If user doesn't exist, create one
      if (
        (err?.response && err.response.status === 404) ||
        (err?.message && err.message.toLowerCase().includes('resource not found'))
      ) {
        await createUser();
        return await getCurrentUser();
      }
      throw err; // Rethrow if it's another error
    }
  };

  // Handles routing based on profile completion
  const routeBasedOnProfile = (userData: User) => {
    if (!userData.profileCompleted) {
      setIsNewUser(true);
      // Only navigate if not already on the complete-profile page
      if (pathname !== "/complete-profile") {
        router.push("/complete-profile");
      }
    } else {
      setIsNewUser(false);
      // Only redirect to dashboard from auth routes
      const currentPath = pathname;
      if (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") {
        router.push("/dashboard");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfileData(null);
    setIsNewUser(false);
    router.push("/");
  };

  // Single source of truth for syncing state with backend
  const syncUserState = async () => {
    setLoading(true);
    try {
      if (authUser) {
        const userData = await ensureUserExists();
        if (userData) {
          setProfileData(userData);
          routeBasedOnProfile(userData);
        }
      } else {
        setProfileData(null);
        setIsNewUser(false);
      }
    } catch (error) {
      console.error("Error syncing user state:", error);
      // If request fails, log out user
      if (authUser) {
        await logout();
      } else {
        setProfileData(null);
        setIsNewUser(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Monitor Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      // State changes will trigger the next effect
    });
    return () => unsubscribe();
  }, []);

  // React to auth state changes
  useEffect(() => {
    syncUserState();
  }, [authUser, pathname]);

  const signUpWithEmail = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // syncUserState will be triggered by onAuthStateChanged
    return userCredential;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // syncUserState will be triggered by onAuthStateChanged
    return userCredential;
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      await signInWithPopup(auth, provider);
      // syncUserState will be triggered by onAuthStateChanged
    } catch (error) {
      console.error("Google sign in failed:", error);
      throw error;
    }
  };

  const setUserProfileComplete = async () => {
    try {
      const updatedUser = await updateUser({ 
        profileCompleted: true 
      });
      setProfileData(updatedUser);
      setIsNewUser(false);
      router.push("/dashboard");
    } catch (e) {
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        isNewUser,
        profileData,
        signUpWithEmail,
        signInWithEmail,
        logout,
        signInWithGoogle,
        setUserProfileComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 