const usuario = require('../data/datos');
const db = require('../database/models');

const op = db.Sequelize.Op;

var red = {
    index: function (req, res) {
        if (req.session.user == undefined) {
            db.Post.findAll({
                    include: [{
                        association: "usuario"
                    }, {
                        association: "comentarios",
                        include: {
                            association: "comentario_usuario"
                        }
                    }],
                    order: [
                        ["fecha_creacion", "DESC"],
                    ],
                    limit: 10
                })
                .then(data => {
                    //res.send(data)
                    res.render('index', {
                        posteos: data,
                    })
                })
        } else {
            db.Usuario.findByPk(req.session.user.id, {
                    include: [{
                            association: "seguido"
                        },
                        {
                            association: "seguidor"
                        }
                    ]
                })
                .then(usuario => {
                    db.Post.findAll({
                            include: [{
                                association: "usuario"
                            }, {
                                association: "comentarios",
                                include: {
                                    association: "comentario_usuario"
                                },
                            }, ],
                            order: [
                                ["fecha_creacion", "DESC"],
                            ],
                            limit: 10
                        })
                        .then(data => {
                            if (usuario.seguido.length > 2) {
                                let posteos = [];
                                for (let i = 0; i < data.length; i++) {
                                    for (let k = 0; k < usuario.seguido.length; k++) {
                                        if (data[i].usuario.id == usuario.seguido[k].id) {
                                            posteos.push(data[i])
                                        }
                                    }
                                }
                                // return res.send(posteos);
                                res.render('index', {
                                    posteos: posteos,
                                })
                            } else {
                                res.render('index', {
                                    posteos: data,
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        }
    },
   agregarPost: function (req, res) {
        db.Post.findAll()
            //.then(posts => {
                res.render('agregarPost')//,{posts})
            //})
            .catch(err => {
                console.log(err)
                res.send(err)
            })
        //res.render('agregarPost')
    }, 
    storePost: function (req, res) {
        db.Post.create({
                id: req.body.id,
                usuario_id: req.body.usuario_id,
                descripcion: req.body.descripcion,
                fecha_creacion: Date.now(),
                imagen: req.body.imagen
            })
            .then(post => {
                res.redirect("/detallePost/");
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    },
    agregarComentario: function (req, res) {
        res.render('agregarComentario');
    },
    storeComentario: function (req, res) {
        res.redirect('detallePost');
    },
    detallePost: function (req, res) {
        db.Post.findByPk(req.params.id, {
                include: [{
                    association: "usuario"
                }, {
                    association: "comentarios",
                    include: {
                        association: "comentario_usuario"
                    }
                }]
            })
            .then(data => {
                //res.send(data)
                res.render('detallePost', {
                    post: data,
                })
            })


    },
    // detalleUsuario: function (req, res) {
    //     let idUsuario = req.params.id;
    //     let posteosUsuario = db.Post.findAll({
    //         where: [
    //             {'usuario_id': idUsuario}
    //         ],
    //         order: [
    //             ['fecha_creacion','DESC']
    //         ],
    //     })
    //     /*Falta traer la información del usuario para luego hacer un promise all y llevar toda la información a la pagina*/

    //     let postsUsuario = posteos.lista;
    //     let usuarios = usuario.lista;
    //     let nombreUsuario;
    //     let seguidoresUsuario;
    //     let seguidosUsuario;
    //     let fotoPerfilUsuario;
    //     let numeroPostsUsuario;
    //     for (let i = 0; i < usuarios.length; i++) {
    //         if (idUsuario == usuarios[i].id) {
    //             nombreUsuario = usuarios[i].nombreDeUsuario;
    //             seguidoresUsuario = usuarios[i].seguidores;
    //             seguidosUsuario = usuarios[i].seguidos;
    //             fotoPerfilUsuario = usuarios[i].imagenPerfil;
    //             numeroPostsUsuario = usuarios[i].numeroDePublicaciones;
    //         };
    //     };
    //     res.render('detalleUsuario', {
    //         nombreUser: nombreUsuario,
    //         seguidores: seguidoresUsuario,
    //         seguidos: seguidosUsuario,
    //         fotoPerfil: fotoPerfilUsuario,
    //         numPosts: numeroPostsUsuario,
    //         user: idUsuario,
    //         posts: postsUsuario
    //     })
    // },
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