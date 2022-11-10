import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    background: "white",
  },
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
  },
});

export const { setBackground } = themeSlice.actions;

export default themeSlice.reducer;
