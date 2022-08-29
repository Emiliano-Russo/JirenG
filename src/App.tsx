import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SingIn } from "./screens/SingIn/SingIn";
import { SingUp } from "./screens/SingUp/SingUp";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
