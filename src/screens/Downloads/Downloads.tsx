import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameCardDownload } from "../../components/GameCardDownload/GameCardDownload";
import { Game } from "../../types/Game.interface";

export const Downloads: React.FC = () => {
  const list = useSelector((state: any) => state.games.downloadGameList);
  const [gamesToDownload, setGamesToDownload] = useState<Game[]>([]);
  const theme = useSelector((state: any) => state.theme);

  useEffect(() => {
    setGamesToDownload(list);
  }, [list]);

  return (
    <div style={{ margin: "5px auto" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Downloads</h1>
      <div id="gameList" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {gamesToDownload.map((g) => (
          <GameCardDownload game={g} />
        ))}
      </div>
    </div>
  );
};
