import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTheme, deleteTheme } from "../../firebase";

export const CreateTheme: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const theme = useSelector((state: any) => state.theme);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setLoading(true);
    addTheme(values)
      .then(() => {
        message.success("Theme Uploaded!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onDelete = (values: any) => {
    setLoading(true);
    deleteTheme(values.title)
      .then(() => {
        message.info("Theme Deleted!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        margin: "5px auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
      }}
    >
      <h1 style={{ color: theme.fontColorMainScreen }}>Create Theme</h1>
      <Button
        onClick={() => nav("/Admin")}
        style={{ position: "absolute", left: "10px", top: "10px" }}
      >
        {"Back"}
      </Button>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          width: "400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          background: "white",
          padding: "10px",
        }}
      >
        <Form.Item label="Title" name="title">
          <Input placeholder="Night" />
        </Form.Item>

        <Form.Item label="Background Main Screen" name="background">
          <Input />
        </Form.Item>

        <Form.Item label="Font Color Main Screen" name="fontColorMainScreen">
          <Input />
        </Form.Item>

        <Form.Item label="Nav Background" name="navBackground">
          <Input />
        </Form.Item>

        <Form.Item label="Nav Font Color" name="navFontColor">
          <Input />
        </Form.Item>

        <Form.Item label="Nav Selected Color" name="navSelectedColor">
          <Input />
        </Form.Item>

        <Form.Item label="Hover Item Nav Color" name="hoverItemNavColor">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: theme.fontColorMainScreen }}>Delete a Theme</h3>
        <Form
          name="delete"
          initialValues={{ remember: true }}
          onFinish={onDelete}
          style={{
            width: "400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            background: "white",
            padding: "10px",
          }}
        >
          <Form.Item label="Title" name="title">
            <Input placeholder="Night" />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
