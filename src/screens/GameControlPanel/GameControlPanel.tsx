import { Button, Input, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameCardPanel } from "../../components/GameCardPanel/GameCardPanel";
import { usePagination } from "use-pagination-firestore";
import { addNewGame, getGames } from "../../firebase";
import { Game } from "../../types/Game.interface";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/index";

export const GameControlPanel: React.FC = () => {
  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Game>(
    query(collection(db, "Games"), orderBy("title", "asc")),
    {
      limit: 10,
    }
  );

  const [addGameModal, setAddGameModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const addGame = async () => {
    setLoading(true);
    const title: string = (document.getElementById("title") as HTMLInputElement).value;
    const links: string = (document.getElementById("links") as HTMLInputElement).value;
    const linkArr: string[] = links.split(",");
    const imgUrl: string = (document.getElementById("imgUrl") as HTMLInputElement).value;
    const size: string = (document.getElementById("size") as HTMLInputElement).value;
    const linkGame: Game = {
      title,
      imgUrl,
      downloadLinks: linkArr,
      totalSize: size,
    };
    addNewGame(linkGame)
      .then(() => {
        message.success("Game Uploaded");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const nav = useNavigate();

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <h1>Videogames Panel</h1>
      <Button
        onClick={() => nav("/Admin")}
        style={{ position: "absolute", left: "10px", top: "10px" }}
      >
        {"Back"}
      </Button>
      <Button style={{ marginBottom: "20px" }} onClick={() => setAddGameModal(true)}>
        Add Game
      </Button>
      {isLoading ? <Spin /> : <></>}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items.map((g) => {
          return <GameCardPanel game={g} />;
        })}
      </div>
      <div style={{ margin: "10px" }} hidden={isLoading}>
        <Button onClick={() => getPrev()} disabled={isStart}>
          Back
        </Button>
        <Button disabled={isEnd} onClick={() => getNext()}>
          Next
        </Button>
      </div>
      <Modal visible={addGameModal} onCancel={() => setAddGameModal(false)} onOk={addGame}>
        <Input disabled={loading} id="title" style={{ marginTop: "20px" }} placeholder="Title" />
        <Input disabled={loading} id="links" placeholder="Download links separted by comma ','" />
        <Input disabled={loading} id="imgUrl" placeholder="Image Url (portrait format)" />
        <Input disabled={loading} id="size" placeholder="5GB" />
        {loading ? <Spin /> : <></>}
      </Modal>
    </div>
  );
};
