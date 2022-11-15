import { Button } from "antd";
import { query, collection, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "use-pagination-firestore";
import { GameCardStore } from "../../components/GameCardStore/GameCardStore";
import { db } from "../../firebase";
import { Game } from "../../types/Game.interface";

export const Store: React.FC = () => {
  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Game>(
    query(collection(db, "Games"), orderBy("title", "asc")),
    {
      limit: 5,
    }
  );

  const games: Game[] = useSelector((state: any) => state.games.downloadGameList);
  const theme = useSelector((state: any) => state.theme);

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Store</h1>
      <div style={{ margin: "10px" }}>
        <Button style={{ margin: "10px" }} onClick={() => getPrev()} disabled={isStart}>
          Back
        </Button>
        <Button style={{ margin: "10px" }} disabled={isEnd} onClick={() => getNext()}>
          Next
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items.map((g) => {
          return (
            <GameCardStore
              game={g}
              alreadyDownload={games.findIndex((v) => v.title == g.title) != -1}
            />
          );
        })}
      </div>
    </div>
  );
};
