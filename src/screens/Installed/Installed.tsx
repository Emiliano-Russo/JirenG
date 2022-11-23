import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameCardLibrary } from "../../components/GameCardLibrary/GameCardLibrary";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

//Getting installed games directly from redux
export const Installed: React.FC = () => {
  const games = useSelector((state: any) => state.games.libraryGameList);
  const theme = useSelector((state: any) => state.theme);

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
        {games.map((game: any) => (
          <GameCardLibrary game={game} />
        ))}
      </div>
    </div>
  );
};
