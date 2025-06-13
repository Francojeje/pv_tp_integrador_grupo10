import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

function ProductCard({ product, onFavorite, isFavorite, onViewDetail }) {
  return (
    <Card
      sx={{
        maxWidth: 340,
        minHeight: 420,
        m: 'auto',
        borderRadius: 4,
        boxShadow: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.image || "https://via.placeholder.com/180"}
        alt={product.name}
        sx={{ objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
        <IconButton onClick={() => onFavorite(product.id)} color={isFavorite ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;