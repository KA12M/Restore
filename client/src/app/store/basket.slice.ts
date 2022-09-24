import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Basket } from "../models/Basket";

interface BasketPayload {
  productId: number;
  quantity?: number;
  name?: string;
}

export interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

// TODO: createAsyncThunk<return, input parameter, {}>
// TODO: thunkAPI.rejectWithValue ส้ง axios intercepters
export const addBasketItemAsync = createAsyncThunk<Basket, BasketPayload>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addBasket(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<void, BasketPayload>(
  "basket/removeBasketItemAsync",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await agent.Basket.removeBasket(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, { payload }: PayloadAction<Basket>) => {
      state.basket = payload;
    },
    removeItem: (
      { basket },
      { payload: { productId, quantity } }: PayloadAction<BasketPayload>
    ) => {
      const { items } = basket!;
      const itemIndex = items.findIndex((i) => i.productId === productId);
      if (itemIndex >= 0) {
        items[itemIndex].quantity -= quantity!;
        if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity!;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;

export default basketSlice.reducer;
