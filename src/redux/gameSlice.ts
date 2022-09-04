import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkGame, TorrentGame } from "../types/Game.interface";

function getInitialState():any[]{
  const string = localStorage.getItem("games");
  if (string != null) return JSON.parse(string);
  else return [];
}

export const gamesSlice = createSlice({
  name: "login",
  initialState: {
    games: getInitialState(),
  },
  reducers: {
    addToDownloads: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      state.games.push(action.payload);
      const stringy = localStorage.getItem("games");
      if (stringy) {
        const games = JSON.parse(stringy);
        games.push(action.payload);
        localStorage.setItem("games", JSON.stringify(games));
      } else {
        localStorage.setItem("games", JSON.stringify([action.payload]));
      }
    },
    removeGameFromDownloads: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      const index = state.games.findIndex(v => v.title === action.payload.title);
      state.games.splice(index,1);
      localStorage.setItem("games",JSON.stringify(state.games));
    }
  },
});

export const { addToDownloads, removeGameFromDownloads } = gamesSlice.actions;

export default gamesSlice.reducer;
