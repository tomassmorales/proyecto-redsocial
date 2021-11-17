-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: redSocial
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES 
(default,NULL,"https://c.wallhere.com/photos/12/ce/mel_gibson_celebrity_face_smile_eyes-717975.jpg!d",'2000-07-04','2021-11-04 22:41:35','2021-11-04 22:41:35','tomasmorales','tomassmorales2707@gmail.com','$2a$10$J4r9bIQclCncnZ3gXPPWJOE4clXa0vASOLBaR3FtOxm7bp4gVLIjy'),
(default,NULL,"http://www.paredro.com/wp-content/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg",'2021-11-26','2021-11-08 14:18:56','2021-11-08 14:18:56','tomas','ejemploOtro@gmail.com','$2a$10$1YIOn6Ac6H9f4xsNUSV4HOSM0lfg7YK0psP7GvJc008l1CQIN8RVm'),
(default,NULL,"https://static2.abc.es/media/200912/14/davidmeca--300x180.jpg",'2000-07-27','2021-11-08 14:27:35','2021-11-08 14:27:35','tmorales','tmorales@udesa.edu.ar','$2a$10$kDAHWssh1cFdAldy2yUnQuXn6hlxa/ZorndNWsxQ1JPAv73VUxUCe'),
(default,NULL,"https://hips.hearstapps.com/ellees.h-cdn.co/assets/15/37/1024x1332/1024x1332-r-ti-rostros-dilatados-personas-energicas-12718630-1-esl-es-rostros-dilatados-personas-energicas-jpg.jpg?resize=480:*",'2021-11-17','2021-11-11 12:20:56','2021-11-11 12:20:56','ejemploTomas','ejemplo@udesa.edu.ar','$2a$10$cbc2vQGfR2/rQ9HEvAp.FeSIWE7S55nrEGa.9YqVJ16BJf85K5b6u'),
(default,NULL,"https://i.pinimg.com/736x/c8/e9/72/c8e972106158f5dd52b0b20c6292f089.jpg",'2007-03-01','2021-11-11 12:23:38','2021-11-11 12:23:38','juangonzales','juangonzales@gmail.com','$2a$10$vY0s72RRj.ExbQPqmjg48.WDHl2t1mbtoVIu4HGbKsl39AJqU8/qu');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-15  9:26:46
