import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SingIn } from "./screens/SingIn/SingIn";
import { SingUp } from "./screens/SingUp/SingUp";
import { Store } from "./screens/Store/Store";
import { SideBar } from "./components/Sidebar/Sidebar";
import { WrapperSidebar } from "./components/WrapperSidebar/WrapperSidebar";
import { Installed } from "./screens/Installed/Installed";
import { Downloads } from "./screens/Downloads/Downloads";

enum Screen {
  store,
  installed,
  downloads,
}

function buildScreenWidthSideBar(screen: Screen) {
  const sideBarWidth = 150;
  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100%" }}>
      <SideBar widthPx={sideBarWidth} />
      <WrapperSidebar sideBarWidth={sideBarWidth}>
        {screen == Screen.store ? (
          <Store />
        ) : screen == Screen.installed ? (
          <Installed />
        ) : (
          <Downloads />
        )}
      </WrapperSidebar>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route
            path="/Store"
            element={buildScreenWidthSideBar(Screen.store)}
          />
          <Route
            path="/Installed"
            element={buildScreenWidthSideBar(Screen.installed)}
          />
          <Route
            path="/Downloads"
            element={buildScreenWidthSideBar(Screen.downloads)}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
