import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

export const Installed: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([]);

  const list = useSelector((state: any) => state.games.libraryGameList);
  console.log("list from redux: ", list);

  useEffect(() => {
    ipcRenderer.on("get-installed-games", onGettingInstalledGames);
    ipcRenderer.send("get-installed-games", "");
    return () => {
      ipcRenderer.removeListener("get-installed-games", onGettingInstalledGames);
    };
  }, []);

  const onGettingInstalledGames = (event: any, gameNameList: string[]) => {
    console.log("GETTING HERE!");
    
    console.log("game List: ", gameNameList);

    const arr = gameNameList.map((gameName) => {
      // const game = Memory.getGame(gameName);
      // if (game != undefined) {
      //   const gameNotUndefined = game;
      //   return gameNotUndefined;
      // } else {
      //   return {
      //     title: "error",
      //     description: "error",
      //     downloadLinks: ["error"],
      //     imgUrl: "error",
      //     totalSize: "error",
      //     youtubeTrailerUrl: "error",
      //   };
      // }
    });
    // const filteredArr: Game[] = arr.filter(function (element) {
    //   return element !== undefined;
    // });
    // setGameList(filteredArr);
  };

  return (
    <div>
      <h1>Installed</h1>
    </div>
  );
};
