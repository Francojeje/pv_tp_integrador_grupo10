import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from '../components/ProductCard';
import { addFavorite, removeFavorite, fetchProducts } from '../features/products/productsSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useInView } from 'react-intersection-observer';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const favorites = useSelector(state => state.products.favorites);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // Cantidad inicial de productos visibles

  // Scroll infinito: cuando el sentinel está en vista, carga más productos
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && visibleCount < filteredProducts.length) {
      setVisibleCount((prev) => prev + 8);
    }
    // eslint-disable-next-line
  }, [inView]);

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

  // Filtrar productos según búsqueda
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Reiniciar scroll infinito si cambia la búsqueda
  useEffect(() => {
    setVisibleCount(8);
  }, [search]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Catálogo de Producto
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Explora nuestro catálogo, busca por nombre y marca tus productos favoritos. ¡Haz clic en "Agregar Producto" para sumar uno nuevo! 🚀
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%", maxWidth: 800 }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ flex: 1, bgcolor: 'background.paper' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            height: 56,
            fontWeight: 600,
            fontSize: 16,
            boxShadow: 2,
            whiteSpace: 'nowrap',
            ml: 2,
          }}
          onClick={() => navigate('/crear')}
        >
          Agregar Producto
        </Button>
      </Box>
      <Grid container spacing={4}>
        {filteredProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ m: 2, textAlign: 'center', color: 'text.secondary' }}>
              No hay productos para mostrar.
            </Typography>
          </Grid>
        ) : (
          visibleProducts.map(product => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
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
      {/* Sentinel para scroll infinito */}
      {visibleCount < filteredProducts.length && (
        <Box ref={ref} sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Cargando más productos...
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Home;