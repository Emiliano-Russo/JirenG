import { Button } from "antd";
import { useState } from "react";
import { SettingOutlined, LoginOutlined } from "@ant-design/icons";
import "./JirenSidebar.styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/loginSlice";
import { logout } from "../../firebase";
import { Helmet } from "react-helmet";

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
  const user = useSelector((state: any) => state.login.user);
  const theme = useSelector((state: any) => state.theme);
  const isDownloadingGlobal = useSelector((state: any) => state.games.isDownloading);
  const dispatch = useDispatch();

  return (
    <div style={{ background: theme.navBackground, minWidth: "180px", minHeight: "97%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Helmet>
          <style>{`.hoverJirensidebar:hover {
          color: ${theme.hoverItemNavColor} !important;
            cursor: pointer;
          }`}</style>
        </Helmet>
        <h3 style={{ margin: 0, padding: "10px 0", color: theme.navFontColor }}>{user.username}</h3>
        <LoginOutlined
          style={{ color: theme.navFontColor }}
          className={isDownloadingGlobal ? "" : "hoverJirensidebar"}
          onClick={async () => {
            if (isDownloadingGlobal) return;
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
              disabled={isDownloadingGlobal}
              className="hoverJirensidebar"
              key={i}
              type="link"
              icon={val.icon}
              style={{
                backgroundColor: option == i ? theme.navSelectedColor : "inherit",
                textAlign: "left",
                color: theme.navFontColor,
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
