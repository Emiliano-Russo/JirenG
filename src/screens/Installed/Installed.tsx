import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameCardLibrary } from "../../components/GameCardLibrary/GameCardLibrary";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

export const Installed: React.FC = () => {
  const games = useSelector((state: any) => state.games.libraryGameList);
  const [list, setList] = useState<Game[]>([]);
  const theme = useSelector((state: any) => state.theme);

  useEffect(() => {
    setList(games);
    ipcRenderer.on("get-installed-games", onGettingInstalledGames);
    ipcRenderer.send("get-installed-games", "");
    return () => {
      ipcRenderer.removeListener("get-installed-games", onGettingInstalledGames);
    };
  }, [games]);

  const onGettingInstalledGames = (event: any, gameNameList: string[]) => {
    gameNameList.forEach((name) => {
      const game = list.find((game) => game.title === name); //shouldn't return undefined
      if (game)
        setList((prev) => {
          const clone = [...prev];
          clone.push(game);
          return clone;
        });
    });
  };

  return (
    <div style={{ margin: "5px auto" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Installed</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {list.map((game) => (
          <GameCardLibrary game={game} />
        ))}
      </div>
    </div>
  );
};
