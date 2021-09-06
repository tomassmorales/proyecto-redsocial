// const red = require('../data/');
const usuario = require("../data/datos.js")



const red = {
    index: function (req, res) {
        res.render('index', {

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
        let listaUsuarios = usuarios.lista
        res.render('miPerfil', {usuario: listaUsuarios})
    },
    registracion: function (req, res) {
        res.render('registracion')
    },
    resultadoBusqueda: function (req, res) {
        res.render('resultadoBusqueda')
    },

}
module.exports = red;