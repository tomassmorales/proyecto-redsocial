// const red = require('../data/');
const {
    lista
} = require("../data/datos.js");
const usuario = require("../data/datos.js");
const posteos = require("../data/posteos");
const comentarios = require("../data/comentarios");
const db = require('../database/models');
const red = db.usuarios;

const red = {
    index: function (req, res) {

        listaPosteos = posteos.lista;

        usuarios = usuario.lista;

        listaComentarios = comentarios.lista;

        res.render('index', {
            posteos: listaPosteos,
            usuarios: usuarios,
            comentario: listaComentarios
        })
    },
    agregarPost: function (req, res) {
        res.render('agregarPost')
    },
    detallePost: function (req, res) {
        let idPosteo = req.params.id;
        let listaPosteos = posteos.lista;
        let post = [];
        let coment = [];
        let listaComentarios = comentarios.lista;
        let usuarioc = usuario.lista;
        let userName;
        let imagen = [];
        


        for (let i = 0; i < listaPosteos.length; i++) {
            if (idPosteo == listaPosteos[i].id) {
                post.push(listaPosteos[i]);
            }
        };
        for (let k = 0; k < listaComentarios.length; k++) {
                coment.push(listaComentarios[k]);
        };
        for (let p = 0; p < usuarioc.length; p++) {
            if (idPosteo == usuarioc[p].id) {
                userName = usuarioc[p].nombreDeUsuario;
                imagen.push(usuarioc[p].imagenPerfil)
            };
             
        };
        /*/for (let l =0; l <usuarioc.length; l++) {
            if (idPosteo == usuarioc[l].id) {
                
            imagenPerfil = usuarioc[l].imagenPerfil;     
            }
        }/*/

        res.render('detallePost', {
            idPost: idPosteo,
            posteo: post,
            comentario: coment,
            usuario: usuarioc,
            user: userName,
            imagen: imagen,
            
        })
    },
    detalleUsuario: function (req, res) {
        let postsUsuario = posteos.lista;
        let idUsuario = req.params.id;
        let usuarios = usuario.lista;
        let nombreUsuario;
        let seguidoresUsuario;
        let seguidosUsuario;
        let fotoPerfilUsuario;
        let numeroPostsUsuario;
        for (let i = 0; i < usuarios.length; i++) {
            if (idUsuario == usuarios[i].id) {
                nombreUsuario = usuarios[i].nombreDeUsuario;
                seguidoresUsuario = usuarios[i].seguidores;
                seguidosUsuario = usuarios[i].seguidos;
                fotoPerfilUsuario = usuarios[i].imagenPerfil;
                numeroPostsUsuario = usuarios[i].numeroDePublicaciones;
            };
        };
        res.render('detalleUsuario', {
            nombreUser: nombreUsuario,
            seguidores: seguidoresUsuario,
            seguidos: seguidosUsuario,
            fotoPerfil: fotoPerfilUsuario,
            numPosts: numeroPostsUsuario,
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
        let busqueda = req.query.busqueda;
        res.render('resultadoBusqueda', {
            data: busqueda
        })
    },

}
module.exports = red;