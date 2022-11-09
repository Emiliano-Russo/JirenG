import { Input, Button, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { emailExists, registerWithEmailAndPassword, usernameExists } from "../../firebase";
import { setUser } from "../../redux/loginSlice";

export const SingUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async () => {
    setLoading(true);
    if (username && email && password) {
      const usernameTaken = await usernameExists(username);
      if (usernameTaken) {
        message.error("Username already taken");
        setLoading(false);
        return;
      }
      const emailTaken = await emailExists(email);
      if (emailTaken) {
        message.error("Email already taken");
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        message.error("Password too short (8 characters long required)");
        setLoading(false);
        return;
      }
      registerWithEmailAndPassword(username, email, password)
        .then((res) => {
          message.success("Account Created");
          dispatch(setUser({ uid: res.user.uid, email, username }));
          nav("/Store");
        })
        .catch((e) => {
          message.error("Couldn't Create Account :(");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      message.error("Missing data");
      setLoading(false);
    }
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
          disabled={loading}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button loading={loading} onClick={createAccount} type="primary">
          Create
        </Button>
      </div>
    </>
  );
};
