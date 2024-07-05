let pedidos = [
     {
     id: 1,
   fechaPedido: new Date('2024-07-05'),
    fechaEntrega: new Date('2024-07-06'),
     estado: 'Pendiente',
       userId: 1,
       productos: [
        { productoId: 1, cantidad: 2 },
        { productoId: 3, cantidad: 1 }
      ]
    },
    {
     id: 2,
       fechaPedido: new Date('2024-07-04'),
       fechaEntrega: new Date('2024-07-07'),
       estado: 'En preparacion',
       userId: 2,
       productos: [
        { productoId: 5, cantidad: 1 },
        { productoId: 6, cantidad: 3 }
      ]
     },
   {
     id: 3,
       fechaPedido: new Date('2024-07-03'),
       fechaEntrega: new Date('2024-07-05'),
       estado: 'Listo para recoger',
       userId: 3,
       productos: [
         { productoId: 2, cantidad: 1 },
         { productoId: 4, cantidad: 2 }
       ]
     }
  ];

exports.getPedidos = (req, res) => {
  res.json(pedidos);
};

exports.getPedidoById = (req, res) => {
  const { id } = req.params;
  const pedido = pedidos.find(p => p.id == id);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

exports.getPedidosByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const pedidos = await pedidos.find({ userId });
      res.json(pedidos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.createPedido = (req, res) => {
  const newPedido = req.body;
  newPedido.id = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;
  pedidos.push(newPedido);
  res.status(201).json(newPedido);
};

exports.updatePedido = (req, res) => {
  const { id } = req.params;
  const updatedPedido = req.body;
  const pedidoIndex = pedidos.findIndex(p => p.id == id);
  if (pedidoIndex !== -1) {
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], ...updatedPedido };
    res.json(pedidos[pedidoIndex]);
  } else {
    res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

exports.deletePedido = (req, res) => {
  const { id } = req.params;
  const pedidoIndex = pedidos.findIndex(p => p.id == id);
  if (pedidoIndex !== -1) {
    pedidos.splice(pedidoIndex, 1);
    res.json({ message: 'Pedido eliminado correctamente' });
  } else {
    res.status(404).json({ message: 'Pedido no encontrado' });
  }
};
