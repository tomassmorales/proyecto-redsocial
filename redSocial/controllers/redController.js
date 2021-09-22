// const red = require('../data/');
const {
    lista
}= require("../data/datos.js");
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
            comentario: listaComentarios
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
        listaComentarios = comentarios.lista;

        for (let i = 0; i < listaPosteos.length; i++) {
            if (idPosteo == listaPosteos[i].id) {
                post.push(listaPosteos[i]);
            }
        };
        for (let k = 0; k < listaComentarios.length; k++)
            if (idPosteo == listaComentarios[k].id) {
                coment.push(listaComentarios[k]);
        }
    
        res.render('detallePost', {
            idPost: idPosteo,
            posteo: post,
            comentario: coment,
        })
    },
    detalleUsuario: function (req, res) {
        let postsUsuario = posteos.lista;
        let idUsuario = req.params.id;
        let nombreUsuario;
        let seguidoresUsuario;
        let seguidosUsuario;
        let fotoPerfilUsuario;
        let numeroPostsUsuario;
        for(let i = 0; i < lista.length; i++){
            if(idUsuario == lista[i].id){
                nombreUsuario = lista[i].nombreDeUsuario;
                seguidoresUsuario = lista[i].seguidores;
                seguidosUsuario = lista[i].seguidos;
                fotoPerfilUsuario = lista[i].imagenPerfil;
                numeroPostsUsuario = lista[i].numeroDePublicaciones;
            }
        }
        res.render('detalleUsuario', {
            nombreUser = nombreUsuario,
            seguidores = seguidoresUsuario,
            seguidos = seguidosUsuario,
            fotoPerfil = fotoPerfilUsuario,
            numPosts = numeroPostsUsuario,
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