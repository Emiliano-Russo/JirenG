import { Input, Button } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../firebase";

export const SingUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const createAccount = () => {
    console.log("creating account...");
    if (username && email && password)
      registerWithEmailAndPassword(username, email, password);
  };

  return (
    <>
      <NavLink
        to="/"
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          padding: "15px",
        }}
      >
        Back
      </NavLink>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          height: "250px",
          margin: "50px auto",
          justifyContent: "space-around",
        }}
      >
        <h1>Create account</h1>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={createAccount} type="primary">
          Create
        </Button>
      </div>
    </>
  );
};
