import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername, getThemes } from "../../firebase";
import { setNewUsername } from "../../redux/loginSlice";
import { setBackground } from "../../redux/themeSlice";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  themes: any;
}

export const ModalTheme: React.FC<Props> = (props: Props) => {
  console.log("PROPS MODAL THEME: ", props);

  const dispatch = useDispatch();

  const onOk = async () => {
    props.onClose();
  };

  return (
    <Modal visible={props.isVisible} onCancel={props.onClose} onOk={onOk}>
      {props.themes.map((val: any) => {
        return (
          <Button
            style={{
              background: val.background,
            }}
            onClick={() => {
              dispatch(setBackground(val.background));
              message.info("Changed to " + val.title);
            }}
          >
            {val.title}
          </Button>
        );
      })}
    </Modal>
  );
};
