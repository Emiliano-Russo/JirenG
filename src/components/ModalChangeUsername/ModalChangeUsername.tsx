import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername } from "../../firebase";
import { setNewUsername } from "../../redux/loginSlice";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const ModalChangeUsername: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const user = useSelector((state: any) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(user.username);
  }, []);

  const onOk = async () => {
    if (loading) return;
    setLoading(true);
    changeUsername(user.uid, username)
      .then(() => {
        message.success("Username modified successfully");
        dispatch(setNewUsername(username));
        props.onClose();
      })
      .catch((err) => {
        message.error("Username already exists");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal visible={props.isVisible} onCancel={props.onClose} onOk={onOk}>
      <h3>New Username</h3>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "30px 0px" }}
        disabled={loading}
      />
    </Modal>
  );
};
