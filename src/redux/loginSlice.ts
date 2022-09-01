import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string;
  username: string;
  isAdmin?: boolean;
}

function getInitialState() {
  const string = localStorage.getItem("user");
  if (string != null) return JSON.parse(string);
  else
    return {
      uid: "",
      email: "",
      username: "",
      isAdmin: false,
    };
}

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: getInitialState(),
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      const user = { email: "", uid: "", username: "" };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setNewUsername: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, logOut, setNewUsername } = loginSlice.actions;

export default loginSlice.reducer;
