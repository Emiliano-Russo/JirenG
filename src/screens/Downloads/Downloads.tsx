import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameCardDownload } from "../../components/GameCardDownload/GameCardDownload";
import { Game } from "../../types/Game.interface";

export const Downloads: React.FC = () => {
  const list = useSelector((state: any) => state.games.downloadGameList);
  const [gamesToDownload, setGamesToDownload] = useState<Game[]>([]);

  useEffect(() => {
    setGamesToDownload(list);
  }, [list]);

  console.log("games to download: ", gamesToDownload);

  return (
    <div style={{ margin: "5px auto" }}>
      <h1>Downloads</h1>
      <div id="gameList" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {gamesToDownload.map((g) => (
          <GameCardDownload game={g} />
        ))}
      </div>
    </div>
  );
};
