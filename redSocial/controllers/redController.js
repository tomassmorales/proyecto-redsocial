// const red = require('../data/');

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
        res.render('miPerfil')
    },
    registracion: function (req, res) {
        res.render('registracion')
    },
    resultadoBusqueda: function (req, res) {
        res.render('resultadoBusqueda')
    },

}
module.exports = red;