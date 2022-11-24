import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUserData } from "../../firebase";

export const UsersPanel: React.FC = () => {
  const theme = useSelector((state: any) => state.theme);
  const nav = useNavigate();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getAllUserData().then((arr) => {
      setUsers(arr);
    });
  }, []);

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
      <Button
        onClick={() => nav("/Admin")}
        style={{ position: "absolute", left: "10px", top: "10px" }}
      >
        {"Back"}
      </Button>
      <h1 style={{ color: theme.fontColorMainScreen }}>Users Panel</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          background: "white",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {users.map((user: any) => {
          return (
            <div
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                margin: "10px",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              <h1>{user.username}</h1>
              {user.isOnline ? (
                <h2 style={{ color: "green" }}>Online</h2>
              ) : (
                <h2 style={{ color: "red" }}>Offline</h2>
              )}
              <h2>
                Theme <strong>{user.usingTheme}</strong>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};
