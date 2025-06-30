import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === '1234') {
      dispatch(login({ email }));
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField
          label="Correo"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
        <Button component={Link} to="/registro" fullWidth sx={{ mt: 1 }}>
         Crear cuenta
          </Button>

      </form>
    </Box>
  );
}

export default Login;
