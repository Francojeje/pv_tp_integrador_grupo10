import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

function ProductCard({ product, onFavorite, isFavorite, onViewDetail }) {
  const dispatch = useDispatch();

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
    <Card
      sx={{
        width: 320,         // Cambia este valor para hacer la card más ancha
        minHeight: 400,     // Cambia este valor para hacer la card más alta
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        image={product.images ? product.images[0] : product.image}
        alt={product.name}
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          background: '#f4f4f4',
          borderRadius: '16px 16px 0 0',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxHeight: 48,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700 }}>
          ${product.price}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Categoría: {product.category}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Button size="small" variant="contained" color="primary" onClick={() => onViewDetail(product.id)}>
          Ver más
        </Button>
        <Button size="small" variant="contained" color="success" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        <IconButton onClick={() => onFavorite(product.id)} color={isFavorite ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;