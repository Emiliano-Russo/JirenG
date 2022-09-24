import { ICracker } from "../Abstraction/Cracker";
import { IDownloader } from "../Abstraction/Downloader";
import { IExtractor } from "../Abstraction/Extractor";
import { IJirenHelper } from "../Abstraction/JirenHelper";
import { CrackMark } from "../Abstraction/Types";
import * as FileSystem from "fs";
import path from "path";

export class Cracker implements ICracker {
  private downloader: IDownloader;
  private extractor: IExtractor;
  private jirenHelper: IJirenHelper;
  private fs: typeof FileSystem;

  constructor(
    downloader: IDownloader,
    extractor: IExtractor,
    jirenHelper: IJirenHelper,
    fs: typeof FileSystem
  ) {
    this.downloader = downloader;
    this.extractor = extractor;
    this.jirenHelper = jirenHelper;
    this.fs = fs;
  }

  public async crackGame(gameBasePath: string, link: string): Promise<void> {
    console.log("game base path: ");
    // const compressionType = this.jirenHelper.detectCompressionType(link);
    // const destiny = this.jirenHelper.getJirenDir() + "/crack";
    const crackFolder = this.jirenHelper.getJirenDir() + "/crack";
    console.log("crack folder: ", crackFolder);
    const [crackFile] = await this.downloader.download([link], crackFolder);
    await this.extractor.extract([destiny], extractedCrackPath);
    return this.applyCrackToGame(gameBasePath, extractedCrackPath);
  }

  public async crackGameWithMark(link: string, mark: CrackMark): Promise<void> {}

  private applyCrackToGame(gameFolder: string, crackFolder: string) {
    gameFolder = this.jirenHelper.accessingToSingleFolders(gameFolder);
    crackFolder = this.jirenHelper.accessingToSingleFolders(crackFolder);
    this.copyEveryFileIntoTheGame(gameFolder, crackFolder);
  }

  private copyEveryFileIntoTheGame(gameFolderFiles: string, crackFolderFiles: string) {
    console.log("$$$$$$$$$");
    console.log(gameFolderFiles);
    console.log(crackFolderFiles);
    const crackFilesNamesList = this.fs.readdirSync(crackFolderFiles);
    for (let i = 0; i < crackFilesNamesList.length; i++) {
      const source = crackFolderFiles + "/" + crackFilesNamesList[i];
      if (this.fs.statSync(source).isDirectory()) {
        console.log("*IS DIRECTORY*");
        const newGameDest = gameFolderFiles + "/" + crackFilesNamesList[i];
        this.copyEveryFileIntoTheGame(newGameDest, source);
        continue;
      }
      const dest = this.findFirstMatchOnPath(gameFolderFiles, crackFilesNamesList[i]);
      if (dest) {
        this.fs.copyFileSync(source, dest);
      } else {
        //copy on main folder
        const data = this.fs.readFileSync(source);
        this.fs.writeFileSync(gameFolderFiles + "/" + crackFilesNamesList[i], data);
      }
    }
  }

  private findFirstMatchOnPath(startPath: string, filter: string): string | undefined {
    if (!this.fs.existsSync(startPath)) {
      return;
    }
    var files = this.fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i]);
      var stat = this.fs.lstatSync(filename);
      if (stat.isDirectory()) {
        const result = this.findFirstMatchOnPath(filename, filter); //recurse
        if (result === undefined) continue;
        else return result;
      } else if (filename.indexOf(filter) >= 0) {
        return filename;
      }
    }
  }
}
