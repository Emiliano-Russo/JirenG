import { Button, message, Modal, Spin } from "antd";
import { useState } from "react";
import { Game } from "../../types/Game.interface";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToDownloads } from "../../redux/gameSlice";

interface Props {
  game: Game;
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
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: props.game.tested ? "lightgreen" : "pink",
              zIndex: 5,
              padding: "2px 5px",
              borderBottomLeftRadius: "10px",
            }}
          >
            {props.game.tested ? <h3>Tested</h3> : <h3>Not Tested</h3>}
          </div>
          <h4
            style={{
              color: "black",
              background: "white",
              position: "absolute",
              top: "0",
              left: "0",
              padding: "2px 5px",
              borderBottomRightRadius: "10px",
            }}
          >
            {props.game.totalSize}
          </h4>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: "20px" }}
          >
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
