import { Button, message, Modal } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeGameFromLibrary } from "../../redux/gameSlice";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

export const GameCardLibrary = (props: { game: Game }) => {
  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      ipcRenderer.removeListener("remove-ready", removeReady);
    };
  }, []);

  const removeReady = () => {
    console.log("--Method: removeReady()");
    setLoading(false);
    message.info("Game Deleted");
  };

  const play = () => {
    ipcRenderer.send("play-game", props.game);
  };

  const deleteGame = () => {
    console.log("--Method: deleteGame()");
    ipcRenderer.on("remove-ready", removeReady);
    setLoading(true);
    dispatch(removeGameFromLibrary(props.game));
    ipcRenderer.send("remove-game", props.game.title);
    setModalOpen(false);
  };

  const btnsWhenHover = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button type="primary" style={{ width: "150px", marginBottom: "5px" }} onClick={play}>
          Play
        </Button>
      </motion.div>
      <button
        className="btnHover"
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          borderRadius: "10px",
          background: "red",
          border: "none",
          color: "white",
        }}
        onClick={() => setModalOpen(true)}
      >
        Delete
      </button>
    </>
  );

  return (
    <motion.div
      key={props.game.title}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        height: "360px",
        margin: "10px",
        position: "relative",
        alignContent: "center",
        alignItems: "center",
      }}
      className={hover ? "cardHover" : ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.5 },
      }}
    >
      <img
        src={props.game.imgUrl}
        style={{
          height: "100%",
          width: "100%",
          filter: hover ? "saturate(2)" : "",
          position: "absolute",
          borderRadius: "10px",
        }}
      />
      {hover ? btnsWhenHover : <></>}
      <Modal
        key={props.game.title}
        confirmLoading={loading}
        title={props.game.title}
        onOk={deleteGame}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <h3>You sure want to delete the game? </h3>
      </Modal>
    </motion.div>
  );
};
