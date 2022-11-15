import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername, getThemes } from "../../firebase";
import { setNewUsername } from "../../redux/loginSlice";
import { setBackground, setTheme } from "../../redux/themeSlice";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  themes: any;
}

export const ModalTheme: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const onOk = async () => {
    props.onClose();
  };

  console.log("Theme Props", props);

  return (
    <Modal visible={props.isVisible} onCancel={props.onClose} onOk={onOk}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "80%",
          margin: "0 auto",
          height: "100px",
          overflowY: "scroll",
        }}
      >
        {props.themes.map((val: any) => {
          return (
            <Button
              style={{
                background: val.background,
                margin: "5px",
              }}
              onClick={() => {
                dispatch(setTheme(val));
                message.info("Changed to " + val.title);
              }}
            >
              {val.title}
            </Button>
          );
        })}
      </div>
    </Modal>
  );
};
