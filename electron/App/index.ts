import {
  CrackMark,
  DownloableGame,
  ExternalGame,
  Website,
  Wished,
  WishedOptions,
} from "./Abstraction/Types";
import { IJirenHelper } from "./Abstraction/JirenHelper";
import { IDownloader } from "./Abstraction/Downloader";
import { IExtractor } from "./Abstraction/Extractor";
import { ICracker } from "./Abstraction/Cracker";
import { IIndex } from "./Abstraction/Index";
import { ITorrent } from "./Abstraction/Torrent";
import { IWish } from "./Abstraction/Wish";
import { JirenHelper } from "./jirenHelper";

export type IndexConstrcutor = {
  downloader: IDownloader;
  jirenHelper: IJirenHelper;
  extractor: IExtractor;
  cracker: ICracker;
  torrent: ITorrent;
  wish: IWish;
};

export class Index implements IIndex {
  private downloader: IDownloader;
  private jirenHelper: IJirenHelper;
  private extractor: IExtractor;
  private cracker: ICracker;
  private torrent: ITorrent;
  private wish: IWish;

  constructor(build: IndexConstrcutor) {
    this.downloader = build.downloader;
    this.jirenHelper = build.jirenHelper;
    this.extractor = build.extractor;
    this.cracker = build.cracker;
    this.torrent = build.torrent;
    this.wish = build.wish;
  }

  public async addGame(game: ExternalGame) {
    throw new Error("addGame not implemented");
  }

  public async installGame(game: DownloableGame) {
    //const gameBasePath = await this.install(game);
    const gameBasePath = "C:/Users/USUARIO/Documents/JirenGames/GANG BEASTS PARA PC ENSPAÑOL/Game";
    if (game.crackUrl) await this.cracker.crackGame(gameBasePath, game.crackUrl); // Very special function (it does many things!)
    this.jirenHelper.setChannel("download-ready");
    this.jirenHelper.sendFeedBack("game downloaded!");
  }

  public async installGameWithAssistant(game: DownloableGame, crackMark: CrackMark): Promise<void> {
    await this.install(game);
    if (game.crackUrl) await this.cracker.crackGameWithMark(game.crackUrl, crackMark);
  }

  private async install(game: DownloableGame): Promise<string> {
    this.jirenHelper.sendFeedBack("Preparing game...");
    const contentPath: string = this.jirenHelper.makeFolder("/" + game.title); //All files of the game (zip parts, crack, gameFolder)
    console.log("//// ABOUT TO DOWNLOAD ////");
    const fileList: string[] = await this.downloader.download(game.downloadLinks, contentPath);
    const gameFolder = this.jirenHelper.makeFolder("/" + game.title + "/Game");
    console.log("GAME FOLDER CREATED: ", gameFolder);
    await this.extractor.extract(fileList, gameFolder);
    console.log("EXTRACT:) ");
    return gameFolder;
  }

  public async downloadGameByTorrent(magentUri: string) {
    this.torrent.downloadTorrent(magentUri);
  }

  public getInstalledGames(): string[] {
    return this.jirenHelper.getAllFolderNames();
  }

  public isInstalled(gameTitle: string) {
    return this.jirenHelper.thisFolderExist("/" + gameTitle);
  }

  public removeGame(gameTitle: string): Promise<void> {
    return this.jirenHelper.deleteFolder("/" + gameTitle);
  }

  public async playGame(gameTitle: string, exeName: string) {
    const exeLocation = this.jirenHelper.findExeMagically(gameTitle, exeName);
    console.log("exe location:", exeLocation);
    this.jirenHelper.runExe(exeLocation);
  }

  public async getWishedGames(web: Website, options: WishedOptions): Promise<Wished[]> {
    return this.wish.getWishedGames(web, options);
  }
}

module.exports.Index = Index;
