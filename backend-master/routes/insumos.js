const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumosController');
const { verifyToken, isAdmin, isPanadero, isUser } = require('../middleware/auth');

router.get('/', verifyToken, isPanadero, (req, res) => {
  insumoController.getInsumos(req, res);
});

router.get('/activos', verifyToken, isPanadero, (req,res) => {
  insumoController.getInsumosActivos(req,res);
}); 

router.get('/paginado', verifyToken, isAdmin, (req, res) => {
    insumoController.getInsumosPaginado(req, res);
});

router.get('/:id', verifyToken, isPanadero, (req, res)=> {
  insumoController.getInsumoById(req, res);
});
   
router.post('/', verifyToken, isAdmin, (req, res) => {
  insumoController.createInsumo(req, res);
});

router.put('/:id', insumoController.updateInsumo);

router.put('/restore/:id', verifyToken, isAdmin,(req,res) =>{
  insumoController.restoreInsumo(req,res);
}); 

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  insumoController.deleteInsumo(req, res);
});

module.exports = router;
