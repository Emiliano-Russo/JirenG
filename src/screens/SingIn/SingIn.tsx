import { Input, Button } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logInWithEmailAndPassword } from "../../firebase";

export const SingIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const singIn = async () => {
    if (email && password) {
      const result = await logInWithEmailAndPassword(email, password);
      if (result) console.log("authentcation succesfully: ", result);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Hello!</h1>
      <Input
        style={{ width: "250px", marginBottom: "10px" }}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        style={{ width: "250px" }}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button style={{ marginTop: "10px" }} onClick={singIn}>
        Sing In
      </Button>
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <NavLink to="/SingUp">Sing Up</NavLink>
      </p>
    </div>
  );
};
