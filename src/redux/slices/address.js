import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAddAddress = createAsyncThunk(
  "address/fetchAddAddress",
  async (params) => {
    const { data } = await axios.post("/add-address", params);
    return data;
  }
);

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const { data } = await axios.get("/addresses");
    return data;
  }
);

const initialState = {
  items: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddAddress.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAddAddress.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAddAddress.rejected, (state) => {
        // state.data = null;
      })
      .addCase(fetchAddresses.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        // state.data = null;
      });
  },
});
export const selectAddresses = (state) => state.address.items;
export const addressReducer = addressSlice.reducer;
