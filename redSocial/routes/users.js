var express = require('express');
const red = require('../controllers/redController');
var router = express.Router();
let userController = require('../controllers/userController')

/* GET home page. */
/*localhost:3000/ */

router.get('/login', userController.login);

router.get('/registracion', userController.registracion);

router.get('/miPerfil', userController.miPerfil);

// router.get('/detail/:id', userController.detail);

router.get('/detalleUsuario/:id', userController.detail);


router.post("/registracion", userController.registrar);

router.post("/login", userController.logeo);

router.post("/logout", userController.logout);

router.post('/seguir/:id', userController.follow);

router.post('/dejarSeguir/:id', userController.unfollow)

module.exports = router;