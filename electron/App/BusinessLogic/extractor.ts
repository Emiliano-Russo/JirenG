import { IExtractor } from "../Abstraction/Extractor";
import * as StreamZip from "node-stream-zip";
import * as FileSystem from "fs";
import * as _7Z from "7zip-min";
import { IJirenHelper } from "../Abstraction/JirenHelper";

export class Extractor implements IExtractor {
  private StreamZip: typeof StreamZip;
  private fs: typeof FileSystem;
  private unrar: any;
  private _7z: typeof _7Z;
  private jirenHelper: IJirenHelper;

  constructor(
    streamZip: typeof StreamZip,
    fs: typeof FileSystem,
    unrar: any,
    _7z: typeof _7Z,
    jirenHelper: IJirenHelper
  ) {
    this.StreamZip = streamZip;
    this.fs = fs;
    this.unrar = unrar;
    this._7z = _7z;
    this.jirenHelper = jirenHelper;
  }

  public async extract(fileLocation: string[], folderDest: string): Promise<void> {
    console.log("/*/ extract method /*/", fileLocation, folderDest);
    if (fileLocation.length > 1) throw new Error("Multiple files not implemented yet");
    const compressionType = this.jirenHelper.detectCompressionType(fileLocation[0]);
    switch (compressionType) {
      case "rar":
        console.log("-- EXTRACTING .rar --");
        this.jirenHelper.sendFeedBack("Extracting .rar file");
        await this.unCompressRar(fileLocation[0], folderDest);
        return;
        break;
      case "7z":
        this.jirenHelper.sendFeedBack("Extracting .7z file");
        await this.unCompress7z(fileLocation[0], folderDest);
        return;
        break;
      case "zip":
        await this.uncompressZip(fileLocation[0], folderDest);
        return;
        break;
      default:
        throw new Error("Compression not detected");
    }
  }

  private async uncompressZip(zipLocation: string, folderDest: string) {
    const zip = new this.StreamZip.async({ file: zipLocation });
    const entries = await zip.entries();
    const length = Object.values(entries).length;
    let counter = 0;
    for (const entry of Object.values(entries)) {
      counter += 1;
      const progress = "Uncompressing Files: " + counter + "/" + length;
      this.jirenHelper.sendFeedBack(progress);
      if (entry.isDirectory) {
        console.log("Is directory!");
        try {
          this.fs.mkdirSync(folderDest + "/" + entry.name);
        } catch (err) {
          const finalFolder = entry.name.split("/")[0];
          this.fs.mkdirSync(folderDest + "/" + finalFolder);
          this.fs.mkdirSync(folderDest + "/" + entry.name);
        }
      } else {
        console.log("is file!!");
        try {
          await zip.extract(entry.name, folderDest + "/" + entry.name);
        } catch (err) {
          const finalFolder = entry.name.split("/")[0];
          this.fs.mkdirSync(folderDest + "/" + finalFolder);
          await zip.extract(entry.name, folderDest + "/" + entry.name);
        }
      }
    }
  }

  private async unCompressRar(rarLocation: string, dest: string) {
    return this.unrar.unrar(rarLocation, dest);
  }

  private async unCompress7z(location: string, dest: string) {
    this._7z.unpack(location, dest, (err) => {
      console.log("Done!");
    });
  }
}
