import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { addFavorite, removeFavorite } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );
  const favorites = useSelector(state => state.products.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Cambia de imagen automáticamente cada 2.5 segundos
  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % product.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [product.images]);

  const handlePrev = () => {
    setCurrent(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % product.images.length);
  };

  if (!product) {
    return (
      <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Producto no encontrado.</Typography>
      </Container>
    );
  }

  const isFavorite = favorites.includes(product.id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product.id));
    }
  };

  const handleAddToCart = () => {
    const productForCart = {
      ...product,
      image: (product.images && product.images.length > 0)
        ? product.images[0]
        : (product.image || "https://via.placeholder.com/180"),
    };
    dispatch(addToCart(productForCart));
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
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Imágenes a la izquierda */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {product.images && product.images.length > 0 ? (
              <Box sx={{ width: 320, position: 'relative' }}>
                <img
                  src={product.images[current]}
                  alt={`Imagen ${current + 1}`}
                  style={{ borderRadius: 12, objectFit: 'cover', width: '100%', height: 320 }}
                />
                {product.images.length > 1 && (
                  <>
                    <Button
                      onClick={handlePrev}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        minWidth: 0,
                        px: 1,
                      }}
                    >
                      &#8592;
                    </Button>
                    <Button
                      onClick={handleNext}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        minWidth: 0,
                        px: 1,
                      }}
                    >
                      &#8594;
                    </Button>
                  </>
                )}
              </Box>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '320px', borderRadius: 12 }}
              />
            )}
          </Box>
        </Grid>
        {/* Características a la derecha */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Descripción:</strong> {product.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Categoría:</strong> {product.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Precio:</strong> ${product.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Stock:</strong> {product.stock ?? 'No especificado'}
          </Typography>
          {/* Calificación */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Calificación:</strong>
            </Typography>
            <Rating
              name="read-only"
              value={product.rating || 0}
              precision={0.5}
              readOnly
              sx={{ mb: 2 }}
            />
          </Box>
          {/* Botones */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <IconButton onClick={handleFavorite} color={isFavorite ? "error" : "default"}>
              <FavoriteIcon />
            </IconButton>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/editar/${product.id}`)}
            >
              Editar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;