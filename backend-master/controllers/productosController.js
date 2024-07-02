const fs = require('fs');
const path = require('path');

const imageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'base64' });
};

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
      { insumoId: 9, cantidad: 200 },
      { insumoId: 10, cantidad: 100 },
      { insumoId: 11, cantidad: 300 },
      { insumoId: 12, cantidad: 5 },
      { insumoId: 13, cantidad: 2 },
      { insumoId: 14, cantidad: 3 },
      { insumoId: 15, cantidad: 50 },
      { insumoId: 16, cantidad: 30 },
      { insumoId: 17, cantidad: 10 },
      { insumoId: 18, cantidad: 8 }
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
      { insumoId: 9, cantidad: 300 },
      { insumoId: 10, cantidad: 150 },
      { insumoId: 11, cantidad: 250 },
      { insumoId: 12, cantidad: 8 },
      { insumoId: 13, cantidad: 3 },
      { insumoId: 14, cantidad: 5 },
      { insumoId: 15, cantidad: 80 },
      { insumoId: 16, cantidad: 40 },
      { insumoId: 17, cantidad: 12 },
      { insumoId: 18, cantidad: 10 }
    ], 
    borrado: false 
  },
  { 
    id: 5, 
    nombre: 'Jesuitas', 
    descripcion: 'Jesuitas con jamón y queso', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'Jesuitas.jpg'))}`, 
    precio: 400.00, 
    insumos: [
      { insumoId: 19, cantidad: 2 },  // Harina de trigo (500g)
      { insumoId: 2, cantidad: 20 },  // Jamón cocido en lonchas (200g)
      { insumoId: 3, cantidad: 20 },  // Queso en lonchas (200g)
      { insumoId: 20, cantidad: 2 },  // Huevos duros (3 unidades)
      { insumoId: 21, cantidad: 2 },  // Azúcar glas (200g)
      { insumoId: 14, cantidad: 2 }   // Zumo de limón (2 cucharadas)
    ], 
    borrado: false 
  },
  { 
    id: 6, 
    nombre: 'Turrón Blanco con Maní', 
    descripcion: 'Turrón blanco con maní', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'TurronBlanco.jpg'))}`, 
    precio: 500.00, 
    insumos: [
      { insumoId: 22, cantidad: 200 },  // Maní tostado y pelado (200g)
      { insumoId: 10, cantidad: 100 },  // Azúcar (100g)
      { insumoId: 23, cantidad: 100 },  // Miel (100g)
      { insumoId: 19, cantidad: 2 },    // Claras de huevo (2 unidades)
      { insumoId: 12, cantidad: 1 },    // Esencia de vainilla (1 cucharadita)
      { insumoId: 24, cantidad: 50 }    // Papel de arroz (opcional)
    ], 
    borrado: false 
  },
  { 
    id: 7, 
    nombre: 'Turrón de Chocolate con Maní', 
    descripcion: 'Turrón de chocolate con maní', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'TurronNegro.jpg'))}`, 
    precio: 550.00, 
    insumos: [
      { insumoId: 25, cantidad: 300 },  // Chocolate negro (300g)
      { insumoId: 22, cantidad: 200 },  // Maní tostado y pelado (200g)
      { insumoId: 10, cantidad: 100 },  // Azúcar (100g)
      { insumoId: 4, cantidad: 50 },    // Manteca de cacao (50g)
      { insumoId: 12, cantidad: 1 }     // Esencia de vainilla (1 cucharadita)
    ], 
    borrado: false 
  },
  {
    id: 8, 
    nombre: 'Tarta de Fiambre', 
    descripcion: 'Tarta rellena de jamón y queso', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'TartaFiambre.jpg'))}`, 
    precio: 450.00, 
    insumos: [
      { insumoId: 26, cantidad: 400 },  // Masa para tarta (400g)
      { insumoId: 2, cantidad: 200 },   // Jamón (200g)
      { insumoId: 3, cantidad: 200 },   // Queso (200g)
      { insumoId: 4, cantidad: 100 },   // Manteca (100g)
      { insumoId: 19, cantidad: 3 },    // Huevos crudos (3 unidades)
      { insumoId: 27, cantidad: 1 }     // Crema de leche (1 taza)
    ], 
    borrado: false 
  },
  {
    id: 9, 
    nombre: 'Pizza Rellena', 
    descripcion: 'Pizza rellena con múltiples ingredientes', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'PizzaRellena.jpg'))}`, 
    precio: 600.00, 
    insumos: [
      { insumoId: 28, cantidad: 500 },  // Masa para pizza (500g)
      { insumoId: 2, cantidad: 150 },   // Jamón (150g)
      { insumoId: 3, cantidad: 150 },   // Queso (150g)
      { insumoId: 6, cantidad: 2 },     // Tomates (2 unidades)
      { insumoId: 7, cantidad: 5 },     // Hojas de lechuga (5 hojas)
      { insumoId: 8, cantidad: 50 },    // Mayonesa (50g)
      { insumoId: 29, cantidad: 200 }   // Salsa de tomate (200g)
    ], 
    borrado: false 
  },

  {
    id: 10, 
    nombre: 'Pascualina', 
    descripcion: 'Pascualina de acelga y ricota', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'Pascualina.jpg'))}`, 
    precio: 500.00, 
    insumos: [
      { insumoId: 26, cantidad: 500 },  // Masa para tarta (500g)
      { insumoId: 30, cantidad: 300 },  // Acelga (300g)
      { insumoId: 31, cantidad: 200 },  // Ricota (200g)
      { insumoId: 19, cantidad: 4 },    // Huevos crudos (4 unidades)
      { insumoId: 27, cantidad: 1 },    // Crema de leche (1 taza)
      { insumoId: 4, cantidad: 50 }     // Manteca (50g)
    ], 
    borrado: false 
  },

  {
    id: 11, 
    nombre: 'Masas Finas Surtidas (kg)', 
    descripcion: 'Variedad de masas finas', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'MasasFinasSurtidas.jpg'))}`, 
    precio: 900.00, 
    insumos: [
      { insumoId: 32, cantidad: 200 },  // Masa de hojaldre (200g)
      { insumoId: 33, cantidad: 150 },  // Crema pastelera (150g)
      { insumoId: 34, cantidad: 100 },  // Chocolate (100g)
      { insumoId: 35, cantidad: 50 },   // Dulce de leche (50g)
      { insumoId: 36, cantidad: 50 },   // Frutas confitadas (50g)
      { insumoId: 37, cantidad: 30 }    // Almendras (30g)
    ], 
    borrado: false 
  },

  {
    id: 12, 
    nombre: 'Tarta Chivito', 
    descripcion: 'Tarta con carne, jamón, queso y más', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'TartaChivito.jpg'))}`, 
    precio: 500.00, 
    insumos: [
      { insumoId: 26, cantidad: 400 },  // Masa para tarta (400g)
      { insumoId: 2, cantidad: 150 },   // Jamón (150g)
      { insumoId: 3, cantidad: 150 },   // Queso (150g)
      { insumoId: 38, cantidad: 200 },  // Carne (200g)
      { insumoId: 4, cantidad: 100 },   // Manteca (100g)
      { insumoId: 6, cantidad: 2 },     // Tomates (2 unidades)
      { insumoId: 19, cantidad: 3 },    // Huevos crudos (3 unidades)
      { insumoId: 27, cantidad: 1 }     // Crema de leche (1 taza)
    ], 
    borrado: false 
  },

  {
    id: 13, 
    nombre: 'Pizza con Salsa', 
    descripcion: 'Pizza con salsa de tomate y queso', 
    imagen: `data:image/png;base64,${imageToBase64(path.join(imagesDir, 'Pizza.jpg'))}`, 
    precio: 350.00, 
    insumos: [
      { insumoId: 28, cantidad: 500 },  // Masa para pizza (500g)
      { insumoId: 3, cantidad: 200 },   // Queso (200g)
      { insumoId: 29, cantidad: 300 }   // Salsa de tomate (300g)
    ], 
    borrado: false 
  },


];


exports.getProductosPaginado = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ message: 'Invalid page or pageSize parameter' });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex >= productos.length) {
      return res.status(400).json({ message: 'Page number exceeds total pages' });
    }

    const paginatedProductos = productos.slice(startIndex, endIndex);

    res.json({
      productos: paginatedProductos,
      totalItems: productos.length,
      currentPage: page,
      totalPages: Math.ceil(productos.length / pageSize)
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getProductosActivosPaginado = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ message: 'Invalid page or pageSize parameter' });
    }

    const productosActivos = productos.filter(p => !p.borrado);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex >= productosActivos.length) {
      return res.status(400).json({ message: 'Page number exceeds total pages' });
    }

    const paginatedProductos = productosActivos.slice(startIndex, endIndex);

    res.json({
      productos: paginatedProductos,
      totalItems: productosActivos.length,
      currentPage: page,
      totalPages: Math.ceil(productosActivos.length / pageSize)
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getProductos = (req, res) => {
  res.json(productos);
};

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