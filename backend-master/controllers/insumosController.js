let insumos = [
    { id: 1, nombre: 'Pan de molde', descripcion: 'Pan de molde sin corteza', unidad_medida: 'unidades' },
    { id: 2, nombre: 'Jamón', descripcion: 'Jamón cocido en rebanadas', unidad_medida: 'gramos' },
    { id: 3, nombre: 'Queso', descripcion: 'Queso en rebanadas', unidad_medida: 'gramos' },
    { id: 4, nombre: 'Manteca', descripcion: 'Mantequilla a temperatura ambiente', unidad_medida: 'gramos' },
    { id: 5, nombre: 'Huevo', descripcion: 'Huevos duros', unidad_medida: 'unidades' },
    { id: 6, nombre: 'Tomate', descripcion: 'Tomates en rodajas', unidad_medida: 'unidades' },
    { id: 7, nombre: 'Lechuga', descripcion: 'Hojas de lechuga', unidad_medida: 'hojas' },
    { id: 8, nombre: 'Mayonesa', descripcion: 'Mayonesa', unidad_medida: 'gramos' },
    { id: 9, nombre: 'Harina', descripcion: 'Harina de trigo', unidad_medida: 'gramos' },
    { id: 10, nombre: 'Azúcar', descripcion: 'Azúcar', unidad_medida: 'gramos' },
    { id: 11, nombre: 'Leche', descripcion: 'Leche', unidad_medida: 'mililitros' },
    { id: 12, nombre: 'Esencia de vainilla', descripcion: 'Esencia de vainilla', unidad_medida: 'mililitros' },
    { id: 13, nombre: 'Polvo de hornear', descripcion: 'Polvo de hornear', unidad_medida: 'gramos' },
    { id: 14, nombre: 'Limón', descripcion: 'Ralladura de limón', unidad_medida: 'unidades' },
    { id: 15, nombre: 'Pasas', descripcion: 'Pasas', unidad_medida: 'gramos' },
    { id: 16, nombre: 'Frutas confitadas', descripcion: 'Frutas confitadas', unidad_medida: 'gramos' },
    { id: 17, nombre: 'Almendras', descripcion: 'Almendras picadas', unidad_medida: 'gramos' },
    { id: 18, nombre: 'Nueces', descripcion: 'Nueces picadas', unidad_medida: 'gramos' },
    { id: 19, nombre: 'Huevo crudo', descripcion: 'Huevos crudos', unidad_medida: 'unidades' }
];

  
  exports.getInsumos = (req, res) => {
    res.json(insumos);
  };
  
  exports.getInsumoById = (req, res) => {
    const { id } = req.params;
    const insumo = insumos.find(i => i.id == id);
    if (insumo) {
      res.json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  
  exports.createInsumo = (req, res) => {
    const newInsumo = req.body;
    newInsumo.id = insumos.length ? insumos[insumos.length - 1].id + 1 : 1;
    insumos.push(newInsumo);
    res.status(201).json(newInsumo);
  };
  
  exports.updateInsumo = (req, res) => {
    const { id } = req.params;
    const updatedInsumo = req.body;
    const insumoIndex = insumos.findIndex(i => i.id == id);
    if (insumoIndex !== -1) {
      insumos[insumoIndex] = { ...insumos[insumoIndex], ...updatedInsumo };
      res.json(insumos[insumoIndex]);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  
  exports.deleteInsumo = (req, res) => {
    const { id } = req.params;
    const insumoIndex = insumos.findIndex(i => i.id == id);
    if (insumoIndex !== -1) {
      const deletedInsumo = insumos.splice(insumoIndex, 1);
      res.json(deletedInsumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  
  exports.getInsumosPaginado = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const paginatedInsumos = insumos.slice(offset, offset + pageSize);
  
    res.json({
      insumos: paginatedInsumos,
      totalItems: insumos.length
    });
  };
  