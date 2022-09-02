import { Button } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { LinkGame, TorrentGame } from "../../types/Game.interface";

interface Props {
  game: LinkGame | TorrentGame;
}

export const GameCardDownload = (props: Props) => {
  const [isDownloading, setIsDownloading] = useState(true);
  const [progress, setProgress] = useState(80);

  const getProgress = () => {
    return `inset(${progress}% 0px 0px 0px`;
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        height: "360px",
        margin: "40px 10px",
        position: "relative",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={props.game.imgUrl}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          filter: "grayScale(100%)",
        }}
      />
      <img
        id="downloadPogress"
        src={props.game.imgUrl}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          clipPath: getProgress(),
        }}
      />
      <div style={{ position: "absolute", top: "50%", width: "100%" }}>
        {!isDownloading ? (
          <Button type="primary">Start Download</Button>
        ) : (
          <div style={{ background: "black", opacity: "90%" }}>
            <h1 style={{ color: "white" }}>{progress}%</h1>
          </div>
        )}
      </div>

      <button
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          background: "red",
          color: "black",
        }}
      >
        X
      </button>
    </motion.div>
  );
};
