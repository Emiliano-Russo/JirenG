import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameCardLibrary } from "../../components/GameCardLibrary/GameCardLibrary";
import { addToLibrary } from "../../redux/gameSlice";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

//Getting installed games directly from redux
export const Installed: React.FC = () => {
  const games = useSelector((state: any) => state.games.libraryGameList);
  const theme = useSelector((state: any) => state.theme);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [exeName, setExeName] = useState("");
  const dispatch = useDispatch();

  const onAddGame = () => {
    console.log("adding game...", gameName, " -- ", exeName);
    const game: Game = {
      title: gameName,
      imgUrl: "https://i.pinimg.com/564x/d3/9c/d8/d39cd8b5f6f7f93be2cdb6df9738d702.jpg", //default (just black wallpaper)
      totalSize: "0GB",
      exeName: exeName,
      isLocalGame: true,
    };
    dispatch(addToLibrary(game));
  };

  return (
    <div style={{ margin: "5px auto" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Installed</h1>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Local Game
      </Button>
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={onAddGame}>
        <h1>Add Game</h1>
        <div>
          <Upload
            onChange={(info: any) => {
              console.log(info);
              const gameName = info.file.name.replace(".exe", "");
              const exeLocaiton = info.file.originFileObj.path;
              setGameName(gameName);
              setExeName(exeLocaiton);
            }}
          >
            <Button style={{ marginTop: "10px" }}>Click to Select Game</Button>
          </Upload>
        </div>
      </Modal>
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
