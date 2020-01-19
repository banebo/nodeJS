-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema node_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema node_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `node_db` ;
USE `node_db` ;

-- -----------------------------------------------------
-- Table `node_db`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_db`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_db`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_db`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_db`.`Document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_db`.`Document` (
  `idDocument` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NOT NULL,
  `idOwner` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDocument`),
  INDEX `fk_Document_User_idx` (`idOwner` ASC) ,
  CONSTRAINT `fk_Document_User`
    FOREIGN KEY (`idOwner`)
    REFERENCES `node_db`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_db`.`User_has_Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_db`.`User_has_Role` (
  `idUser` INT NOT NULL,
  `idRole` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idRole`),
  INDEX `fk_User_has_Role_Role1_idx` (`idRole` ASC) ,
  INDEX `fk_User_has_Role_User1_idx` (`idUser` ASC) ,
  CONSTRAINT `fk_User_has_Role_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `node_db`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Role_Role1`
    FOREIGN KEY (`idRole`)
    REFERENCES `node_db`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
