import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

import counterSlice from "./couter.slice";
import testSlice from "./test.slice";
import homeSlice from "./home.slice";
import basketSlice from "./basket.slice";
import catalogSlice from "./catalog.slice";
import accountSlice from "./account.slice";

//configureStore เป็นของ redux toolkits ท ำหน้ำที่รวบรวม Slice/Reducer
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    test: testSlice,
    screen: homeSlice,
    basket: basketSlice,
    catalog: catalogSlice,
    account: accountSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

//เป็นค่ำ Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>;
// ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;

// dispatch ส าหรับเรียก action
//ส ำหรับเรียกใข้ dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
