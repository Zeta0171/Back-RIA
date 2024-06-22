const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumosController');
const { verifyToken, isAdmin, isPanadero, isUser } = require('../middleware/auth');

router.get('/', verifyToken, isPanadero,(req, res) =>{
    insumoController.getInsumos(req,res);
}); 

router.get('/:id', insumoController.getInsumoById);

router.post('/', verifyToken, isAdmin, (req, res) => {
    insumoController.createInsumo(req, res);
});

router.put('/:id', insumoController.updateInsumo);

router.delete('/:id', verifyToken, isAdmin,(req, res) => {
    insumoController.deleteInsumo(req, res);
});

module.exports = router;