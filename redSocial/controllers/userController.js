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

				if (req.body.email == "") {
					errors.message = "El campo del email no puede estar vacio";
					res.locals.error = errors;
					res.render("registracion")
				} else if (req.body.password == "" || req.body.password.length <= 3 ) {
					errors.message = "La contraseña tiene que tener más de 3 caracteres";
					res.locals.error = errors;
					res.render("registracion")
				} else if (emailExistente != "") {
					errors.message = "Ya existe un usuario con ese email";
					res.locals.error = errors;
					res.render("registracion")
				} else {
					// res.send(req.body)
					let passwordEncriptada = bcrypt.hashSync(req.body.password, 10)
					db.Usuario.create({
							nombreDeUsuario: req.body.username,
							email: req.body.email,
							contrasenia: passwordEncriptada,
							fechaNacimiento: req.body.fechaNacimiento,
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
			})

	},
	login: function (req, res) {
		res.render('login')
	},
	logeo: function (req, res) {

		let errors = {};

		if (req.body.email == "") {
			errors.message = "El campo del email no puede estar vacio";
			res.locals.error = errors;
			res.render("login")
		} else {
			db.Usuario.findOne({
					where: {
						email: req.body.email
					}
				})
				.then(function (user) {
					if (user != undefined) {
						let passwordCorrecta = bcrypt.compareSync(req.body.password, user.contrasenia)
						if (passwordCorrecta == true) {
							req.session.user = user;
							if (req.body.recordame) {
								res.cookie("usuarioId", user.id, {
									maxAge: 1000 * 60 * 30
								}) //30 minutos
							}
							return res.redirect("/")
						} else {
							return res.redirect("/user/registracion")
						}
					}
				})
				.catch(err => {
					console.log(err);
					res.send(err)
				})
		}
	},
	logout: function(req,res){
		req.session.destroy();
		res.clearCookie("usuarioId");
		res.redirect("/user/login");
	}

}

module.exports = userController;