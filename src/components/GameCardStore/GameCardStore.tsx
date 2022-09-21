import { Button, message, Modal, Spin } from "antd";
import { useState } from "react";
import { LinkGame, TorrentGame } from "../../types/Game.interface";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToDownloads } from "../../redux/gameSlice";

interface Props {
  game: LinkGame | TorrentGame;
  alreadyDownload: boolean;
}

export const GameCardStore: React.FC<Props> = (props: Props) => {
  const [hover, setHover] = useState(false);

  const dispatch = useDispatch();

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
        }}
      />
      {hover ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: "20px" }}
          >
            <p style={{ color: "black", background: "white" }}>{props.game.totalSize}</p>
            <Button
              onClick={() => {
                dispatch(addToDownloads(props.game));
                message.success("In Downloads");
              }}
              disabled={props.alreadyDownload}
            >
              {props.alreadyDownload ? "In Downloads" : "Download"}
            </Button>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </motion.div>
  );
};
