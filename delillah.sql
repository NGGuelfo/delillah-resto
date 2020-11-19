-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.14-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para delillah
CREATE DATABASE IF NOT EXISTS `delillah` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `delillah`;

-- Volcando estructura para tabla delillah.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status_id` int(1) NOT NULL,
  `payment_id` int(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.orders: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `order_date`, `status_id`, `payment_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
	(2, '2020-11-18 23:54:47', 2, 1, 2, '2020-11-18 23:54:47', '2020-11-19 00:45:30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Volcando estructura para tabla delillah.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.order_details: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `product_quantity`, `createdAt`, `updatedAt`) VALUES
	(3, 2, 4, 1, '2020-11-18 23:54:47', '2020-11-18 23:54:47'),
	(4, 2, 6, 2, '2020-11-18 23:54:47', '2020-11-18 23:54:47');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;

-- Volcando estructura para tabla delillah.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.payments: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` (`id`, `payment_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Efectivo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Tarjeta de Credito/Debito', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Volcando estructura para tabla delillah.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(255) NOT NULL,
  `prod_detail` varchar(255) NOT NULL,
  `prod_price` int(4) NOT NULL,
  `prod_img` varchar(255) DEFAULT NULL,
  `prod_isFav` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.products: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `prod_name`, `prod_detail`, `prod_price`, `prod_img`, `prod_isFav`, `createdAt`, `updatedAt`) VALUES
	(2, 'Hamburguesa Casera', 'Hamburguesa completa con jamon, queso , lechuga y tomate', 780, NULL, 0, '0000-00-00 00:00:00', '2020-11-18 23:33:56'),
	(4, 'Salmon con ensalada', 'Salmon cocido con ensalada mixta', 1000, NULL, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'Asado con guarnicion', 'Asado de tira a la parrilla con papas fritas', 960, NULL, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Ravioles con salsa', 'Ravioles con salsa bolognesa', 800, NULL, 0, '2020-11-18 23:28:31', '2020-11-18 23:28:31');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Volcando estructura para tabla delillah.statuses
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.statuses: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` (`id`, `status_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nuevo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Confirmado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'En Preparacion', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'Enviado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'Cancelado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Entregado', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;

-- Volcando estructura para tabla delillah.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_admin` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla delillah.users: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `user`, `password`, `fullname`, `email`, `phone`, `address`, `is_admin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '123456', 'Admin', 'ejemplo@admin.com', 45213568, 'Admin', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'NGuelfo', '987654321', 'Nicolas Giancarlo Guelfo', 'nguelfo@delillah.com', 48569845, 'Nazca 1234', 0, '0000-00-00 00:00:00', '2020-11-19 00:50:14'),
	(3, 'ABayugar', '987654', 'Antonella Bayugar', 'abayugar@delillah.com', 46523562, 'Nazca 7895', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'NEndoRuiz', '12345678', 'Nicol Endo Ruiz', 'nendo@delillah.com', 45213659, 'Nazca 1546', 0, '2020-11-18 23:02:43', '2020-11-18 23:02:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
