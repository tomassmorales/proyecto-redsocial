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
                    // res.send(data)
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
        if (req.session.user != undefined) {
            res.render("agregarPost");
        } else {
            res.redirect("/user/login");
        }
    },
    storePost: function (req, res) {
        db.Post.create({
                usuario_id: req.session.user.id,
                descripcion: req.body.descripcion,
                fecha_creacion: Date.now(),
                imagen: req.file.filename
            })
            .then(post => {
                res.redirect("/detallePost/" + post.id);
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    },
    // agregarComentario: function (req, res) {
    //     res.render('agregarComentario');
    // },
    storeComentario: function (req, res) {
        if (req.session.user != undefined) {
            db.Comentarios.create({
                    posteo_id: req.params.id,
                    usuario_id: req.session.user.id,
                    texto: req.body.comentario,
                    fecha_creacion: Date.now(),
                })
                .then(comentarios => {
                    res.redirect('/detallePost/' + comentarios.posteo_id);
                })
        } else {
            res.redirect("/user/login")
        }

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
                // res.send(data)
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
        db.Post.findAll({
                include: [{
                    association: "usuario"
                }, {
                    association: "comentarios",
                    include: {
                        association: "comentario_usuario"
                    }
                }],
                where: [{
                    'descripcion': {
                        [op.like]: `%${busqueda}%`
                    }
                }],
                order: [
                    ['fecha_creacion', 'ASC']
                ],
                limit: 5,
                offset: 0
            })
            .then(posts => {
                //return res.send(posts);
                return res.render('resultadoBusqueda', {
                    data: posts,
                    busqueda: busqueda
                })
            })
            .catch(error => {
                return res.send(error)
            })
    },
    cambiarPost: function (req, res) {

        if (req.file != undefined && req.session.user != undefined) {
            db.Post.update({
                    imagen: req.file.filename,
                    descripcion: req.body.descripcion
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(post => {
                    res.redirect("/detallePost/" + req.params.id)
                })
                .catch(function (error) {
                    res.send(error)
                })
        } else if (req.file == undefined) {
            db.Post.update({
                    descripcion: req.body.descripcion
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(post => {
                    res.redirect("/detallePost/" + req.params.id)
                })
                .catch(function (error) {
                    res.send(error)
                })
        } else {
            res.redirect("/user/login")
        }
    },
    editarPost: function (req, res) {
        if (req.session.user != undefined) {
            res.render("editarPost", {
                postId: req.params.id
            });
        } else {
            res.redirect("/user/login");
        }
    },
    deletePost: function (req, res) {
        if (req.session.user != undefined) {
            let id = req.params.id;
            let comentDelete = db.Comentarios.destroy({
                where: {
                    posteo_id: id
                }
            })
            let postDelete = db.Post.destroy({
                where: {
                    id: id
                }
            })
            Promise.all([comentDelete, postDelete])
                .then(function ([comentario, post]) {
                    res.redirect("/")
                })
        } else {
            return res.redirect("/user/login")
        }
    }
}
module.exports = red;