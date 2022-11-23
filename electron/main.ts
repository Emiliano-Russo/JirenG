import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { Index, IndexConstrcutor } from "./App/index";
import { Downloader } from "./App/BusinessLogic/downloader";
import fs from "fs";
import https from "https";
import jsdom from "jsdom";
import { JirenHelper } from "./App/jirenHelper";
import child_process from "child_process";
import { Cracker } from "./App/BusinessLogic/cracker";
import { Extractor } from "./App/BusinessLogic/extractor";
import { Torrent } from "./App/BusinessLogic/torrent";
import { Wish } from "./App/BusinessLogic/wish";
const streamZip = require("node-stream-zip");
const unrar = require("unrar-promise");
const axios = require("axios");
const _7z = require("7zip-min");
const os = require("os");
const username = os.userInfo().username;

const dir: string = "C:/Users/" + username + "/Documents/JirenGames";
const jirenHelper = new JirenHelper(child_process, fs, dir);
const downloader = new Downloader(fs, https, jsdom, axios, jirenHelper);
const extractor = new Extractor(streamZip, fs, unrar, _7z, jirenHelper);
const cracker = new Cracker(downloader, extractor, jirenHelper, fs);
const torrent = new Torrent(child_process);
const wish = new Wish();

const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const buildedIndex: IndexConstrcutor = {
  downloader: downloader,
  cracker: cracker,
  extractor: extractor,
  jirenHelper: jirenHelper,
  torrent: torrent,
  wish: wish,
};

const index = new Index(buildedIndex);

function createWindow() {
  child_process.exec(
    "netsh int tcp set global autotuninglevel=normal",
    function (error, stdout, stderr) {
      //console.dir(stdout);
      const dialogOpts: any = {
        type: "info",
        buttons: ["Ok"],
        title: "Mediafire Cmd Executed",
        message: stdout,
        detail: "A new version is being downloaded.",
      };
      dialog.showMessageBox(dialogOpts);
    }
  );
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev,
    },
    autoHideMenuBar: true,
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : "")
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  if (!isDev) autoUpdater.checkForUpdates();
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts: any = {
    type: "info",
    buttons: ["Ok"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version is being downloaded.",
  };
  dialog.showMessageBox(dialogOpts);
});

autoUpdater.on("update-not-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts: any = {
    type: "info",
    buttons: ["Ok"],
    title: "Updated!",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "Jiren Games does not need any update",
  };
  dialog.showMessageBox(dialogOpts);
});

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts: any = {
    type: "info",
    buttons: ["Ok"],
    title: "Updated ready!",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "a new update was downloaded",
  };
  dialog.showMessageBox(dialogOpts);
});

ipcMain.on("download-game", (event: Electron.IpcMainEvent, game) => {
  console.log("downloading...");
  jirenHelper.setComunication(event, "feedback");
  index
    .installGame(game)
    .then((v) => {
      console.log("value: ", v);
    })
    .catch((err) => {
      console.log("error: ", err);
      dialog.showErrorBox("Error", err.message);
      jirenHelper.setChannel("download-failed");
      jirenHelper.sendFeedBack(err.message);
    });
});

ipcMain.on("get-installed-games", (event: Electron.IpcMainEvent, game) => {
  jirenHelper.setComunication(event, "get-installed-games");
  const names: string[] = index.getInstalledGames();
  jirenHelper.sendFeedBack(names);
});

ipcMain.on("play-game", (event: Electron.IpcMainEvent, game: any) => {
  console.log("Play game: ", game);
  index
    .playGame(game.title, game.exeName)
    .then(() => {})
    .catch((err) => {
      dialog.showErrorBox("Error", err.message);
    });
});

ipcMain.on("remove-game", (event: Electron.IpcMainEvent, gameName: any) => {
  console.log("Removing game: ", gameName);
  index
    .removeGame(gameName)
    .then(() => {
      jirenHelper.setComunication(event, "remove-ready");
      jirenHelper.sendFeedBack("removed!");
    })
    .catch((err) => {
      dialog.showErrorBox("Error", err.message);
    });
});
