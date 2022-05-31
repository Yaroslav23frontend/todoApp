import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { settings } from "../store/action";
import { addItems } from "../store/action";
import { db } from "../firebase/firebase";
const SettingsContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}
export default function SettingsProivider({ children }) {
  const _settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [today, setToday] = useState(_settings.today);
  const [overdue, setOverdue] = useState(_settings.overdue);
  const [upcoming, setUpcoming] = useState(_settings.upcoming);
  const [completed, setCompleted] = useState(_settings.completed);
  const [upcomingDays, setUpcomingDays] = useState(_settings.upcomingDays);
  const [them, setThem] = useState(_settings.them);
  function _setToday(data) {
    setToday(data);
  }
  function _setOverdue(data) {
    setOverdue(data);
  }
  function _setUpcoming(data) {
    setUpcoming(data);
  }
  function _setCompleted(data) {
    setCompleted(data);
  }
  function _setUpcoming(data) {
    setUpcoming(data);
  }
  function _setUpcomingDays(data) {
    setUpcomingDays(data);
  }
  function _setThem(data) {
    setThem(data);
  }
  useEffect(() => {
    dispatch({
      type: settings,
      payload: {
        today: today,
        overdue: overdue,
        upcoming: upcoming,
        completed: completed,
        upcomingDays: upcomingDays,
        them: them,
      },
    });
  }, [today, overdue, upcoming, completed, upcomingDays, them]);
  const value = {
    today,
    _setToday,
    overdue,
    _setOverdue,
    upcoming,
    _setUpcoming,
    completed,
    _setCompleted,
    upcomingDays,
    _setUpcomingDays,
    them,
    _setThem,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
