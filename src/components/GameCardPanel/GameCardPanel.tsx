import { Button, Form, Input, message, Modal, Spin, Switch } from "antd";
import { useState } from "react";
import { deleteGame, editGame } from "../../firebase";
import { Game } from "../../types/Game.interface";

interface Props {
  game: Game;
}

export const GameCardPanel: React.FC<Props> = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteThisGame = async (title: string) => {
    if (loading) return;
    setLoading(true);
    deleteGame(title)
      .then(() => {
        setVisible(false);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const saveEditedGame = async (obj: any) => {
    //TO BE CONTINUED....
    setLoading(true);
    Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
    editGame(props.game.title, obj)
      .then(() => {
        message.success("Game edited!");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
        setEditVisible(false);
      });
  };

  const formEdit = (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={saveEditedGame}
    >
      <Form.Item name="title" label="Title">
        <Input placeholder="title" defaultValue={props.game.title} />
      </Form.Item>
      <Form.Item name="imgUrl" label="Img Url">
        <Input placeholder="imgUrl" defaultValue={props.game.imgUrl} />
      </Form.Item>
      <Form.Item name="totalSize" label="Total Size">
        <Input placeholder="totalSize" defaultValue={props.game.totalSize} />
      </Form.Item>
      <Form.Item name="tested" label="Tested">
        <Switch defaultChecked={props.game.tested} />
      </Form.Item>
      <Form.Item name="crackUrl" label="crackUrl">
        <Input placeholder="crackUrl" value={props.game.crackUrl} />
      </Form.Item>
      <Form.Item name="exeName" label="ExeName">
        <Input placeholder="exeName" defaultValue={props.game.exeName} />
      </Form.Item>
      {props.game.downloadLinks?.map((link: string, index: number) => {
        const res = (
          <Form.Item name={"link" + index} label={"Link " + index}>
            <Input placeholder="link" defaultValue={link} />
          </Form.Item>
        );
        return res;
      })}
      <Form.Item name="version" label="Version">
        <Input placeholder="version" defaultValue={props.game.version} />
      </Form.Item>
      <Form.Item name="magnetUri" label="MagnetUri">
        <Input placeholder="magnetUri" defaultValue={props.game.magnetUri} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button loading={loading} block type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        height: "360px",
        margin: "10px",
        position: "relative",
      }}
    >
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "absolute",
          right: "-10px",
          top: "-10px",
          borderRadius: "20px",
          background: "black",
          color: "red",
          border: "0px",
        }}
        className="btnHover"
      >
        Delete
      </button>
      <button
        onClick={() => setEditVisible(true)}
        style={{
          position: "absolute",
          top: "-10px",
          borderRadius: "20px",
          background: "black",
          color: "cyan",
          border: "0px",
        }}
        className="btnHover"
      >
        Edit
      </button>
      <img src={props.game.imgUrl} style={{ height: "100%", width: "100%" }} />
      <Modal
        visible={visible}
        onCancel={() => {
          console.log("cancel");
          setVisible(false);
        }}
        onOk={() => {
          deleteThisGame(props.game.title);
        }}
      >
        <p>Are you sure want to delete:</p>
        <p>{props.game.title}?</p>
        {loading ? <Spin /> : <></>}
      </Modal>
      <Modal
        visible={editVisible}
        onCancel={() => {
          setEditVisible(false);
        }}
        footer={null}
      >
        <h2 style={{ textAlign: "center" }}>Edit</h2>
        <h4 style={{ textAlign: "center" }}>
          <strong>{props.game.title}</strong>
        </h4>
        {formEdit}
      </Modal>
    </div>
  );
};
