import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Admin: React.FC = () => {

  const nav = useNavigate();

  return (
    <div style={{ margin: "5px auto", display:"flex", flexDirection:"column" }}>
      <h1>Admin</h1>
      <Button type="primary" style={{margin:"5px"}} onClick={() => nav("/Admin/GameControlPanel")}>Videogames Panel</Button>
      <Button type="primary" style={{margin:"5px"}}>Users Panel</Button>
    </div>
  );
};
