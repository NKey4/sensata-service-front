import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async () => {
    const { data } = await axios.get("/applications");
    return data;
  }
);

const initialState = {
  items: [],
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
      });
  },
});
export const selectApplications = (state) => state.application.items;

export const applicationReducer = applicationSlice.reducer;
