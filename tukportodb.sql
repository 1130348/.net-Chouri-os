-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 11, 2016 at 04:03 PM
-- Server version: 5.5.44
-- PHP Version: 7.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tukportodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `percursos`
--

CREATE TABLE IF NOT EXISTS `percursos` (
`id` int(10) NOT NULL,
  `pontoPassagemID` int(10) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `percursos`
--

INSERT INTO `percursos` (`id`, `pontoPassagemID`, `descricao`, `data`) VALUES
(1, 1, 'Percurso da Semana do Peixe Assado', '2016-12-08');

-- --------------------------------------------------------

--
-- Table structure for table `pontos de passagem`
--

CREATE TABLE IF NOT EXISTS `pontos de passagem` (
`id` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `gps_lat` double NOT NULL,
  `gps_long` double NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `pontos de passagem`
--

INSERT INTO `pontos de passagem` (`id`, `nome`, `descricao`, `gps_lat`, `gps_long`) VALUES
(1, 'Estadio do Dragao', 'Estadio e Museu do FCP ', 41.16173, -8.583859);

-- --------------------------------------------------------

--
-- Table structure for table `turistas`
--

CREATE TABLE IF NOT EXISTS `turistas` (
`id` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nacionalidade` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `percursoID` int(10) NOT NULL,
  `passw` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `turistas`
--

INSERT INTO `turistas` (`id`, `nome`, `nacionalidade`, `email`, `percursoID`, `passw`) VALUES
(1, 'Egidio Santos', 'Portugues', '1130348@isep.ipp.pt', 1, '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `percursos`
--
ALTER TABLE `percursos`
 ADD PRIMARY KEY (`id`), ADD KEY `pontoPassagemID` (`pontoPassagemID`);

--
-- Indexes for table `pontos de passagem`
--
ALTER TABLE `pontos de passagem`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `turistas`
--
ALTER TABLE `turistas`
 ADD PRIMARY KEY (`id`), ADD KEY `percursoID` (`percursoID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `percursos`
--
ALTER TABLE `percursos`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pontos de passagem`
--
ALTER TABLE `pontos de passagem`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `turistas`
--
ALTER TABLE `turistas`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `percursos`
--
ALTER TABLE `percursos`
ADD CONSTRAINT `fk_id` FOREIGN KEY (`pontoPassagemID`) REFERENCES `pontos de passagem` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `turistas`
--
ALTER TABLE `turistas`
ADD CONSTRAINT `percurso_id` FOREIGN KEY (`percursoID`) REFERENCES `percursos` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
