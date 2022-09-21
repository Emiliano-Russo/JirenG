import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameCardLibrary } from "../../components/GameCardLibrary/GameCardLibrary";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

export const Installed: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([]);

  const list: Game[] = useSelector((state: any) => state.games.libraryGameList);
  console.log("list from redux: ", list);

  useEffect(() => {
    ipcRenderer.on("get-installed-games", onGettingInstalledGames);
    ipcRenderer.send("get-installed-games", "");
    return () => {
      ipcRenderer.removeListener("get-installed-games", onGettingInstalledGames);
    };
  }, []);

  const onGettingInstalledGames = (event: any, gameNameList: string[]) => {
    gameNameList.forEach((name) => {
      const game = list.find((game) => game.title === name); //shouldn't return undefined
      if (game)
        setGameList((prev) => {
          const clone = [...prev];
          clone.push(game);
          return clone;
        });
    });
  };

  return (
    <div style={{ margin: "5px auto" }}>
      <h1>Installed</h1>
      {gameList.map((game) => (
        <GameCardLibrary game={game} />
      ))}
    </div>
  );
};
