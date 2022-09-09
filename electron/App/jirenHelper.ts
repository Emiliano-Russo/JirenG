import { IJirenHelper } from "./Abstraction/JirenHelper";
import * as FileSystem from "fs";
import * as ChildProcess from "child_process";
import { ExternalGame } from "./Abstraction/Types";
import path from "path";
import { IFeedback } from "./Abstraction/Feedback";

export class JirenHelper implements IJirenHelper {
  private fs: typeof FileSystem;
  private basePath: string; //e.g: "C:/Users/UserName/Documents/JirenGames";
  private childProcess: typeof ChildProcess;
  private jirenDir: string;
  private event : Electron.IpcMainEvent | undefined;
  private channel :string = "feedback";

  constructor(childProcess: typeof ChildProcess, fs: typeof FileSystem, jirenDir: string) {
    this.fs = fs;
    this.basePath = jirenDir;
    this.childProcess = childProcess;
    this.jirenDir = jirenDir;
  }

  public setEvent(event: Electron.IpcMainEvent, channel:string){
    this.event = event;
    this.channel = channel;
  }
  
  public sendFeedBack (text: string) {
    this.event?.sender.send(this.channel,text);
  }

  public getJirenDir(): string {
    return this.jirenDir;
  }

  public async saveExternalGame(game: ExternalGame): Promise<void> {
    throw new Error("Not implemented");
  }

  public makeFolder(path: string): string {
    const dest = this.basePath + path;
    if (!this.fs.existsSync(dest)) this.fs.mkdirSync(dest);
    return dest;
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
    this.childProcess.exec(exeLocation);
  }

  public findExeMagically(gameTitle: string): string {
    throw new Error("Not implemented");
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
