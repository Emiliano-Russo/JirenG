import { Button, message } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeGameFromDownloads } from "../../redux/gameSlice";
import { LinkGame, TorrentGame } from "../../types/Game.interface";

interface Props {
  game: LinkGame | TorrentGame;
}

export const GameCardDownload = (props: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(100);
  const dispatch = useDispatch();

  const getProgress = () => {
    return `inset(${progress}% 0px 0px 0px`;
  };

  const removeFromDownloads = () => {
    message.info("Game Removed");
    dispatch(removeGameFromDownloads(props.game));
  }

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

      <Button
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          borderRadius:"10px"
        }}
       danger
       type="primary"
       onClick={removeFromDownloads}
      >
        X
      </Button>
    </motion.div>
  );
};
