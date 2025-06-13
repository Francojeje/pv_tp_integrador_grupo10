import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ProductDetail from '../pages/ProductDetail';
import ProductForm from '../pages/ProductForm';
import Favorites from '../pages/Favorites';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/crear" element={<ProductForm />} />
      <Route path="/editar/:id" element={<ProductForm />} />
      <Route path="/favoritos" element={<Favorites />} />
    </Routes>
  );
}

export default AppRoutes;