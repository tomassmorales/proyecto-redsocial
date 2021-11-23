var express = require('express');
// const red = require('../controllers/redController');
var router = express.Router();
let redController = require('../controllers/redController');
let multer = require ('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage })


/* GET home page. */
/*localhost:3000/ */
router.get('/', redController.index);

router.get('/newPost', redController.agregarPost);

router.get('/detallePost/:id?', redController.detallePost);

// router.get('/detalleUsuario/:id?', redController.detalleUsuario);

// router.get('/editarPerfil', redController.editarPerfil);

// router.get('/login', redController.login);

// router.get('/miPerfil', redController.miPerfil);

// router.get('/registracion', redController.registracion);

router.get('/resultadoBusqueda', redController.resultadoBusqueda);


router.post('/subirPost', upload.single("imagen"), redController.storePost);

//router.post('/newComent', redController.storeComent);

//router.post()

module.exports = router;