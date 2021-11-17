CREATE DATABASE redSocial;
USE redSocial;

CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `seguidores` int(10) unsigned DEFAULT NULL,
  `seguidos` int(10) unsigned DEFAULT NULL,
  `publicaciones` int(10) unsigned DEFAULT NULL,
  `fotoPerfil` varchar(2000) DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nombreDeUsuario` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `contrasenia` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `seguidores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seguidor` int(10) unsigned DEFAULT NULL,
  `seguido` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seguidor` (`seguidor`),
  KEY `seguido` (`seguido`),
  CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`seguidor`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `seguidores_ibfk_2` FOREIGN KEY (`seguido`) REFERENCES `usuarios` (`id`)
);

CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(10) unsigned DEFAULT NULL,
  `imagen` varchar(2000) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
);

CREATE TABLE `comentarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `posteo_id` int(10) unsigned DEFAULT NULL,
  `usuario_id` int(10) unsigned DEFAULT NULL,
  `texto` varchar(40) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `posteo_id` (`posteo_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`posteo_id`) REFERENCES `posts` (`id`)
);

-- Inserciones

INSERT INTO `usuarios` VALUES 
(default,NULL,NULL,NULL,"https://c.wallhere.com/photos/12/ce/mel_gibson_celebrity_face_smile_eyes-717975.jpg!d",'2000-07-04','2021-11-04 22:41:35','2021-11-04 22:41:35','tomasmorales','tomassmorales2707@gmail.com','$2a$10$J4r9bIQclCncnZ3gXPPWJOE4clXa0vASOLBaR3FtOxm7bp4gVLIjy'),
(default,NULL,NULL,NULL,"http://www.paredro.com/wp-content/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg",'2021-11-26','2021-11-08 14:18:56','2021-11-08 14:18:56','tomas','ejemploOtro@gmail.com','$2a$10$1YIOn6Ac6H9f4xsNUSV4HOSM0lfg7YK0psP7GvJc008l1CQIN8RVm'),
(default,NULL,NULL,NULL,"https://static2.abc.es/media/200912/14/davidmeca--300x180.jpg",'2000-07-27','2021-11-08 14:27:35','2021-11-08 14:27:35','tmorales','tmorales@udesa.edu.ar','$2a$10$kDAHWssh1cFdAldy2yUnQuXn6hlxa/ZorndNWsxQ1JPAv73VUxUCe'),
(default,NULL,NULL,NULL,"https://hips.hearstapps.com/ellees.h-cdn.co/assets/15/37/1024x1332/1024x1332-r-ti-rostros-dilatados-personas-energicas-12718630-1-esl-es-rostros-dilatados-personas-energicas-jpg.jpg?resize=480:*",'2021-11-17','2021-11-11 12:20:56','2021-11-11 12:20:56','ejemploTomas','ejemplo@udesa.edu.ar','$2a$10$cbc2vQGfR2/rQ9HEvAp.FeSIWE7S55nrEGa.9YqVJ16BJf85K5b6u'),
(default,NULL,NULL,NULL,"https://i.pinimg.com/736x/c8/e9/72/c8e972106158f5dd52b0b20c6292f089.jpg",'2007-03-01','2021-11-11 12:23:38','2021-11-11 12:23:38','juangonzales','juangonzales@gmail.com','$2a$10$vY0s72RRj.ExbQPqmjg48.WDHl2t1mbtoVIu4HGbKsl39AJqU8/qu');

INSERT INTO posts VALUES(default,1,"https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2012/01/comida-rapida-casera.jpg","La mejor carne","2021-9-21");
INSERT INTO posts VALUES(default,2,"https://i0.wp.com/voces365.com/wp-content/uploads/SEMANA-DE-LA-COMIDA-MEXICANA-AMORALAMEXICANA-2.jpg?fit=900%2C773&ssl=1","Siempre es mejor estar saludable!","2021-9-22");
INSERT INTO posts VALUES(default,3,"https://tecnohotelnews.com/wp-content/uploads/2018/04/siete-claves-para-ofrecer-platos-saludables-atractivos-a-los-comensales.jpg","Las mejores hamburguesas","2021-9-23");
INSERT INTO posts VALUES(default,4,"https://saposyprincesas.elmundo.es/wp-content/uploads/2017/01/comida-india-langostinos-tandoori.jpg","Me encanta la comida","2021-9-27");
INSERT INTO posts VALUES(default,5,"https://img2.rtve.es/p/81290?imgProgApi=imgPortada&w=1600","El mejor restaurante!","2021-9-27");
INSERT INTO posts VALUES(default,1,"https://okdiario.com/img/2021/03/10/recetas-chinas-655x368.jpg","Mis tacos favoritos","2021-9-27");
INSERT INTO posts VALUES(default,2,"https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187702_1024x576.jpg","Camarones","2021-9-20");
INSERT INTO posts VALUES(default,3,"https://gastronomiaycia.republica.com/wp-content/uploads/2021/01/elplatoharvard_2-680x448.jpg","Amo la comida dulce","2021-9-27");
INSERT INTO posts VALUES(default,4,"https://www.ecestaticos.com/image/clipping/3db21f0346f8894c7f3682834c13f54a/por-que-la-comida-sabe-mas-dulce-cuando-tiene-forma-redonda.jpg","Asado!","2021-9-27");
INSERT INTO posts VALUES(default,5,"https://s03.s3c.es/imag/_v0/770x420/2/8/d/Comida-basura.jpg","Buffet!","2021-9-27");

INSERT INTO comentarios VALUES(default,1,1,"Que ricoo!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,1,2,"Eee inviten malaonda","2021-10-03 10:20:31");
INSERT INTO comentarios VALUES(default,2,3,"grande!","2021-12-23 12:01:54");
INSERT INTO comentarios VALUES(default,2,4,"bien!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,3,5,"muy buena tardee","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,3,1,"que pinta!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,4,2,"grande amigo!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,4,3,"daale!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,5,4,"aver si aprobamos","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,5,5,"de donde es la foto??","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,6,1,"que alegria","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,6,2,"noo que ganas!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,7,3,"facha","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,7,4,"Un placer!!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,8,5,"Buenisimo!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,8,1,"ganadores","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,9,2,"nasheee","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,9,3,"Que copado!!","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,10,4,"Bien ahi","2021-11-03 08:00:00");
INSERT INTO comentarios VALUES(default,10,5,"Que rico ese lugar","2021-11-03 08:00:00");

-- Para que funcione el follow-me 

ALTER TABLE usuarios DROP seguidores;
ALTER TABLE usuarios DROP seguidos;