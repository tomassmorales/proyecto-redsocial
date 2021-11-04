var express = require('express');
const red = require('../controllers/redController');
var router = express.Router();
let userController = require('../controllers/userController')

/* GET home page. */
/*localhost:3000/ */

router.get('/login', userController.login);

router.get('/registracion', userController.registracion);


router.post("/registracion", userController.registrar);

module.exports = router;