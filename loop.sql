-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2016 a las 16:56:44
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `loop`
--
CREATE DATABASE IF NOT EXISTS `loop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `loop`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loopuser`
--

CREATE TABLE `loopuser` (
  `id` int(11) NOT NULL,
  `fbId` varchar(150) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(80) NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `loopuser`
--

INSERT INTO `loopuser` (`id`, `fbId`, `name`, `email`, `telephone`, `birthday`, `password`) VALUES
(1, '100001079045514', 'Mario Hemanuel VU', 'mvargas0294@hotmail.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mision`
--

CREATE TABLE `mision` (
  `id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `proyects_id` int(11) NOT NULL,
  `population` varchar(45) NOT NULL,
  `justification` varchar(150) NOT NULL,
  `sponsor` varchar(45) DEFAULT NULL,
  `budget` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetive`
--

CREATE TABLE `objetive` (
  `id` int(11) NOT NULL,
  `mision_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `scope` varchar(45) DEFAULT NULL,
  `limiting` varchar(45) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `status` binary(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetives`
--

CREATE TABLE `objetives` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `status` binary(0) DEFAULT NULL,
  `starts` datetime DEFAULT NULL,
  `ends` datetime DEFAULT NULL,
  `objetive_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `process`
--

CREATE TABLE `process` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) NOT NULL,
  `dependencies` varchar(45) DEFAULT NULL,
  `objetives_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyect_type`
--

CREATE TABLE `proyect_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyects`
--

CREATE TABLE `proyects` (
  `id` int(11) NOT NULL,
  `vision_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  `proyect_type_id` int(11) NOT NULL,
  `vision` varchar(150) NOT NULL,
  `starts` datetime NOT NULL,
  `ends` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vision`
--

CREATE TABLE `vision` (
  `id` int(11) NOT NULL,
  `loopUser_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `lapse` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `loopuser`
--
ALTER TABLE `loopuser`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mision`
--
ALTER TABLE `mision`
  ADD PRIMARY KEY (`id`,`proyects_id`),
  ADD KEY `fk_mision_proyects1_idx` (`proyects_id`);

--
-- Indices de la tabla `objetive`
--
ALTER TABLE `objetive`
  ADD PRIMARY KEY (`id`,`mision_id`),
  ADD KEY `fk_objetive_mision1_idx` (`mision_id`);

--
-- Indices de la tabla `objetives`
--
ALTER TABLE `objetives`
  ADD PRIMARY KEY (`id`,`objetive_id`),
  ADD KEY `fk_objetives_objetive1_idx` (`objetive_id`);

--
-- Indices de la tabla `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`,`objetives_id`),
  ADD KEY `fk_process_objetives1_idx` (`objetives_id`);

--
-- Indices de la tabla `proyect_type`
--
ALTER TABLE `proyect_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD PRIMARY KEY (`id`,`vision_id`,`proyect_type_id`),
  ADD KEY `fk_proyects_vision1_idx` (`vision_id`),
  ADD KEY `fk_proyects_proyect_type1_idx` (`proyect_type_id`);

--
-- Indices de la tabla `vision`
--
ALTER TABLE `vision`
  ADD PRIMARY KEY (`id`,`loopUser_id`),
  ADD KEY `fk_vision_loopUser1_idx` (`loopUser_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `loopuser`
--
ALTER TABLE `loopuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `mision`
--
ALTER TABLE `mision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `objetive`
--
ALTER TABLE `objetive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `process`
--
ALTER TABLE `process`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `proyect_type`
--
ALTER TABLE `proyect_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `proyects`
--
ALTER TABLE `proyects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `vision`
--
ALTER TABLE `vision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mision`
--
ALTER TABLE `mision`
  ADD CONSTRAINT `fk_mision_proyects1` FOREIGN KEY (`proyects_id`) REFERENCES `proyects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `objetive`
--
ALTER TABLE `objetive`
  ADD CONSTRAINT `fk_objetive_mision1` FOREIGN KEY (`mision_id`) REFERENCES `mision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `objetives`
--
ALTER TABLE `objetives`
  ADD CONSTRAINT `fk_objetives_objetive1` FOREIGN KEY (`objetive_id`) REFERENCES `objetive` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `process`
--
ALTER TABLE `process`
  ADD CONSTRAINT `fk_process_objetives1` FOREIGN KEY (`objetives_id`) REFERENCES `objetives` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD CONSTRAINT `fk_proyects_proyect_type1` FOREIGN KEY (`proyect_type_id`) REFERENCES `proyect_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_proyects_vision1` FOREIGN KEY (`vision_id`) REFERENCES `vision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vision`
--
ALTER TABLE `vision`
  ADD CONSTRAINT `fk_vision_loopUser1` FOREIGN KEY (`loopUser_id`) REFERENCES `loopuser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
