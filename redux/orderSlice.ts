import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, OrderState } from "../types/types";

const API_URL = "http://localhost:8080/api/order";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData: Order) => {
    const response = await axios.post<string>(API_URL, orderData);
    return response.data;
  }
);

const initialState: OrderState = {
  loading: false,
  success: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
        console.log('SUCCESS', state.success)
      })
      .addCase(placeOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
