import { Button } from "antd";
import { useState } from "react";
import { ModalChangeUsername } from "./ModalChangeUsername";
const package_json = require("../../../package.json");

export const Settings: React.FC = () => {
  const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);

  return (
    <div style={{ margin: "5px auto", display: "flex", flexDirection: "column" }}>
      <h1>Settings</h1>
      <p style={{ textAlign: "center" }}> Jiren Games v{package_json.version}</p>
      <Button
        type="primary"
        style={{ margin: "5px" }}
        onClick={() => setChangeUsernameVisible(true)}
      >
        Change Username
      </Button>
      <Button type="primary" style={{ margin: "5px" }} disabled={true}>
        Theme
      </Button>

      <ModalChangeUsername
        isVisible={changeUsernameVisible}
        onClose={() => {
          setChangeUsernameVisible(false);
        }}
      />
    </div>
  );
};
