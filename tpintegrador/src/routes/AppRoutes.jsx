// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* Páginas */
import Home          from '../pages/Home';
import Favorites     from '../pages/Favorites';
import ProductDetail from '../pages/ProductDetail';
import ProductForm   from '../pages/ProductForm';
import Cart          from '../pages/Cart';
import Login         from '../pages/Login';
import Register      from '../pages/Register';   // <-- NUEVO

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Rutas públicas (solo si NO está autenticado) */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/registro"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/favoritos"
        element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
      />
      <Route
        path="/producto/:id"
        element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />}
      />
      <Route
        path="/crear"
        element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/editar/:id"
        element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/carrito"
        element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
      />

      {/* Catch‑all → redirige según autenticación */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/' : '/login'} />}
      />
    </Routes>
  );
}

export default AppRoutes;
