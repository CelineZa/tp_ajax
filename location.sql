CREATE DATABASE IF NOT EXISTS mikemonroi;

USE mikemonroi;

CREATE TABLE location (
	id_location INT(4) NOT NULL AUTO_INCREMENT,
	marque VARCHAR(30) NOT NULL,
	modele VARCHAR(30) NOT NULL,
	annee INT(4) NOT NULL,
	couleur ENUM ('black','white','blue','mike'),
	image VARCHAR(200),
PRIMARY KEY (id_location)
)ENGINE=InnoDB;



