import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchSendCode = createAsyncThunk(
  "auth/fetchSendCode",
  async (params) => {
    const { data } = await axios.post("/auth/sendCode", params);
    return data;
  }
);

export const fetchAliceCode = createAsyncThunk(
  "auth/fetchAliceCode",
  async () => {
    const { data } = await axios.get("/alice/sendCode");
    return data;
  }
);

export const fetchCheckCode = createAsyncThunk(
  "auth/fetchCheckCode",
  async (params) => {
    const { data } = await axios.post("/auth/checkCode", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthMe.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
      })
      .addCase(fetchSendCode.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchSendCode.fulfilled, (state, action) => {
        // state.data = null;
      })
      .addCase(fetchSendCode.rejected, (state) => {
        // state.data = null;
      })
      .addCase(fetchAliceCode.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchAliceCode.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAliceCode.rejected, (state) => {
        // state.data = null;
      })
      .addCase(fetchCheckCode.pending, (state) => {
        // state.data = null;
      })
      .addCase(fetchCheckCode.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchCheckCode.rejected, (state) => {
        // state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectUserData = (state) => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
