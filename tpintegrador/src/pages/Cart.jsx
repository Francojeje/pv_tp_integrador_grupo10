import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { removeFromCart, changeQuantity, clearCart } from '../features/cart/cartSlice';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(changeQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        Carrito de Compras
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          El carrito está vacío.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map(item => (
              <Grid item xs={12} key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price} x
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${item.price * item.quantity}
                  </Typography>
                  <IconButton color="error" onClick={() => handleRemove(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="outlined" color="error" onClick={handleClearCart}>
              Vaciar Carrito
            </Button>
            <Typography variant="h6" fontWeight={700}>
              Total: ${total}
            </Typography>
            <Button variant="contained" color="primary" disabled>
              Finalizar Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;