import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import categoriesReducer from './categorySlice';
import cartReducer from './Cart/slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});