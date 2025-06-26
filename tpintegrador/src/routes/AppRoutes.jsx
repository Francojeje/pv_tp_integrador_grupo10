import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Favorites from '../pages/Favorites';
import ProductDetail from '../pages/ProductDetail';
import ProductForm from '../pages/ProductForm';
import Cart from '../pages/Cart'; // <-- Importa la página del carrito

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favorites />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/crear" element={<ProductForm />} />
      <Route path="/editar/:id" element={<ProductForm />} />
      <Route path="/carrito" element={<Cart />} /> {/* <-- Agrega esta línea */}
    </Routes>
  );
}

export default AppRoutes;