import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TestSlice {
  name: string;
}

const initialState: TestSlice = {
  name: 'KARM KARAN',
};

export const testSlice = createSlice({
  name: "testRTK",
  initialState,
  reducers: {
    incre1: (state) => {
      state.name += "za";
    },
    decre1: (state) => {
      state.name += "bad";
    },
  },
});

export const { incre1, decre1 } = testSlice.actions;

export default testSlice.reducer;

