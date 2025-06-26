import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ColorModeContext } from '../context/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // Obtener la cantidad total de productos en el carrito
  const cartCount = useSelector(state =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const favoritesCount = useSelector(state => state.products.favorites.length);

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <IconButton color="inherit" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>
        <IconButton color="inherit" onClick={() => navigate('/favoritos')}>
          <Badge badgeContent={favoritesCount} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/carrito')}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;