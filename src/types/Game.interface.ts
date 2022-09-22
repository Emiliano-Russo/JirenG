export interface LinkGame extends Game {
  links: string[];
}

export interface TorrentGame extends Game {
  magnetUri: string;
}

export interface Game {
  title: string;
  imgUrl: string;
  totalSize: string;
  exeName?: string;
  tested?: boolean;
}
