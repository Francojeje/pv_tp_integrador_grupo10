import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function Register() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones mínimas
    if (!email || !password) return alert('Todos los campos son obligatorios');
    if (password !== confirm) return alert('Las contraseñas no coinciden');

    // Verificar si el mail ya existe
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(u => u.email === email)) {
      return alert('Ese correo ya está registrado');
    }

    dispatch(register({ email, password }));
    navigate('/');               // Ya entra logueado
  };

  return (
    <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>Crear cuenta</Typography>

      <form onSubmit={handleSubmit} style={{ width: 300 }}>
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
        <TextField
          label="Repetir contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Registrarme
        </Button>
        <Button component={Link} to="/login" fullWidth sx={{ mt: 1 }}>
          Ya tengo cuenta
        </Button>
      </form>
    </Box>
  );
}

export default Register;
