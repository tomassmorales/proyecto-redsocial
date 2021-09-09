// const red = require('../data/');
const usuario = require("../data/datos.js");
const posteos = require("../data/posteos");



const red = {
    index: function (req, res) {

        listaPosteos = posteos.lista;

        usuarios = usuario.lista

        res.render('index', { 
            posteos: listaPosteos,
            usuarios: usuarios
        })
    },
    agregarPost: function (req, res) {
        res.render('agregarPost')
    },
    detallePost: function (req, res) {
        res.render('detallePost')
    },
    detalleUsuario: function (req, res) {
        res.render('detalleUsuario')
    },
    editarPerfil: function (req, res) {
        res.render('editarPerfil')
    },
    login: function (req, res) {
        res.render('login')
    },
    miPerfil: function (req, res) {
        let listaUsuarios = usuario.lista
     res.render('miPerfil', {users: listaUsuarios})
    },
    registracion: function (req, res) {
        res.render('registracion')
    },
    resultadoBusqueda: function (req, res) {
        res.render('resultadoBusqueda')
    },

}
module.exports = red;