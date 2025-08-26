DROP DATABASE IF EXISTS museumsearch_dev;

CREATE DATABASE museumsearch_dev;

-- cree une table 

-- table des roles
CREATE TABLE gamecollec_dev.role(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);