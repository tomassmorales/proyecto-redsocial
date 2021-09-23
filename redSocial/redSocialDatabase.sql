CREATE DATABASE redSocial;
USE redSocial;

CREATE TABLE posts (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
usuario_id INT UNSIGNED,
imagen VARCHAR(2000) NOT NULL, 
descripcion VARCHAR(200),
fecha_creacion DATETIME NOT NULL,

FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
usuario_id INT UNSIGNED,
posteo_id VARCHAR(200) NOT NULL, 
texto VARCHAR(40),
fecha_creacion DATETIME NOT NULL,

FOREIGN KEY (posteo_id) REFERENCES comentarios (comentarioID)
);