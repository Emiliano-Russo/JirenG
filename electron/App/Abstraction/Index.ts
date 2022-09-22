import { CrackMark, DownloableGame, ExternalGame, Website, Wished, WishedOptions } from "./Types";

export interface IIndex {
  //installation
  installGame: (game: DownloableGame) => Promise<void>;
  installGameWithAssistant: (game: DownloableGame, crackMark: CrackMark) => Promise<void>;
  downloadGameByTorrent: (magentUri: string) => void;

  //basic utiliy
  addGame: (game: ExternalGame) => void;
  getInstalledGames: () => string[];
  isInstalled: (title: string) => boolean;
  removeGame: (title: string) => Promise<void>;
  playGame: (title: string, exeName: string) => void;

  //scraping
  getWishedGames: (web: Website, options: WishedOptions) => Promise<Wished[]>;
}
