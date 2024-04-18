import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAppeals = createAsyncThunk(
  "appeals/fetchAppeals",
  async () => {
    const { data } = await axios.get("/appeals");
    return data;
  }
);
export const fetchAddAppeal = createAsyncThunk(
  "application/fetchAppeal",
  async (params) => {
    const { data } = await axios.post("/appeal", params);
    return data;
  }
);

const initialState = {
  items: [],
};

const appealSlice = createSlice({
  name: "appeal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppeals.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAppeals.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAppeals.rejected, (state) => {
        // state.data = null;
      })
      .addCase(fetchAddAppeal.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAddAppeal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchAddAppeal.rejected, (state) => {
        // state.data = null;
      });
  },
});

export const selectAppeals = (state) => state.appeal.items;

export const appealReducer = appealSlice.reducer;
