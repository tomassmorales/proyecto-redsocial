let db = require('../database/models');
// let bcrypt = require('bcryptjs');

let userController = {

	registracion: function (req, res) {
		res.render('registracion')
	},
	login: function (req, res) {
		res.render('login')
	}

}

module.exports = userController;