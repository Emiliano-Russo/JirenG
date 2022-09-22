import { Button, message } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToLibrary,
  passDownloadToLibrary,
  removeGameFromDownloads,
} from "../../redux/gameSlice";
import { Game } from "../../types/Game.interface";
const { ipcRenderer } = window.require("electron");

interface Props {
  game: Game;
}

export const GameCardDownload = (props: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(100);
  const [fb, setFb] = useState(""); //feedback from backend
  const dispatch = useDispatch();

  const feedback = (event: any, arg?: any) => {
    setFb(arg);
    if (arg.includes("Downloading")) {
      const numberStr: string[] = arg.split(" ");
      numberStr[1].replace("%", "");
      const number: number = parseInt(numberStr[1]);
      setProgress(100 - number);
    }
  };

  const onDownloadReady = (event: any, arg?: any) => {
    console.log("DOWNLOAD READY!");
    message.success("Ready to play!");
    dispatch(passDownloadToLibrary(props.game));
  };

  useEffect(() => {
    ipcRenderer.on("feedback", feedback);
    ipcRenderer.on("download-ready", onDownloadReady);

    return () => {
      ipcRenderer.removeListener("feedback", feedback);
      ipcRenderer.removeListener("download-ready", onDownloadReady);
    };
  }, []);

  const getProgress = () => {
    return `inset(${progress}% 0px 0px 0px`;
  };

  const removeFromDownloads = () => {
    message.info("Game Removed");
    dispatch(removeGameFromDownloads(props.game));
  };

  const startDownload = () => {
    console.log("Starting download");
    setIsDownloading(true);
    ipcRenderer.send("download-game", props.game);
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
          <Button type="primary" onClick={startDownload}>
            Start Download
          </Button>
        ) : (
          <div style={{ background: "black", opacity: "90%" }}>
            <h1 style={{ color: "white" }}>{fb}</h1>
          </div>
        )}
      </div>

      <Button
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          borderRadius: "10px",
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
