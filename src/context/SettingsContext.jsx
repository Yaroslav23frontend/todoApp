import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settings } from "../store/action";
import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { initialState } from "../store/reducers/reducerSettings";
const SettingsContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}
export default function SettingsProivider({ children }) {
  const _settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { user } = useAuth();

  function _setToday(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, today: data },
    });
    updateItem("today", data);
  }
  function _setOverdue(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, overdue: data },
    });
    updateItem("overdue", data);
  }
  function _setUpcoming(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, upcoming: data },
    });
    updateItem("upcoming", data);
  }
  function _setCompleted(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, completed: data },
    });
    updateItem("completed", data);
  }
  function _setUpcoming(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, upcoming: data },
    });
    updateItem("upcoming", data);
  }
  function _setUpcomingDays(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, upcomingDays: data },
    });
    updateItem("upcomingDays", data);
  }
  function _setThem(data) {
    dispatch({
      type: settings,
      payload: { ..._settings, them: data },
    });
    updateItem("them", data);
  }
  function _resetSettings() {
    dispatch({
      type: settings,
      payload: initialState,
    });
    updateItem("", "", true);
  }
  async function updateItem(field, data, reset = false) {
    await updateDoc(
      doc(db, `${user.uid}-settings`, `settings`),
      reset
        ? initialState
        : {
            [field]: data,
          }
    );
  }

  const value = {
    _setToday,

    _setOverdue,

    _setUpcoming,

    _setCompleted,

    _setUpcomingDays,
    _setThem,
    _resetSettings,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
