import { Website, Wished, WishedOptions } from "./Types";

export interface IWish {
  getWishedGames: (web: Website, options: WishedOptions) => Promise<Wished[]>;
}
