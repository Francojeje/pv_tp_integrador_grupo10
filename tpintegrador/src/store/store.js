import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice'; // <-- Importa el slice del carrito

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // <-- Agrega el reducer del carrito
  },
});