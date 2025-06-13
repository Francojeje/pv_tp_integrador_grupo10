import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/ad/d1/45/add145de6802768b6cdb86418fe33f6e.jpg",
      name: "Auriculares Bluetooth",
      price: 40000,
      description: "Auriculares inalámbricos con cancelación de ruido.",
      category: "Tecnología"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/d1/ce/ae/d1ceae4a41c7a0318c28c5f661f10b74.jpg",
      name: "Cámara Fotográfica",
      price: 120000,
      description: "Cámara réflex digital de alta resolución.",
      category: "Fotografía"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/e1/d9/6e/e1d96e4c14ffb0201e4166e9dc5a67ab.jpg",
      name: "Zapatillas Running",
      price: 25000,
      description: "Zapatillas deportivas para correr largas distancias.",
      category: "Deportes"
    }
  ],
  favorites: [], // <-- Nuevo estado para favoritos
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.favorites = state.favorites.filter(fid => fid !== action.payload);
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fid => fid !== action.payload);
    },
  },
});

export const { addProduct, editProduct, deleteProduct, addFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;