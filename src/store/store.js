import { configureStore } from "@reduxjs/toolkit";
import { reducerItems } from "./reducers/reducerItems";
import { reducerUserInfo } from "./reducers/reducerUserInfo";
export const store = configureStore({
  reducer: {
    user: reducerUserInfo,
    items: reducerItems,
  },
});
