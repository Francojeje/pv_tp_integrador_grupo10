import { createSlice } from '@reduxjs/toolkit';
const savedAuth = JSON.parse(localStorage.getItem('auth'));
const savedUsers =
  JSON.parse(localStorage.getItem('users')) || [
    { email: 'admin@example.com', password: '1234' },
  ];

const initialState = savedAuth || {
  isAuthenticated: false,
  user: null,            // { email }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;

      // Verificamos las credenciales contra la lista almacenada
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        throw new Error('Credenciales incorrectas');
      }

      state.isAuthenticated = true;
      state.user = { email };
      localStorage.setItem('auth', JSON.stringify(state));
    },

    /* ---------- LOGOUT ---------- */
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },

    /* ---------- REGISTER ---------- */
    register(state, action) {
      const { email, password } = action.payload;

      // 1) Validar que no exista ese email
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const exists = users.some((u) => u.email === email);
      if (exists) {
        throw new Error('El correo ya está registrado');
      }

      // 2) Guardar el usuario nuevo
      const updatedUsers = [...users, { email, password }];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // 3) Iniciar sesión automáticamente
      state.isAuthenticated = true;
      state.user = { email };
      localStorage.setItem('auth', JSON.stringify(state));
    },
  },
});

/* ----------------------------- exports ------------------------------------ */
export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
