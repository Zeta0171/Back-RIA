const fs = require('fs');
const path = require('path');

// Función para convertir una imagen a base64
const imageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'base64' });
};

// Ruta de las imágenes
const imagesDir = path.join(__dirname, '../imagenes');

let productos = [
  { 
    id: 1, 
    nombre: 'Sándwich de Jamón y Queso', 
    descripcion: 'Sándwich clásico', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'sandwich-de-huevo-con-jamon-y-queso.jpg'))}`, 
    precio: 250.00, 
    insumos: [
      { insumoId: 2, cantidad: 5 }, 
      { insumoId: 3, cantidad: 8 }, 
      { insumoId: 1, cantidad: 2 } 
    ], 
    borrado: false 
  },
  { 
    id: 2, 
    nombre: 'Sándwich Olímpico', 
    descripcion: 'Sándwich con múltiples capas', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'sandwich-olimpico.jpg'))}`, 
    precio: 350.00, 
    insumos: [
      { insumoId: 2, cantidad: 10 }, 
      { insumoId: 3, cantidad: 6 },   
      { insumoId: 1, cantidad: 3 },
      { insumoId: 4, cantidad: 4 },
      { insumoId: 5, cantidad: 2 },
      { insumoId: 6, cantidad: 3 },
      { insumoId: 7, cantidad: 5 },
    ], 
    borrado: false 
  },
  { 
    id: 3, 
    nombre: 'Budín', 
    descripcion: 'Budín clásico', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'budin.webp'))}`, 
    precio: 200.00, 
    insumos: [
      { insumoId: 9, cantidad: 200 },     // Harina (entre 1 y 15 gramos)
      { insumoId: 10, cantidad: 100 },    // Azúcar (entre 1 y 15 gramos)
      { insumoId: 11, cantidad: 300 },    // Leche (entre 1 y 15 mililitros)
      { insumoId: 12, cantidad: 5 },      // Esencia de vainilla (entre 1 y 15 mililitros)
      { insumoId: 13, cantidad: 2 },      // Polvo de hornear (entre 1 y 15 gramos)
      { insumoId: 14, cantidad: 3 },      // Limón (entre 1 y 15 unidades)
      { insumoId: 15, cantidad: 50 },     // Pasas (entre 1 y 15 gramos)
      { insumoId: 16, cantidad: 30 },     // Frutas confitadas (entre 1 y 15 gramos)
      { insumoId: 17, cantidad: 10 },     // Almendras (entre 1 y 15 gramos)
      { insumoId: 18, cantidad: 8 }       // Nueces (entre 1 y 15 gramos)
    ], 
    borrado: false 
  },
  { 
    id: 4, 
    nombre: 'Pan Dulce', 
    descripcion: 'Pan dulce navideño', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'panettone.jpg'))}`, 
    precio: 300.00, 
    insumos: [
      { insumoId: 9, cantidad: 300 },     // Harina (entre 1 y 15 gramos)
      { insumoId: 10, cantidad: 150 },    // Azúcar (entre 1 y 15 gramos)
      { insumoId: 11, cantidad: 250 },    // Leche (entre 1 y 15 mililitros)
      { insumoId: 12, cantidad: 8 },      // Esencia de vainilla (entre 1 y 15 mililitros)
      { insumoId: 13, cantidad: 3 },      // Polvo de hornear (entre 1 y 15 gramos)
      { insumoId: 14, cantidad: 5 },      // Limón (entre 1 y 15 unidades)
      { insumoId: 15, cantidad: 80 },     // Pasas (entre 1 y 15 gramos)
      { insumoId: 16, cantidad: 40 },     // Frutas confitadas (entre 1 y 15 gramos)
      { insumoId: 17, cantidad: 12 },     // Almendras (entre 1 y 15 gramos)
      { insumoId: 18, cantidad: 10 }      // Nueces (entre 1 y 15 gramos)
    ], 
    borrado: false 
  }
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

