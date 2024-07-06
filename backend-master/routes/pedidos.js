const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { verifyToken, isAdmin, isUser, isPanadero } = require('../middleware/auth');

router.get('/', verifyToken, isPanadero, (req, res) => {
  pedidosController.getPedidos(req, res);
});

router.get('/:id', verifyToken, isUser, (req, res) => {
  pedidosController.getPedidoById(req, res);
});

router.get('/usuario/:userId',verifyToken, isUser, (req,res) =>{
  pedidosController.getPedidosByUserId(req,res);
})

router.post('/', verifyToken, isUser, (req, res) => {
  pedidosController.createPedido(req, res);
});

router.put('/:id', verifyToken, isPanadero, (req, res) => {
  pedidosController.updatePedido(req, res);
});

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  pedidosController.deletePedido(req, res);
});

module.exports = router;
