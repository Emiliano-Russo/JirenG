import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkGame, TorrentGame } from "../types/Game.interface";

const downloadGamesListID = "download-list";
const libraryGamesListID = "library-list";

function getInitialState(id: string) {
  const string = localStorage.getItem(id);
  if (string != null) return JSON.parse(string);
  else return [];
}

export const gamesSlice = createSlice({
  name: "login",
  initialState: {
    downloadGameList: getInitialState(downloadGamesListID),
    libraryGameList: getInitialState(libraryGamesListID),
  },
  reducers: {
    addToDownloads: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      addTo(downloadGamesListID, state, action);
    },
    removeGameFromDownloads: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      removeFrom(state.downloadGameList, state, action);
    },
    addToLibrary: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      addTo(libraryGamesListID, state, action);
    },
    removeGameFromLibrary: (state, action: PayloadAction<LinkGame | TorrentGame>) => {
      removeFrom(state.libraryGameList, state, action);
    },
  },
});

function addTo(storageId: string, state: any, action: PayloadAction<LinkGame | TorrentGame>) {
  state.downloadGameList.push(action.payload);
  const stringy = localStorage.getItem(storageId);
  if (stringy) {
    const games = JSON.parse(stringy);
    games.push(action.payload);
    localStorage.setItem(storageId, JSON.stringify(games));
  } else {
    localStorage.setItem(storageId, JSON.stringify([action.payload]));
  }
}

function removeFrom(stateList: any, state: any, action: PayloadAction<LinkGame | TorrentGame>) {
  const index = stateList.findIndex((v: any) => v.title === action.payload.title);
  stateList.splice(index, 1);
  localStorage.setItem(downloadGamesListID, JSON.stringify(stateList));
}

export const { addToDownloads, removeGameFromDownloads } = gamesSlice.actions;

export default gamesSlice.reducer;
