import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { addFavorite, removeFavorite } from '../features/products/productsSlice';
import EditIcon from '@mui/icons-material/Edit';

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );
  const favorites = useSelector(state => state.products.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Producto no encontrado.</Typography>
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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: '300px', marginBottom: '20px' }}
      />
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
      <IconButton onClick={handleFavorite} color={isFavorite ? "error" : "default"}>
        <FavoriteIcon />
      </IconButton>
      <Button sx={{ ml: 2 }} variant="outlined" onClick={() => navigate(-1)}>
        Volver
      </Button>
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => navigate(`/editar/${product.id}`)}
      >
        Editar
      </Button>
    </Container>
  );
}

export default ProductDetail;