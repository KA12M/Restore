import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HomeSlice {
  fullscreen: boolean;
}

const initialState: HomeSlice = {
  fullscreen: false,
};

export const homeSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    changeScreen: (state) => {
      state.fullscreen = !state.fullscreen;
    },
  },
});

export const { changeScreen } = homeSlice.actions;

export default homeSlice.reducer;
