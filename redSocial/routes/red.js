var express = require('express');
var router = express.Router();
const redController = require('../controllers/redController')

/* GET home page. */
router.get('/red', redController);

module.exports = router;