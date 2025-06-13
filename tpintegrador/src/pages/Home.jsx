import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from '../components/ProductCard';
import { addFavorite, removeFavorite } from '../features/products/productsSlice';

function Home() {
  const products = useSelector(state => state.products.items);
  const favorites = useSelector(state => state.products.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          textAlign: 'center',
          mb: 4,
        }}
      >
        Lista de Productos
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ m: 2, textAlign: 'center' }}>
              No hay productos para mostrar.
            </Typography>
          </Grid>
        ) : (
          products.map(product => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard
                product={product}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(product.id)}
                onViewDetail={handleViewDetail}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Home;