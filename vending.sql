CREATE DATABASE  IF NOT EXISTS `vending` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `vending`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: vending
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `iditems` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_name` varchar(140) NOT NULL,
  `item_cost` int(10) unsigned NOT NULL,
  `item_description` varchar(140) DEFAULT NULL,
  `item_quantity` int(10) unsigned NOT NULL,
  `item_active` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`iditems`),
  UNIQUE KEY `iditems_UNIQUE` (`iditems`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'soda',100,'Coke Zero Sugar',29,1),(2,'candybar',150,'Snickers',15,1),(3,'gum',75,'Big Red',30,1),(4,'peanuts',25,'salty',20,1),(5,'banana',100,'seriously, its a banana',5,1),(6,'paperclip',500,'In case MacGyver shows up',1,1),(7,'fruit',25,'apple',5,1),(8,'fruit',25,'apple',5,1),(9,'fruity',25,'apples',6,1),(10,'testy',50,'testy',50,1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `idtransactions` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `transaction_item` int(10) unsigned NOT NULL,
  `transaction_debit` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idtransactions`),
  UNIQUE KEY `idtransactions_UNIQUE` (`idtransactions`),
  KEY `item_transaction_FK_idx` (`transaction_item`),
  CONSTRAINT `item_transaction_FK` FOREIGN KEY (`transaction_item`) REFERENCES `items` (`iditems`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (31,'2017-08-14 17:51:48',1,100),(32,'2017-08-14 17:52:03',2,150),(33,'2017-08-15 11:40:17',3,75);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-17 10:53:04
