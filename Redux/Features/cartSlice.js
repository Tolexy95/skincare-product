"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Items: [], // Array of items in the cart
  totalQuantity: 0, // Add a field for total quantity// Total quantity of items in the cart
  totalPrice: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.Items.findIndex(item => item.id === newItem.id);
    
      if (existingItemIndex !== -1) {
        // Product already exists, update its quantity
        state.Items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Product doesn't exist, add it as a new item
        state.Items.push(newItem);
      }
    
      // Increment the total quantity
      state.totalQuantity += newItem.quantity;
    },
    
    
   
  
    removeFromCart: (state, action) => {
      
    },
    
    increaseQuantity: (state, action) => {
      
    },
    
    decreaseQuantity: (state, action) => {
      
    },
    
  },    
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
