import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SingIn } from "./screens/SingIn/SingIn";
import { SingUp } from "./screens/SingUp/SingUp";
import { JirenSidebar, Option } from "./components/JirenSidebar/JirenSidebar";
import {
  AppstoreOutlined,
  DesktopOutlined,
  CloudDownloadOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { ReactNode } from "react";
import { Store } from "./screens/Store/Store";
import { Downloads } from "./screens/Downloads/Downloads";
import { Installed } from "./screens/Installed/Installed";
import { Settings } from "./screens/Settings/Settings";
import { useSelector } from "react-redux";
import { Admin } from "./screens/Admin/Admin";
import { GameControlPanel } from "./screens/GameControlPanel/GameControlPanel";
import { Helmet } from "react-helmet";

function App() {
  const bg = useSelector((state: any) => state.theme.background);
  const buildWithJirenSidebar = (element: ReactNode) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100%",
          width: "100%",
        }}
      >
        <JirenSidebar optionList={options} />
        {element}
      </div>
    );
  };

  const user = useSelector((state: any) => state.login.user);

  const options: Option[] = [
    {
      text: "Store",
      icon: <AppstoreOutlined />,
      navTo: "/Store",
    },
    {
      text: "Downloads",
      icon: <CloudDownloadOutlined />,
      navTo: "/Downloads",
    },
    {
      text: "Installed",
      icon: <DesktopOutlined />,
      navTo: "/Installed",
    },
    {
      text: "Settings",
      icon: <SettingOutlined />,
      navTo: "/Settings",
    },
  ];

  if (user.isAdmin)
    options.push({
      text: "Admin",
      icon: <UserOutlined />,
      navTo: "/Admin",
    });

  return (
    <div className="App">
      <Helmet>
        <style>{`body { background: ${bg}; }`}</style>
      </Helmet>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/Store" element={buildWithJirenSidebar(<Store />)} />
          <Route path="/Installed" element={buildWithJirenSidebar(<Installed />)} />
          <Route path="/Downloads" element={buildWithJirenSidebar(<Downloads />)} />
          <Route path="/Settings" element={buildWithJirenSidebar(<Settings />)} />
          <Route path="/Admin" element={buildWithJirenSidebar(<Admin />)} />
          <Route
            path="/Admin/GameControlPanel"
            element={buildWithJirenSidebar(<GameControlPanel />)}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
