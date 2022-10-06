import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../types/Game.interface";

const downloadGamesListID = "download-list";
const libraryGamesListID = "library-list";

function getInitialState(id: string) {
  const string = localStorage.getItem(id);
  if (string != null && string != "[]") return JSON.parse(string);
  else return [];
}

export const gamesSlice = createSlice({
  name: "login",
  initialState: {
    downloadGameList: getInitialState(downloadGamesListID),
    libraryGameList: getInitialState(libraryGamesListID),
  },
  reducers: {
    addToDownloads: (state, action: PayloadAction<Game>) => {
      addTo(downloadGamesListID, state.downloadGameList, action);
    },
    removeGameFromDownloads: (state, action: PayloadAction<Game>) => {
      removeFrom(downloadGamesListID, state.downloadGameList, action);
    },
    addToLibrary: (state, action: PayloadAction<Game>) => {
      addTo(libraryGamesListID, state.libraryGameList, action);
    },
    removeGameFromLibrary: (state, action: PayloadAction<Game>) => {
      removeFrom(libraryGamesListID, state.libraryGameList, action);
    },
    passDownloadToLibrary: (state, action: PayloadAction<Game>) => {
      removeFrom(downloadGamesListID, state.downloadGameList, action);
      addTo(libraryGamesListID, state.libraryGameList, action);
    },
  },
});

function addTo(storageId: string, stateList: any, action: PayloadAction<Game>) {
  stateList.push(action.payload);
  const stringy = localStorage.getItem(storageId);
  if (stringy) {
    const games = JSON.parse(stringy);
    games.push(action.payload);
    localStorage.setItem(storageId, JSON.stringify(games));
  } else {
    localStorage.setItem(storageId, JSON.stringify(stateList));
  }
}

function removeFrom(storageId: string, stateList: any, action: PayloadAction<Game>) {
  const index = stateList.findIndex((v: any) => v.title === action.payload.title);
  stateList.splice(index, 1);
  localStorage.setItem(storageId, JSON.stringify(stateList));
}

export const {
  addToDownloads,
  removeGameFromDownloads,
  addToLibrary,
  removeGameFromLibrary,
  passDownloadToLibrary,
} = gamesSlice.actions;

export default gamesSlice.reducer;
