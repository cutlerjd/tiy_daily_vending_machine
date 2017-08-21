CREATE SCHEMA `vending` ;

CREATE TABLE `vending`.`items` (
  `iditems` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(140) NOT NULL,
  `item_cost` INT UNSIGNED NOT NULL,
  `item_description` VARCHAR(140) NULL,
  `item_quantity` INT UNSIGNED NOT NULL,
  `item_active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`iditems`),
  UNIQUE INDEX `iditems_UNIQUE` (`iditems` ASC));
CREATE TABLE `vending`.`transactions` (
  `idtransactions` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL DEFAULT current_timestamp(),
  `transaction_item` INT UNSIGNED NOT NULL,
  `transaction_debit` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idtransactions`),
  UNIQUE INDEX `idtransactions_UNIQUE` (`idtransactions` ASC),
  INDEX `item_transaction_FK_idx` (`transaction_item` ASC),
  CONSTRAINT `item_transaction_FK`
    FOREIGN KEY (`transaction_item`)
    REFERENCES `vending`.`items` (`iditems`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
