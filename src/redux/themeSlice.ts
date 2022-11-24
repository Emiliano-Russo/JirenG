import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function getInitialState() {
  const string = localStorage.getItem("theme");
  if (string != null) return JSON.parse(string);
  else
    return {
      background: "white",
      fontColorMainScreen: "black",
      navBackground: "#28282B",
      navFontColor: "white",
      navSelectedColor: "#E3256B",
      hoverItemNavColor: "rgb(243, 213, 215)",
    };
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: getInitialState(),
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
    setTheme: (state, action: PayloadAction<any>) => {
      console.log("setting theme: ", action.payload);
      state.background = action.payload.background;
      state.fontColorMainScreen = action.payload.fontColorMainScreen;
      state.navBackground = action.payload.navBackground;
      state.navFontColor = action.payload.navFontColor;
      state.navSelectedColor = action.payload.navSelectedColor;
      state.hoverItemNavColor = action.payload.hoverItemNavColor;
      localStorage.setItem("theme", JSON.stringify(state));
    },
  },
});

export const { setBackground, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
