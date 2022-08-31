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
} from "@ant-design/icons";
import React, { ReactNode } from "react";
import { Store } from "./screens/Store/Store";
import { Downloads } from "./screens/Downloads/Downloads";
import { Installed } from "./screens/Installed/Installed";
import { Settings } from "./screens/Settings/Settings";

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

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/Store" element={buildWithJirenSidebar(<Store />)} />
          <Route
            path="/Installed"
            element={buildWithJirenSidebar(<Installed />)}
          />
          <Route
            path="/Downloads"
            element={buildWithJirenSidebar(<Downloads />)}
          />
          <Route
            path="/Settings"
            element={buildWithJirenSidebar(<Settings />)}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
