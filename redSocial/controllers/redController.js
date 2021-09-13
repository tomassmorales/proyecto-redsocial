// const red = require('../data/');
const {
    lista
} = require("../data/datos.js");
const usuario = require("../data/datos.js");
const posteos = require("../data/posteos");
const comentarios = require("../data/comentarios");


const red = {
    index: function (req, res) {

        listaPosteos = posteos.lista;

        usuarios = usuario.lista;

        listaComentarios = comentarios.lista;

        res.render('index', {
            posteos: listaPosteos,
            usuarios: usuarios,
            comentarios: listaComentarios
        })
    },
    agregarPost: function (req, res) {
        res.render('agregarPost')
    },
    detallePost: function (req, res) {
        idPosteo = req.params.id;
        listaPosteos = posteos.lista;
        let post = [];
        let coment = [];
        idComentario = req.params.id;
        listaComentarios = comentarios.lista;

        for (let i = 0; i < listaPosteos.length; i++) {
            if (idPosteo == listaPosteos[i].id) {
                post.push(listaPosteos[i]);
            }
        };
        for (let i = 0; i < listaComentarios.length; i++)
            if (idComentario == listaComentarios[i].id) {
                coment.push(listaComentarios[i]);
        }
    
        res.render('detallePost', {
            idPost: idPosteo,
            posteo: post,
            idComent: idComentario,
            comentario: coment
        })
    },
    detalleUsuario: function (req, res) {
        let postsUsuario = posteos.lista;
        let idUsuario = req.params.id;
        res.render('detalleUsuario', {
            user: idUsuario,
            posts: postsUsuario
        })
    },
    editarPerfil: function (req, res) {
        res.render('editarPerfil')
    },
    login: function (req, res) {
        res.render('login')
    },
    miPerfil: function (req, res) {
        let postsUsuario = posteos.lista;
        let listaUsuarios = usuario.lista;
        res.render('miPerfil', {
            users: listaUsuarios,
            posts: postsUsuario
        })
    },
    registracion: function (req, res) {
        res.render('registracion')
    },
    resultadoBusqueda: function (req, res) {
        res.render('resultadoBusqueda')
    },

}
module.exports = red;