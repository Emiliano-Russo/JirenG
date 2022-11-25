import { useState } from "react";
import { useSelector } from "react-redux";
import { updateOnlineStatus } from "../../firebase";

const { ipcRenderer } = window.require("electron");

const FrameBtn = (props: any) => {
  return (
    <button
      style={{ margin: "0 0 0 5px", width: "30px", background: props.bg, border: "none" }}
      className="titlebar-button btnHover"
      onClick={() => {
        props.action();
      }}
    >
      {props.text}
    </button>
  );
};

export const Frame = () => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.login.user);
  return (
    <div
      className="titlebar"
      id="frame"
      style={{
        background: "white",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        height: "3%",
      }}
    >
      <FrameBtn
        bg="white"
        text="-"
        action={() => {
          ipcRenderer.send("minimize-app");
        }}
      />
      <FrameBtn bg="white" text="□" action={() => ipcRenderer.send("maximize-app")} />
      <FrameBtn
        bg="red"
        text="x"
        action={() => {
          updateOnlineStatus(user.uid, false).finally(() => {
            ipcRenderer.send("close-app");
          });
        }}
      />
    </div>
  );
};
