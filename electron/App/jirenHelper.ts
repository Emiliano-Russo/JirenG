import { IJirenHelper } from "./Abstraction/JirenHelper";
import * as FileSystem from "fs";
import * as ChildProcess from "child_process";
import { ExternalGame } from "./Abstraction/Types";
import path from "path";
import { IFeedback } from "./Abstraction/Feedback";
const { shell } = require("electron");

export class JirenHelper implements IJirenHelper {
  private fs: typeof FileSystem;
  private basePath: string; //e.g: "C:/Users/UserName/Documents/JirenGames";
  private childProcess: typeof ChildProcess;
  private event: Electron.IpcMainEvent | undefined;
  private channel: string = "feedback";

  constructor(childProcess: typeof ChildProcess, fs: typeof FileSystem, jirenDir: string) {
    this.fs = fs;
    this.basePath = jirenDir;
    this.childProcess = childProcess;
  }

  public setChannel(channel: string) {
    this.channel = channel;
  }

  public setComunication(event: Electron.IpcMainEvent, channel: string) {
    this.event = event;
    this.channel = channel;
  }

  public sendFeedBack(arg: any) {
    this.event?.sender.send(this.channel, arg);
  }

  public getJirenDir(): string {
    return this.basePath;
  }

  public async saveExternalGame(game: ExternalGame): Promise<void> {
    throw new Error("Not implemented");
  }

  public makeFolder(path: string): string {
    const dest = this.basePath + path;
    return this.makeFolderFromZero(dest);
  }

  public makeFolderFromZero(path: string): string {
    if (!this.fs.existsSync(path)) this.fs.mkdirSync(path);
    return path;
  }

  public async deleteFolder(path: string): Promise<void> {
    const dest = this.basePath + path;
    this.fs.rmdirSync(dest, { recursive: true });
  }

  public thisFolderExist(subPath: string): boolean {
    return this.fs.existsSync(this.basePath + subPath);
  }

  public getAllFolderNames(): string[] {
    const directories = this.fs
      .readdirSync(this.basePath, { withFileTypes: true })
      .filter((dirent) => {
        return dirent.isDirectory();
      })
      .map((dirent) => dirent.name);
    return directories;
  }

  public runExe(exeLocation: string) {
    console.log("run exe: ", exeLocation);
    shell.openPath(exeLocation);
    // const exe = this.childProcess.execFile;
    // exe(exeLocation);
  }

  public findExeMagically(gameTitle: string, exeName: string): string {
    let baseGameDir = this.basePath + "/" + gameTitle + "/Game";
    const finalDistDir = this.accessingToSingleFolders(baseGameDir);
    console.log("FINAL DIST DIR: ", finalDistDir);
    const dirContent: string[] = this.fs.readdirSync(finalDistDir);
    const exeFiles: string[] = dirContent.filter((dir) => dir.includes(exeName));
    console.log("exe Files: ", exeFiles);
    if (exeFiles.length > 1) throw new Error("Multiples .exe with the same name: " + exeName);
    else return finalDistDir + "/" + exeFiles[0];
  }

  public accessingToSingleFolders(initialPath: string): string {
    let folderContent = this.fs.readdirSync(initialPath);
    if (folderContent.length == 1) {
      const newPath = initialPath + "/" + folderContent[0];
      if (!this.fs.lstatSync(newPath).isDirectory())
        throw new Error("Only one file found in the game");
      return this.accessingToSingleFolders(newPath);
    } else {
      //should never get here because the inital path is already the final path
      return initialPath;
    }
  }

  public findFirstMatchOnPath(startPath: string, filter: string): string {
    if (!this.fs.existsSync(startPath)) throw new Error("Path does not exist: " + startPath);
    const files = this.fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i]);
      const stat = this.fs.lstatSync(filename);
      if (stat.isDirectory()) continue;
      else if (filename.indexOf(filter) >= 0) return filename;
    }
    throw new Error("Filter not found");
  }

  public getServerName(link: string): string {
    if (link.includes("mediafire")) return "mediafire";
    throw new Error("Server name from link not found: " + link);
  }

  public detectCompressionType(url: string) {
    if (url.includes(".rar")) return "rar";
    if (url.includes(".zip")) return "zip";
    if (url.includes(".7z")) return "7z";
    throw new Error("Compression not detected");
  }
}
