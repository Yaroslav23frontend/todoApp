import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API,
  authDomain: "todo-app-3cce3.firebaseapp.com",
  projectId: "todo-app-3cce3",
  storageBucket: "todo-app-3cce3.appspot.com",
  messagingSenderId: "737753586304",
  appId: "1:737753586304:web:7f18d82cfbaf0b93c46465",
};
const app = initializeApp(firebaseConfig);
