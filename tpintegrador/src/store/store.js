import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice'; // <-- Importa el slice del carrito
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // <-- Agrega el reducer del carrito
     auth: authReducer,
  },
});