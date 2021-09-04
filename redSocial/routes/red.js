var express = require('express');
var router = express.Router();
let redController = require('../controllers/redController')

/* GET home page. */ /*localhost:3000/red */ 
router.get('/red', redController.index);

router.get('/newPost', redController.agregarPost);

router.get('/detallePost', redController.detallePost);

router.get('/detalleUsuario', redController.detalleUsuario);

router.get('/editarPerfil', redController.editarPerfil);

router.get('/login', redController.login);

router.get('/miPerfil', redController.miPerfil);

router.get('/registracion', redController.registracion);

router.get('/resultadoBusqueda', redController.resultadoBusqueda);

module.exports = router;