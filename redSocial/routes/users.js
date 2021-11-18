var express = require('express');
// const red = require('../controllers/redController');
var router = express.Router();
let userController = require('../controllers/userController')
let multer = require('multer');
let path = require('path');

/* GET home page. */
/*localhost:3000/ */

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images/avatars");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage
})

router.get('/login', userController.login);

router.get('/registracion', userController.registracion);

router.get('/miPerfil', userController.miPerfil);

// router.get('/detail/:id', userController.detail);

router.get('/detalleUsuario/:id', userController.detail);


router.post("/registracion", upload.single("avatar"), userController.registrar);

router.post("/login", userController.logeo);

router.post("/logout", userController.logout);

router.post('/seguir/:id', userController.follow);

router.post('/dejarSeguir/:id', userController.unfollow)

module.exports = router;