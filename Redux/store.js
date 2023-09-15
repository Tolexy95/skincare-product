// store.js
"use client"
// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;


