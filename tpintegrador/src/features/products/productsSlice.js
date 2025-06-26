import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Productos locales (los 3 que tienes en initialState)
const localProducts = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    images: [
      "https://i.pinimg.com/736x/ad/d1/45/add145de6802768b6cdb86418fe33f6e.jpg",
      "https://i.pinimg.com/736x/51/f0/91/51f0919fb3a74a83dcd041b33ca5bb94.jpg",
      "https://i.pinimg.com/736x/8f/3c/ee/8f3cee3169a38309256506276c0c01e9.jpg"
    ],
    price: 40000,
    description: "Auriculares inalámbricos con cancelación de ruido.",
    category: "Tecnología"
  },
  {
    id: 2,
    name: "Cámara Fotográfica",
    images: [
      "https://i.pinimg.com/736x/d1/ce/ae/d1ceae4a41c7a0318c28c5f661f10b74.jpg",
      "https://i.pinimg.com/736x/b0/91/de/b091deba4d338d4a4275497f879ea117.jpg",
      "https://i.pinimg.com/736x/61/7e/9a/617e9a787c2421a2f2a499e761c98b11.jpg"
    ],
    price: 120000,
    description: "Cámara réflex digital de alta resolución.",
    category: "Fotografía"
  },
  {
    id: 3,
    name: "Zapatillas Running",
    images: [
      "https://i.pinimg.com/736x/e1/d9/6e/e1d96e4c14ffb0201e4166e9dc5a67ab.jpg",
      "https://i.pinimg.com/736x/c8/89/a4/c889a45664f2ba4a9142fbaa6c2812e2.jpg",
      "https://i.pinimg.com/736x/4a/40/47/4a40470565ab40946e97c222f9c39578.jpg"
    ],
    price: 25000,
    description: "Zapatillas deportivas para correr largas distancias.",
    category: "Deportes"
  }
];

// Acción asíncrona para cargar productos desde la API y sumar los locales
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    const apiProducts = data.map(item => ({
      id: item.id + 1000,
      name: item.title,
      images: [item.image],
      price: item.price,
      description: item.description,
      category: item.category,
    }));

    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

    // IDs de productos locales y de la API
    const localIds = localProducts.map(p => p.id);
    const apiIds = apiProducts.map(p => p.id);

    // Mezclar productos locales editados
    const mergedLocals = localProducts.map(local =>
      customProducts.find(p => p.id === local.id) || local
    );
    // Mezclar productos de la API editados
    const mergedApi = apiProducts.map(api =>
      customProducts.find(p => p.id === api.id) || api
    );
    // Productos agregados por el usuario
    const userProducts = customProducts.filter(
      p => !localIds.includes(p.id) && !apiIds.includes(p.id)
    );

    return [...mergedLocals, ...userProducts, ...mergedApi];
  }
);

const initialState = {
  items: [
    {
      id: 1,
      name: "Auriculares Bluetooth",
      images: [
        "https://i.pinimg.com/736x/ad/d1/45/add145de6802768b6cdb86418fe33f6e.jpg",
        "https://i.pinimg.com/736x/51/f0/91/51f0919fb3a74a83dcd041b33ca5bb94.jpg",
        "https://i.pinimg.com/736x/8f/3c/ee/8f3cee3169a38309256506276c0c01e9.jpg"
      ],
      price: 40000,
      description: "Auriculares inalámbricos con cancelación de ruido.",
      category: "Tecnología"
    },
    {
      id: 2,
      name: "Cámara Fotográfica",
      images: [
        "https://i.pinimg.com/736x/d1/ce/ae/d1ceae4a41c7a0318c28c5f661f10b74.jpg",
        "https://i.pinimg.com/736x/b0/91/de/b091deba4d338d4a4275497f879ea117.jpg",
        "https://i.pinimg.com/736x/61/7e/9a/617e9a787c2421a2f2a499e761c98b11.jpg"
      ],
      price: 120000,
      description: "Cámara réflex digital de alta resolución.",
      category: "Fotografía"
    },
    {
      id: 3,
      name: "Zapatillas Running",
      images: [
        "https://i.pinimg.com/736x/e1/d9/6e/e1d96e4c14ffb0201e4166e9dc5a67ab.jpg",
        "https://i.pinimg.com/736x/c8/89/a4/c889a45664f2ba4a9142fbaa6c2812e2.jpg",
        "https://i.pinimg.com/736x/4a/40/47/4a40470565ab40946e97c222f9c39578.jpg"
      ],
      price: 25000,
      description: "Zapatillas deportivas para correr largas distancias.",
      category: "Deportes"
    }
  ],
  favorites: [], // <-- Nuevo estado para favoritos
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      // Guarda solo los productos agregados por el usuario (por ejemplo, con id > 10000)
      const customProducts = state.items.filter(p => p.id > 10000);
      localStorage.setItem('customProducts', JSON.stringify(customProducts));
    },
    editProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        // Guarda en LocalStorage los productos locales (id <= 10000) y los agregados (id > 10000)
        const customProducts = state.items.filter(p => p.id <= 10000 || p.id > 10000);
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.favorites = state.favorites.filter(fid => fid !== action.payload);
      // Actualiza LocalStorage para que no vuelva a aparecer al recargar
      const customProducts = state.items.filter(p => p.id > 10000);
      localStorage.setItem('customProducts', JSON.stringify(customProducts));
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct, editProduct, deleteProduct, addFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;