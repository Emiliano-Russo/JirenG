import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import gamesSlice from "./gameSlice";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    games: gamesSlice,
    theme: themeSlice,
  },
});
