export interface IExtractor {
  extract: (fileLocation: string[], folderDest: string) => Promise<void>;
}
