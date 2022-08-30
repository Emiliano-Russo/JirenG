import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string;
}

function getInitialState() {
  const string = localStorage.getItem("user");
  if (string != null) return JSON.parse(string);
  else
    return {
      uid: "",
      email: "",
    };
}

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: getInitialState(),
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log("setting user:", action);
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
