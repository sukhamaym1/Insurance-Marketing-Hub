import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { INITIAL_USER } from '../data/mockData';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<UserRole>('guest');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setUser(userData);
            setRole(userData.role || 'agent');
          } else {
            const newUserProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Demo Agent',
              photoURL: firebaseUser.photoURL || undefined,
              role: 'agent',
              subscriptionPlan: 'Free',
              createdAt: new Date().toISOString(),
              favorites: [],
              downloadsCount: 0
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile);
            setUser(newUserProfile);
            setRole('agent');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to local user if db fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Demo Agent',
            role: 'agent',
            subscriptionPlan: 'Free',
            createdAt: new Date().toISOString(),
            favorites: [],
            downloadsCount: 0
          });
          setRole('agent');
        }
      } else {
        setUser(null);
        setRole('guest');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) {
      throw new Error('Password is required for login');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const register = async (name: string, email: string, password?: string) => {
    if (!password) {
      throw new Error('Password is required for registration');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    const newUserProfile: UserProfile = {
      uid: userCredential.user.uid,
      email,
      displayName: name,
      role: 'agent',
      subscriptionPlan: 'Free',
      createdAt: new Date().toISOString(),
      favorites: [],
      downloadsCount: 0
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), newUserProfile);
    setUser(newUserProfile);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        resetPassword,
        logout,
        switchRole
      }}
    >
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
