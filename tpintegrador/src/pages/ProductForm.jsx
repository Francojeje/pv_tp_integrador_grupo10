import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct, deleteProduct } from '../features/products/productsSlice';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const productToEdit = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEditing && productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setStock(productToEdit.stock || '');
      setImagePreview(productToEdit.image);
    }
  }, [isEditing, productToEdit]);

  // Al cambiar archivo, guardo y genero preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    // Crear nuevo id (simple, máximo +1)
    const newId = isEditing
      ? productToEdit.id
      : Math.max(0, ...useSelector(state => state.products.items.map(p => p.id))) + 1;

    // Para la imagen, si cargaste archivo, usaremos el preview (base64)
    const image = imagePreview || '';

    const productData = {
      id: newId,
      name,
      price: Number(price),
      description,
      category,
      stock: stock ? Number(stock) : undefined,
      image,
    };

    if (isEditing) {
      dispatch(editProduct(productData));
      alert('Producto editado');
    } else {
      dispatch(addProduct(productData));
      alert('Producto agregado');
    }
    navigate('/');
  };

  // Eliminar producto (solo si es edición)
  const handleDelete = () => {
    if (window.confirm('¿Querés eliminar este producto?')) {
      dispatch(deleteProduct(productToEdit.id));
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Precio"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          margin="normal"
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <input
            accept="image/*"
            type="file"
            id="upload-image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button variant="outlined" component="span">
              {imagePreview ? 'Cambiar Foto' : 'Agregar Foto'}
            </Button>
          </label>
          {imagePreview && (
            <Box sx={{ mt: 2 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
          {isEditing && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              fullWidth
            >
              Eliminar
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ProductForm;
