import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async () => {
    const { data } = await axios.get("/applications");
    return data;
  }
);

export const fetchOptions = createAsyncThunk(
  "application/fetchOptions",
  async () => {
    const { data } = await axios.get("/application/options");
    return data;
  }
);

const initialState = {
  items: [],
  options: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        // state.items = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchApplications.rejected, (state) => {
        // state.items = null;
      })
      .addCase(fetchOptions.pending, (state) => {
        // state.items = null;
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(fetchOptions.rejected, (state) => {
        // state.items = null;
      });
  },
});
export const selectApplications = (state) => state.application.items;
export const selectOptions = (state) => state.application.options;

export const applicationReducer = applicationSlice.reducer;
