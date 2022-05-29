import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addUser } from "../store/action";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProivider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      dispatch({
        type: addUser,
        payload: {
          displayName: user?.displayName,
          email: user?.email,
          token: user?.token,
          id: user?.uid,
          emailVerified: user?.emailVerified,
        },
      });
      setIsAuth(!!user?.email);
      setLoading(false);
      setIsVerified(user?.emailVerified);
      setUser(user);
    });

    return unsubscribe;
  }, []);
  const value = {
    isAuth,
    loading,
    isVerified,
    user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
