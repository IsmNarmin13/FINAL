import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartQuantity: 0,
  },
  reducers: {
    updateCartQuantity: (state, action) => {
      state.cartQuantity = action.payload;
    },

    addToCartAction: (state, action) => {
      const { id, title, imageUrl, author, regularPrice, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ id, title, imageUrl, author, regularPrice, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));

      const totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.cartQuantity = totalQuantity;
    },
    
    removeFromCartAction: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);

      localStorage.setItem('cart', JSON.stringify(state.cartItems));

      const totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.cartQuantity = totalQuantity;
    },

    updateQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));

      const totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.cartQuantity = totalQuantity;
    },
  }
});

export const { updateCartQuantity, addToCartAction, removeFromCartAction, updateQuantityAction } = cartSlice.actions;
export default cartSlice.reducer;