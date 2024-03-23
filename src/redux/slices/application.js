import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchSendCode = createAsyncThunk(
  "auth/fetchSendCode",
  async (params) => {
    const { data } = await axios.post("/sendCode", params);
    return data;
  }
);

export const fetchCheckCode = createAsyncThunk(
  "auth/fetchCheckCode",
  async (params) => {
    const { data } = await axios.post("/checkCode", params);
    return data;
  }
);

export const fetchApplications = createAsyncThunk(
  "auth/fetchApplications",
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

export const applicationReducer = applicationSlice.reducer;

export const { logout } = applicationSlice.actions;
