import { configureStore } from "@reduxjs/toolkit";
import { reducerUserInfo } from "./reducers/reducerUserInfo";
export const store = configureStore({
  reducer: {
    user: reducerUserInfo,
  },
});
