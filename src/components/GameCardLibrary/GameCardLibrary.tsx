import { Button } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

export const GameCardLibrary = (props: { game: Game }) => {
  const [hover, setHover] = useState(false);

  const play = () => {
    ipcRenderer.send("play-game", props.game.title);
  };

  return (
    <motion.div
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: "absolute", bottom: "20px" }}
      >
        <Button type="primary" style={{ width: "150px" }} onClick={play}>
          Play
        </Button>
      </motion.div>
    </motion.div>
  );
};
