import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { applicationReducer } from "./slices/application";
import { addressReducer } from "./slices/address";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    address: addressReducer,
  },
});

export default store;
