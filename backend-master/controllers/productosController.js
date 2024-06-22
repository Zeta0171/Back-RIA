const fs = require('fs');
const path = require('path');

// Función para convertir una imagen a base64
const imageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'base64' });
};

// Ruta de las imágenes
const imagesDir = path.join(__dirname, '../imagenes');

let productos = [
  { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'galletita.jpg.webp'))}`, precio: 10.0, insumos: [{ insumoId: 1, cantidad: 2 }, { insumoId: 2, cantidad: 1 }], borrado: false },
  { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'images.jpg'))}`, precio: 20.0, insumos: [{ insumoId: 3, cantidad: 4 }], borrado: false },
  { id: 3, nombre: 'Producto 3', descripcion: 'Descripción 3', imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'pan-papa-web-3.webp'))}`, precio: 25.0, insumos: [], borrado: true }
];

exports.getProductos = (req, res) => {
  res.json(productos);
};

// Nueva función para listar solo los productos no borrados
exports.getProductosActivos = (req, res) => {
  const productosActivos = productos.filter(p => !p.borrado);
  res.json(productosActivos);
};

exports.getProductoById = (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id == id && !p.borrado);
  if (producto) {
      res.json(producto);
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
};

exports.createProducto = (req, res) => {
  const newProducto = req.body;
  newProducto.id = productos.length ? productos[productos.length - 1].id + 1 : 1;
  newProducto.insumos = newProducto.insumos || [];
  newProducto.borrado = false;
  productos.push(newProducto);
  res.status(201).json(newProducto);
};

exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const updatedProducto = req.body;
  const productoIndex = productos.findIndex(p => p.id == id && !p.borrado);
  if (productoIndex !== -1) {
      productos[productoIndex] = { ...productos[productoIndex], ...updatedProducto };
      res.json(productos[productoIndex]);
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
};

exports.deleteProducto = (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex(p => p.id == id && !p.borrado);
  if (productoIndex !== -1) {
      productos[productoIndex].borrado = true;
      res.json({ message: 'Producto borrado lógicamente' });
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
};

exports.activateProducto = (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex(p => p.id == id && p.borrado);
  if (productoIndex !== -1) {
      productos[productoIndex].borrado = false;
      res.json(productos[productoIndex]);
  } else {
      res.status(404).json({ message: 'Producto no encontrado o ya activo' });
  }
};

