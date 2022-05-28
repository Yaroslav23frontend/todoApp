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
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //   async function setCV(cvName, data) {
  //     return await setDoc(doc(db, `${currentUser.uid}`, cvName), data);
  //   }
  //   async function getCV() {
  //     const querySnapshot = await getDocs(collection(db, `${currentUser.uid}`));
  //     const temp = [];
  //     querySnapshot.forEach(async (doc) => {
  //       temp.push(doc.data());
  //       console.log(CVdata);
  //     });
  //     setCVdata(temp);
  //   }
  //   async function deleteCV(cvName) {
  //     return await deleteDoc(doc(db, `${currentUser.uid}`, cvName));
  //   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch({
        type: addUser,
        payload: {
          email: user?.email,
          token: user?.token,
          id: user?.id,
        },
      });
      setIsAuth(!!user?.email);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    isAuth,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
