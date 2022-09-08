import { Button } from "antd";
import { query, collection, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "use-pagination-firestore";
import { GameCardStore } from "../../components/GameCardStore/GameCardStore";
import { db } from "../../firebase";
import { LinkGame, TorrentGame } from "../../types/Game.interface";

export const Store: React.FC = () => {
  const { items, isLoading, isStart, isEnd, getPrev, getNext } =
    usePagination<LinkGame>(
      query(collection(db, "Games"), orderBy("title", "asc")),
      {
        limit: 10,
      }
    );

  const games: LinkGame[] | TorrentGame[] = useSelector(
    (state: any) => state.games.games
  );

  console.log("games:", games);

  return (
    <div style={{width:"100%"}}>
      <h1>Store</h1>
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
      <div style={{ margin: "10px" }}>
        <Button onClick={() => getPrev()} disabled={isStart}>
          Back
        </Button>
        <Button disabled={isEnd} onClick={() => getNext()}>
          Next
        </Button>
      </div>
    </div>
  );
};
