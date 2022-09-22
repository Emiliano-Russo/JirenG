import { Modal, Spin } from "antd";
import { useState } from "react";
import { deleteGame } from "../../firebase";
import { Game } from "../../types/Game.interface";

interface Props {
  game: Game;
}

export const GameCardPanel: React.FC<Props> = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteThisGame = async (title: string) => {
    if (loading) return;
    console.log("DELETING GAME...");
    setLoading(true);
    deleteGame(title)
      .then(() => {
        console.log("DELETED! :)");
        setVisible(false);
      })
      .catch(() => {
        console.log("FATAL ERROR :(");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        height: "360px",
        margin: "10px",
        position: "relative",
      }}
    >
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "absolute",
          right: "-10px",
          top: "-10px",
          borderRadius: "20px",
          background: "black",
          color: "red",
          border: "0px",
        }}
        className="btnHover"
      >
        X
      </button>
      <img src={props.game.imgUrl} style={{ height: "100%", width: "100%" }} />
      <Modal
        visible={visible}
        onCancel={() => {
          console.log("cancel");
          setVisible(false);
        }}
        onOk={() => {
          deleteThisGame(props.game.title);
        }}
      >
        <p>Are you sure want to delete:</p>
        <p>{props.game.title}?</p>
        {loading ? <Spin /> : <></>}
      </Modal>
    </div>
  );
};
