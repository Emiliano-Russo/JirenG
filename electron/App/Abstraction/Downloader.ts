export interface IDownloader {
  /**
   * @param url - url of the server hosting the file e.g: mediafire.com/file/Example.rar/file
   * @param folder - complete folder path where you want to save the file e.g: C:/Users/UserName/Desktop/JirenGames
   */
  download: (urlList: string[], folder: string) => Promise<string[]>;
}
