import { Input, Button } from "antd";
import { NavLink } from "react-router-dom";

export const SingUp = () => {
  const createAccount = () => {
    console.log("create account");
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
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Input type={"password"} placeholder="Password" />
        <Button onClick={createAccount} type="primary">
          Create
        </Button>
      </div>
    </>
  );
};
