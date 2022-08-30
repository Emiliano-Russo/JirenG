import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SingIn } from "./screens/SingIn/SingIn";
import { SingUp } from "./screens/SingUp/SingUp";
import { Store } from "./screens/Store/Store";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/Store" element={<Store />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
