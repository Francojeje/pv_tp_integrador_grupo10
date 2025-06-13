import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from '../components/ProductCard';
import { addFavorite, removeFavorite } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const products = useSelector(state => state.products.items);
  const favorites = useSelector(state => state.products.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const handleFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  const handleViewDetail = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>
      <Grid container spacing={2}>
        {favoriteProducts.length === 0 ? (
          <Typography variant="body1" sx={{ m: 2 }}>
            No tienes productos favoritos.
          </Typography>
        ) : (
          favoriteProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                onFavorite={handleFavorite}
                isFavorite={true}
                onViewDetail={handleViewDetail}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Favorites;