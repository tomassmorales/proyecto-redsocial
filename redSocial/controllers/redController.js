// const red = require('../data/');
const {
    lista
} = require("../data/datos.js");
const usuario = require("../data/datos.js");
const posteos = require("../data/posteos");
const comentarios = require("../data/comentarios");
const db = require('../database/models');
const reds = db.usuarios;
const op = db.sequelize.Op;

var red = {
    index: function (req, res) {

        let posts = db.Post.findAll({
            order: [
                [
                    "fecha_creacion", "ASC"
                ],
                [
                    "usuario_id", "DESC"
                ]
            ],
            limit: 10
        })
        /*let coment = db.Comentario.findAll({
            order: [
                [
                    "fecha_creacion", "ASC"
                ],
                [
                    "usuario_id", "DESC"
                ]
            ],
            limit: 4
        }) */
        /*let user = db.Usuario.findAll({
            order: [
                [
                    "usuario_id", "DESC"
                ]
            ],
            limit: 10
        }) */
/*falta guardar en una variable los usuarios y los comentarios para mandarlos con un promise all al index*/
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
        db.Post.findAll()
        .then(Post => {
            res.render('agregarPost',{Post})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
        //res.render('agregarPost')
    },
    storePost: function(req,res){
        db.Post.agregarPost({
            id: req.body.id,
            usuario_id: req.body.usuario_id,
            descripcion: req.body.descripcion,
            fecha_creacion: req.body.fecha_creacion,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        })
        .then(movie => {
        res.redirect("detallePost");
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    },
    agregarComentario:function (req, res) {
        res.render('agregarComentario');
    },
    storeComentario:function (req, res) {
        res.redirect('detallePost');
    },
    detallePost: function (req, res) {
        let idPosteo = req.params.id;
        let idComentario = req.params.id;
        let idUsuario = req.params.id;

        let usuario = db.Usuario.findByPk(idUsuario);
        let posteo = db.Post.findByPk(idPosteo);
        let comentario = db.Comentarios.findByPk(idComentario);
        /*Falta traer la información de los comentarios del posteo y el usuario que lo hizo para hacer un promise all y mandar todo*/


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
        let idUsuario = req.params.id;
        let posteosUsuario = db.Post.findAll({
            where: [
                {'usuario_id': idUsuario}
            ],
            order: [
                ['fecha_creacion','DESC']
            ],
        })
        /*Falta traer la información del usuario para luego hacer un promise all y llevar toda la información a la pagina*/

        let postsUsuario = posteos.lista;
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
    miPerfil: function (req, res) {
        /*Acá hay que hacer algo parecido a detalleUsuario pero en base al id del usuario logeado */
        let postsUsuario = posteos.lista;
        let listaUsuarios = usuario.lista;
        res.render('miPerfil', {
            users: listaUsuarios,
            posts: postsUsuario
        })
    },
    resultadoBusqueda: function (req, res) {
        let busqueda = req.query.busqueda;
        /*Hay que traer los datos del usuario desde la base de datos para luego enviar la información a la vista, mas o menos parecido a esto:
        movie.findAll({
            where: [
                {'title': {[op.like]:`%${search}%`}}
            ],
            order: [
                ['rating','ASC']
            ],
            limit:5,
            offset:0
        })
        .then( movies => {
            return res.send(movies);
        })
        .catch(error => {
            return res.send(error)
        })
        */
        res.render('resultadoBusqueda', {
            data: busqueda
        })
    },

}
module.exports = red;