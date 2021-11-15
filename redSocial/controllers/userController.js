let db = require('../database/models');
let bcrypt = require('bcryptjs');
const usuario = require("../data/datos.js");
const posteos = require("../data/posteos");
const comentarios = require("../data/comentarios");
const op = db.Sequelize.Op;

let userController = {

	registracion: function (req, res) {
		if (req.session.user == undefined) {
			res.render('registracion')
		} else {
			res.redirect("/")
		}
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
				} else if (req.body.password == "" || req.body.password.length <= 3) {
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
		if (req.session.user == undefined) {
			res.render('login')
		} else {
			res.redirect("/")
		}
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
							errors.message = "La contraseña es inválida";
							res.locals.error = errors;
							res.render("login");
						}
					} else {
						errors.message = "No existe un usuario con este email";
						res.locals.error = errors;
						res.render("login");
					}
				})
				.catch(err => {
					console.log(err);
					res.send(err)
				})
		}
	},
	logout: function (req, res) {
		req.session.destroy();
		res.clearCookie("usuarioId");
		res.redirect("/user/login");
	},
	miPerfil: function (req, res) {
		/*Acá hay que hacer algo parecido a detalleUsuario pero en base al id del usuario logeado */
		if (req.session.user == undefined) {
			res.redirect("/user/login")
		} else {
			db.Usuario.findByPk(req.session.user.id)
				.then(user => {
					let postsUsuario = posteos.lista;
					let listaUsuarios = usuario.lista;
					res.render("miPerfil", {
						user: user,
						users: listaUsuarios,
						posts: postsUsuario
					})
				})
		}
	},
	detail: function (req, res) {
		db.Usuario.findByPk(req.params.id, {
				include: [
				{association: "seguidor"},
				{association: "seguido"}
			]
			})
			.then(detail => {
				// return res.send(detail)
				let loSigue = false
				for (let i = 0; i < detail.seguidor.length; i++) {
					if (req.session.user.id == detail.seguidor[i].id) {
						loSigue = true
					}
				}
				res.render("detail", {
					detail: detail,
					loSigue: loSigue
				})
			})
			.catch(error=>{
				console.log(error);
			})
	},
	follow: function (req, res) {
		if (req.session.user != undefined) {
			db.Seguidor.create({
					seguidor: req.session.user.id,
					seguido: req.params.id
				})
				.then(user => {
					res.redirect("/user/detail/" + req.params.id)
				})

		} else {
			res.redirect("/user/login")
		}
	},
	unfollow: function (req, res) {
		if (req.session.user != undefined) {
			db.Seguidor.destroy({
					where: {
						[op.and]: [{
								seguidor: req.session.user.id
							},
							{
								seguido: req.params.id
							}
						]
					}
				})
				.then(user => {
					res.redirect("/user/detail/" + req.params.id)
				})
		} else {
			res.redirect("/user/login")
		}
	},
}

module.exports = userController;