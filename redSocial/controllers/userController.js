let db = require('../database/models');
let bcrypt = require('bcryptjs');

let userController = {

	registracion: function (req, res) {
		res.render('registracion')
	},
	registrar: function (req, res) {
		let errors = {}
		let emailExistente;

		db.Usuario.findAll({
				where: {
					email: req.body.email
				}
			})
			.then(function (email) {
				emailExistente = email;
			})

		if (req.body.email == "") {
			errors.message = "El campo del email no puede estar vacio";
			res.locals.error = errors;
			res.render("registracion")
		} else if (req.body.password == "") {
			errors.message = "El campo de la contraseña no puede estar vacio";
			res.locals.error = errors;
			res.render("registracion")
		} else if (emailExistente != "") {
			errors.message = "Ya existe un usuario con ese email";
			res.locals.error = errors;
			res.render("registracion")
		} else {
			let passwordEncriptada = bcrypt.hashSync(req.body.password, 10)
			db.Usuario.create({
					nombre_usuario: req.body.username,
					email: req.body.email,
					contraseña: passwordEncriptada,
					fechaNacimiento: req.body.fechaNacimiento, //agregar fechaNacimiento a models/usuarios
					createdAt: Date.now()
				})
				.then(user => {
					res.redirect('/')
				})
				.catch(err => {
					console.log(err);
					res.send(err)
				})
		}
	},
	login: function (req, res) {
		res.render('login')
	}

}

module.exports = userController;