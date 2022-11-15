import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    background: "white", //DONE
    fontColorMainScreen: "black", //DONE
    navBackground: "#28282B", // blacky DONE
    navFontColor: "white", //"white", DONE
    navSelectedColor: "#E3256B", //special pink DONE
    hoverItemNavColor: "rgb(243, 213, 215)",
  },
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
    },
  },
});

export const { setBackground, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
