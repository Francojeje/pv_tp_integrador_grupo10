import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct, deleteProduct } from '../features/products/productsSlice';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const productToEdit = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );
  const products = useSelector(state => state.products.items);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]); // array de imágenes (base64)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setStock(productToEdit.stock || '');
      setImages(productToEdit.images || []);
    }
  }, [isEditing, productToEdit]);

  // Manejar carga de múltiples imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size < 2 * 1024 * 1024); // <2MB
    const readers = validFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(imgs => setImages(prev => [...prev, ...imgs]));
  };

  // Eliminar imagen del array
  const handleRemoveImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  // Validación simple
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!price || Number(price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!description) newErrors.description = 'La descripción es obligatoria';
    if (!category) newErrors.category = 'La categoría es obligatoria';
    if (images.length === 0) newErrors.images = 'Agrega al menos una imagen';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newId = isEditing
      ? productToEdit.id
      : 10000 + products.filter(p => p.id > 10000).length + 1;

    const productData = {
      id: newId,
      name,
      price: Number(price),
      description,
      category,
      stock: stock !== '' ? Number(stock) : undefined,
      images,
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
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
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
          error={!!errors.price}
          helperText={errors.price}
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
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={!!errors.category}
          helperText={errors.category}
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

        {/* Imágenes */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <input
            accept="image/*"
            type="file"
            id="upload-image"
            style={{ display: 'none' }}
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button
              variant="outlined"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
              color={errors.images ? "error" : "primary"}
            >
              {images.length > 0 ? 'Agregar más fotos' : 'Agregar fotos'}
            </Button>
          </label>
          {errors.images && (
            <Typography variant="caption" color="error" sx={{ ml: 2 }}>
              {errors.images}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            {images.map((img, idx) => (
              <Box key={idx} sx={{ position: 'relative' }}>
                <img
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveImage(idx)}
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
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
