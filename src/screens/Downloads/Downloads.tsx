import { useState } from "react";
import { useSelector } from "react-redux";
import { GameCardDownload } from "../../components/GameCardDownload/GameCardDownload";
import { LinkGame, TorrentGame } from "../../types/Game.interface";

export const Downloads: React.FC = () => {
  const gamesToDownload: LinkGame[] | TorrentGame[] = useSelector(
    (state: any) => state.games.games
  );

  console.log("games to download: ", gamesToDownload);

  return (
    <div style={{ margin: "5px auto" }}>
      <h1>Downloads</h1>
      <div id="gameList" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
      {gamesToDownload.map((g) => (
        <GameCardDownload game={g} />
      ))}
      </div>
    </div>
  );
};
