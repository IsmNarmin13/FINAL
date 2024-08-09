import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import bookmarkReducer from './slices/bookmarkSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    bookmark: bookmarkReducer,
  },
});

export default store;