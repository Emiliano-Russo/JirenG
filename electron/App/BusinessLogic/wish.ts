import { Website, WishedOptions, Wished } from "../Abstraction/Types";
import { IWish } from "../Abstraction/Wish";


export class Wish implements IWish {
    getWishedGames (web: Website, options: WishedOptions) : Promise<Wished[]> {
        return new Promise((res,rej) => {
            res([]);
        })
    }

}