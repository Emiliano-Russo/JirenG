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

  public async crackGame(gameContentPath: string, link: string): Promise<void> {
    console.log("\x1b[36m", " ®®®® CRACK GAME ®®®®");
    const crackFolder = gameContentPath + "/crack";
    this.jirenHelper.makeFolderFromZero(crackFolder);
    const [crackFile] = await this.downloader.download([link], crackFolder);
    console.log("$$$$$$$ DOWNLOADED CRACK FILE: ", crackFile);
    const uncompressCrack = crackFolder + "/Uncompress";
    this.jirenHelper.makeFolderFromZero(uncompressCrack);
    await this.extractor.extract([crackFile], uncompressCrack);
    console.log("EXTRACTED!");
    console.log("\x1b[0m");
    return this.applyCrackToGame(gameContentPath, uncompressCrack);
  }

  public async crackGameWithMark(link: string, mark: CrackMark): Promise<void> {}

  private applyCrackToGame(gameFolder: string, crackFolder: string) {
    gameFolder = this.jirenHelper.accessingToSingleFolders(gameFolder + "/Game");
    crackFolder = this.jirenHelper.accessingToSingleFolders(crackFolder);
    this.copyAndPasteCrack(gameFolder, crackFolder);
  }

  // private copyEveryFileIntoTheGame(
  //   crackFilesNamesList: string[],
  //   gameFolderFiles: string,
  //   crackFolderFiles: string
  // ) {
  //   console.log("$$$$$$$$$");
  //   console.log(crackFilesNamesList);
  //   console.log(gameFolderFiles);
  //   console.log(crackFolderFiles);
  //   for (let i = 0; i < crackFilesNamesList.length; i++) {
  //     const source = crackFolderFiles + "/" + crackFilesNamesList[i];
  //     if (this.fs.statSync(source).isDirectory()) {
  //       console.log("*IS DIRECTORY*");
  //       const newGameDest = gameFolderFiles + "/" + crackFilesNamesList[i];
  //       this.copyEveryFileIntoTheGame(this.fs.readdirSync(source), newGameDest, source);
  //       continue;
  //     }
  //     console.log("about get dest");
  //     const dest = this.findFirstMatchOnPath(gameFolderFiles, crackFilesNamesList[i]);
  //     console.log("dest:", dest);
  //     if (dest) {
  //       this.fs.copyFileSync(source, dest);
  //     } else {
  //       //copy on main folder
  //       const data = this.fs.readFileSync(source);
  //       const destiny = gameFolderFiles + "/" + crackFilesNamesList[i];
  //       this.fs.writeFileSync(destiny, data);
  //     }
  //   }
  // }

  /*
  it is expected that the final directory of the game and the crack 
  (without singular folders in between) will be passed.
  */
  private copyAndPasteCrack(gamePath: string, crackPath: string) {
    console.log("\x1b[37m", "---------");
    console.log("\x1b[35m", gamePath);
    console.log("\x1b[36m", crackPath);
    const crackFilesNames = this.fs.readdirSync(crackPath);
    crackFilesNames.forEach((fileName, index) => {
      console.log("index: ", index);
      const crackFilePath = crackPath + "/" + fileName;
      const gameFilePath = gamePath + "/" + fileName;
      if (this.fs.statSync(crackFilePath).isDirectory()) {
        this.copyAndPasteCrack(gameFilePath, crackFilePath);
      } else {
        const dest = this.findFirstMatchOnPath(gamePath, fileName);
        if (dest) {
          //file already exist
          console.log("\x1b[31m", "overwriteting a file");
          this.fs.copyFileSync(crackFilePath, dest);
        } else {
          //file doesn't exist
          console.log("\x1b[33m", "pasting new file");
          const data = this.fs.readFileSync(crackFilePath);
          this.fs.writeFileSync(gameFilePath, data);
        }
      }
    });
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
