import { CrackMark } from "./Types";

export interface ICracker {
  /**
   * @param gameBasePath - the most top level path of the game
   * @param link - downloable network link
   */
  crackGame: (gameBasePath: string, link: string) => Promise<void>;
  crackGameWithMark: (link: string, mark: CrackMark) => Promise<void>;
}
