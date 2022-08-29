import { ICracker } from "../Abstraction/Cracker";
import { IDownloader } from "../Abstraction/Downloader";
import { IExtractor } from "../Abstraction/Extractor";
import { IJirenHelper } from "../Abstraction/JirenHelper";
import { CrackMark } from "../Abstraction/Types";
import * as FileSystem from "fs";

export class Cracker implements ICracker {
  private downloader: IDownloader;
  private extractor: IExtractor;
  private jirenHelper: IJirenHelper;
  private fs: typeof FileSystem;

  constructor(downloader: IDownloader, extractor: IExtractor, jirenHelper: IJirenHelper, fs: typeof FileSystem) {
    this.downloader = downloader;
    this.extractor = extractor;
    this.jirenHelper = jirenHelper;
    this.fs = fs;
  }

  public async crackGame(gameBasePath: string, link: string): Promise<void> {
    const compressionType = this.jirenHelper.detectCompressionType(link);
    const crackPath = this.jirenHelper.getJirenDir() + "/crack." + compressionType;
    await this.downloader.download([link], this.jirenHelper.getJirenDir());
    const extractedCrackPath = this.jirenHelper.getJirenDir() + "/crack";
    this.jirenHelper.makeFolder(extractedCrackPath);
    await this.extractor.extract([link], extractedCrackPath);
  }

  public async crackGameWithMark(link: string, mark: CrackMark): Promise<void> {}
}
