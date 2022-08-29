import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
  },
  reducers: {},
});

export default loginSlice.reducer;
