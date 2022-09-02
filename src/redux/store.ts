import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import gamesSlice from "./gameSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    games: gamesSlice,
  },
});
