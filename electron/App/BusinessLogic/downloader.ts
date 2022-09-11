import * as FileSystem from "fs";
import * as Jsdom from "jsdom";
import * as Axios from "axios";
import * as Https from "https";
import { IncomingMessage } from "http";
import { IDownloader } from "../Abstraction/Downloader";
import { IJirenHelper } from "../Abstraction/JirenHelper";
import { JirenHelper } from "../jirenHelper";

export class Downloader implements IDownloader {
  private fs: typeof FileSystem;
  private https: typeof Https;
  private axios: typeof Axios;
  private jsdom: typeof Jsdom;
  private jirenHelper: IJirenHelper;

  constructor(
    fs: typeof FileSystem,
    https: typeof Https,
    jsdom: typeof Jsdom,
    axios: typeof Axios,
    helper: JirenHelper
  ) {
    this.fs = fs;
    this.https = https;
    this.jsdom = jsdom;
    this.axios = axios;
    this.jirenHelper = helper;
  }

  public async download(
    urlList: string[],
    folderPath: string
  ): Promise<string[]> {
    console.log("DETECTING EXTENSION on url list ",urlList);
    const extension = await this.detectExtension(urlList[0]);
    console.log("EXTENSION:",extension);
    const pathList: string[] = [];
    for (let i = 0; i < urlList.length; i++) {
      const link = urlList[i];
      const partNumber = i+1;
      const finalPath = folderPath + "/part" + partNumber + "." + extension;
      await this.downloadLink(link,finalPath);
      pathList.push(finalPath)
    }
    return pathList;
  }

  private async detectExtension(link: string) {
    const serverName = this.jirenHelper.getServerName(link);
    if (serverName != "mediafire")
      throw new Error("server: " + serverName + " not supported");
    return this.detectExtensionLinkMediafire(link);
  }

  private detectExtensionLinkMediafire(link: string) {
    if (link.includes(".rar")) return "rar";
    if (link.includes(".zip")) return "zip";
    if (link.includes(".7z")) return "7z";
    throw new Error("Unrecognized file compressed extension");
  }

  private async downloadLink(link: string, finalPath: string): Promise<void> {
    const serverName = "mediafire"; //this.getServerName(link);
    let downloableLink: string = "";
    if (serverName === "mediafire")
      downloableLink = await this.fetchMediafireDownloadLink(link);
    this.downloadFile(downloableLink, finalPath);
  }

  private async fetchMediafireDownloadLink(mediafireLink: string) {
    console.log("fetching link...");
    const resp = await this.axios.default.get(mediafireLink);
    const dom = new this.jsdom.JSDOM(resp.data);
    const elements = dom.window.document.querySelectorAll("a");
    let link = "";
    elements.forEach((el: any) => {
      if (el.text.includes("Download (")) {
        link = el.href;
      }
    });
    if (link === "")
      throw new Error(
        "Error when trying to web scrap mediafire downloable link"
      );
    return link;
  }

  private async downloadFile(url: string, dest: string) {
    var file = this.fs.createWriteStream(dest);
    const downloadProgress = this.downloadProgress;
    const fs = this.fs;
    var request = this.https
      .get(url, function (response: IncomingMessage) {
        response.pipe(file);
        downloadProgress(response);
      })
      .on("error", function (err: any) {
        fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
      });
  }

  private downloadProgress(response: any) {
    var len = parseInt(response.headers["content-length"], 10);
    var cur = 0;
    response.on("data",  (chunk: any) => {
      cur += chunk.length;
      const result = "Downloading " + ((100.0 * cur) / len).toFixed(2) + "% ";
      this.jirenHelper.sendFeedBack(result);
      //event.sender.send("feedBack", result);
    });
  }
}
