import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Admin: React.FC = () => {
  const nav = useNavigate();
  const theme = useSelector((state: any) => state.theme);

  return (
    <div style={{ margin: "5px auto", display: "flex", flexDirection: "column" }}>
      <h1 style={{ color: theme.fontColorMainScreen }}>Admin</h1>
      <Button
        type="primary"
        style={{ margin: "5px" }}
        onClick={() => nav("/Admin/GameControlPanel")}
      >
        Videogames Panel
      </Button>
      <Button disabled type="primary" style={{ margin: "5px" }}>
        Users Panel
      </Button>
      <Button type="primary" style={{ margin: "5px" }} onClick={() => nav("/Admin/CreateTheme")}>
        Create Theme
      </Button>
    </div>
  );
};
