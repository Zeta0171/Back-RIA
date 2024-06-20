let insumos = [
    { id: 1, nombre: 'Insumo 1', descripcion: 'Descripción 1', unidad_medida: 'kg' },
    { id: 2, nombre: 'Insumo 2', descripcion: 'Descripción 2', unidad_medida: 'litros' },
    { id: 3, nombre: 'Insumo 3', descripcion: 'Descripción 3', unidad_medida: 'metros' }
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
