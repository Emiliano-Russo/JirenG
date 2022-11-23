import { Button, message, Modal, Spin } from "antd";
import { useState } from "react";
import { Game } from "../../types/Game.interface";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToDownloads } from "../../redux/gameSlice";
import { Badge } from "antd";

interface Props {
  game: Game;
  alreadyDownload: boolean;
}

export const GameCardStore: React.FC<Props> = (props: Props) => {
  const [hover, setHover] = useState(false);

  const dispatch = useDispatch();

  return (
    <AnimatePresence>
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
        initial={{ opacity: 0, scale: 0.5, y: 300 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ position: "absolute", display: "none" }}
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
              {props.game.tested ? (
                <Badge.Ribbon
                  style={{ position: "absolute", top: "5px", right: "-12px" }}
                  color="green"
                  text="Working"
                />
              ) : (
                <Badge.Ribbon
                  style={{ position: "absolute", top: "5px", right: "-12px" }}
                  color="red"
                  text="Not Tested"
                />
              )}
            </div>
            <Badge.Ribbon
              style={{
                position: "absolute",
                top: "50px",
                right: "-128px",
              }}
              color="pink"
              text={props.game.totalSize}
            />
            {props.game.version ? (
              <Badge.Ribbon
                style={{
                  position: "absolute",
                  top: "97px",
                  right: "-128px",
                }}
                color="blue"
                text={props.game.version}
              />
            ) : (
              <></>
            )}

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
    </AnimatePresence>
  );
};
