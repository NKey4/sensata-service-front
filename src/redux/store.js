import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { applicationReducer } from "./slices/application";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
  },
});

export default store;
