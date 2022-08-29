import { Input, Button } from "antd";
import { NavLink } from "react-router-dom";

export const SingIn = () => {
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
        placeholder="Username"
      />
      <Input style={{ width: "250px" }} placeholder="Password" />
      <Button style={{ marginTop: "10px" }}>Sing In</Button>
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <NavLink to="/SingUp">Sing Up</NavLink>
      </p>
    </div>
  );
};
