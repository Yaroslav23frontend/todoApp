import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addUser, settings } from "../store/action";
import { addItems } from "../store/action";
import { db } from "../firebase/firebase";
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
  const [id, setId] = useState();
  async function getData(id) {
    const querySnapshot = await getDocs(collection(db, `${id}`)).catch((err) =>
      console.log(err)
    );
    const temp = [];
    querySnapshot.forEach(async (doc) => {
      temp.push(doc.data());
    });
    console.log(temp);
    if (temp.length === 0) {
      setId(0);
    } else {
      setId(temp[temp.length - 1].id);
    }

    dispatch({ type: addItems, payload: temp });
  }
  async function getSettings(id) {
    console.log(`${id}-settings`);
    const docSnap = await getDoc(doc(db, `${id}-settings`, "settings")).catch(
      (err) => console.log(err)
    );
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch({ type: settings, payload: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
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
      getSettings(user?.uid);
      getData(user?.uid);
    });

    return unsubscribe;
  }, []);
  const value = {
    isAuth,
    loading,
    isVerified,
    user,
    id,
    setId,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
