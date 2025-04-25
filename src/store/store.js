import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
