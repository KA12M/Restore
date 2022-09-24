import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  num: number;
}

const initialState: CounterState = {
  num: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      state.num += payload;
    },
    decrement: (state) => {
      state.num -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer

