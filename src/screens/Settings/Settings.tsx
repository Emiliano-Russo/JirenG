import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemes } from "../../firebase";
import { ModalChangeUsername } from "../../components/ModalChangeUsername/ModalChangeUsername";
import { ModalTheme } from "../../components/ModalTheme/ModalTheme";
const package_json = require("../../../package.json");

export const Settings: React.FC = () => {
  const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);
  const [modalTheme, setModalTheme] = useState(false);
  const [firebaseThemes, setFirebaseThemes] = useState<any[]>([{ hola: "sisi" }]);
  const theme = useSelector((state: any) => state.theme);

  useEffect(() => {
    const getThemesFromFS = async () => {
      getThemes().then((val) => {
        setFirebaseThemes(val);
      });
    };
    getThemesFromFS();
  }, []);

  return (
    <div style={{ margin: "5px auto", display: "flex", flexDirection: "column" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Settings</h1>
      <p style={{ textAlign: "center", color: theme.fontColorMainScreen }}>
        {" "}
        Jiren Games v{package_json.version}
      </p>
      <Button
        type="primary"
        style={{ margin: "5px" }}
        onClick={() => setChangeUsernameVisible(true)}
      >
        Change Username
      </Button>
      <Button type="primary" style={{ margin: "5px" }} onClick={() => setModalTheme(true)}>
        Theme
      </Button>

      <ModalChangeUsername
        isVisible={changeUsernameVisible}
        onClose={() => {
          setChangeUsernameVisible(false);
        }}
      />

      <ModalTheme
        themes={firebaseThemes}
        isVisible={modalTheme}
        onClose={() => setModalTheme(false)}
      />
    </div>
  );
};
