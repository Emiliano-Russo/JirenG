import { Button } from "antd";
import { useState } from "react";
import { SettingOutlined, LoginOutlined } from "@ant-design/icons";
import "./JirenSidebar.styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/loginSlice";
import { logout } from "../../firebase";

export interface Option {
  icon: React.ReactNode;
  text: string;
  navTo: string;
}

interface PropsJirenSidebar {
  optionList: Option[];
}

export const JirenSidebar = (props: PropsJirenSidebar) => {
  const [option, setOption] = useState<number>(0);
  const nav = useNavigate();
  const user = useSelector(
    (state: any) => state.login.user
  );
  const dispatch = useDispatch();

  return (
    <div
      style={{ backgroundColor: "#28282B", width: "180px", minHeight: "100%" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h3 style={{ margin: 0, padding: "10px 0", color: "whitesmoke" }}>
          {user.username}
        </h3>
        <LoginOutlined
          style={{ color: "white" }}
          className="hoverJirensidebar"
          onClick={async () => {
            await logout();
            dispatch(logOut());
            nav("/");
          }}
        />
      </div>
      <div
        id="options"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          justifyContent: "flex-start",
          paddingTop: "10px",
        }}
      >
        {props.optionList.map((val, i) => {
          return (
            <Button
              className="hoverJirensidebar"
              key={i}
              type="link"
              icon={val.icon}
              style={{
                backgroundColor: option == i ? "#E3256B" : "inherit",
                textAlign: "left",
                color: "white",
                margin: "5px 0",
              }}
              onClick={() => {
                setOption(i);
                nav(val.navTo);
              }}
            >
              {val.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
