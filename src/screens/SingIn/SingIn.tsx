import { Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUsername, logInWithEmailAndPassword } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/loginSlice";

export const SingIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const user = useSelector((state: any) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.email != "") nav("/Store");
  }, []);

  const singIn = async () => {
    setLoading(true);
    if (email && password) {
      const result = await logInWithEmailAndPassword(email, password);
      console.log("RESULT: ", result);
      if (result) {
        const username = await getUsername(result.user.uid);
        message.success("SingIn Successfully");
        dispatch(setUser({ uid: result.user.uid, email, username }));
        nav("/store");
      } else message.error("Invalid Credentials");
    } else message.error("Missing Email or Password");
    setLoading(false);
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
        type="password"
      />
      <Button style={{ marginTop: "10px" }} onClick={singIn} loading={loading}>
        Sing In
      </Button>
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <NavLink to="/SingUp">Sing Up</NavLink>
      </p>
    </div>
  );
};
