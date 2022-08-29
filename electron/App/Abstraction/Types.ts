export type DownloableGame = {
  title: string;
  gameLinks: string[];
  crackLink?: string;
};

export enum Website {
  pivigames,
  game3rb,
}

export type Wished = {
  link: string;
  imageUrl: string;
  name: string;
};

export type WishedOptions = {
  multiplayerOnly: boolean;
};

export type ExternalGame = {
  exePath: string;
  imgUrl: string;
  title: string;
};

export type CrackMark = {
  gamePathToPaste: string;
  crackPathToCopy: string;
};
