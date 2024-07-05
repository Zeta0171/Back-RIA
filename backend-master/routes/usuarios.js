const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');

router.post('/register', (req, res) => {
  /* #swagger.summary = 'Registra un nuevo usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Registro de nuevo usuario.',
        schema: { $ref: '#/definitions/RegisterUser' }
    } */
  usuariosController.register(req, res);
});

router.post('/login', (req, res) => {
  /* #swagger.summary = 'Inicia sesión' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Credenciales de usuario.',
        schema: { $ref: '#/definitions/Login' }
    } */
  usuariosController.login(req, res);
});

router.post('/change-password', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Cambia la contraseña del usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Cambio de contraseña de usuario.',
        schema: { $ref: '#/definitions/ChangePassword' }
    } */
  usuariosController.changePassword(req, res);
});

router.post('/forgot-password', (req, res) => {
  /* #swagger.summary = 'Recupera la contraseña olvidada' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Recuperación de contraseña de usuario.',
        schema: { $ref: '#/definitions/ForgotPassword' }
    } */
  usuariosController.forgotPassword(req, res);
});

router.post('/reset-password', (req, res) => {
  /* #swagger.summary = 'Restablece la contraseña del usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Restablecimiento de contraseña de usuario.',
        schema: { $ref: '#/definitions/ResetPassword' }
    } */
  usuariosController.resetPassword(req, res);
});

router.post('/enable-user', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Habilita un usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Habilitación de usuario.',
        schema: { $ref: '#/definitions/EnableDisableUser' }
    } */
  usuariosController.enableUser(req, res);
});

router.post('/disable-user', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Deshabilita un usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Deshabilitación de usuario.',
        schema: { $ref: '#/definitions/EnableDisableUser' }
    } */
  usuariosController.disableUser(req, res);
});

router.get('/', (req, res) => {
  usuariosController.getUsuarios(req, res);
});

router.get('/paginado', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Obtiene una lista paginada de usuarios' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número de página',
        type: 'integer'
    } */
  /* #swagger.parameters['pageSize'] = {
        in: 'query',
        description: 'Número de usuarios por página',
        type: 'integer'
    } */
  usuariosController.getUsuariosPaginado(req, res);
});

router.post('/role', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Obtiene una lista paginada de usuarios' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número de página',
        type: 'integer'
    } */
  /* #swagger.parameters['pageSize'] = {
        in: 'query',
        description: 'Número de usuarios por página',
        type: 'integer'
    } */
  usuariosController.changeUserRole(req, res);
});



module.exports = router;
