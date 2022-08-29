import { ExternalGame } from "./Types";

export interface IJirenHelper {
  makeFolder: (path: string) => string;

  deleteFolder: (path: string) => Promise<void>;

  thisFolderExist: (path: string) => boolean;

  getAllFolderNames: () => string[];

  runExe: (path: string) => void;

  findExeMagically: (title: string) => string;

  getJirenDir: () => string;

  saveExternalGame: (game: ExternalGame) => Promise<void>;

  findFirstMatchOnPath: (startPath: string, filter: string) => string;

  getServerName: (link: string) => string;

  detectCompressionType: (url: string) => "rar" | "zip" | "7z";
}
