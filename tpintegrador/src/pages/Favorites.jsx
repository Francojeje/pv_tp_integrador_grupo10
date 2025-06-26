import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from '../components/ProductCard';
import { removeFavorite } from '../features/products/productsSlice';
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
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        py: 6,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Mis Favoritos
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {favoriteProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ m: 2, textAlign: 'center' }}>
              No tienes productos favoritos.
            </Typography>
          </Grid>
        ) : (
          favoriteProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
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