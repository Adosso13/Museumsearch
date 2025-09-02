DROP DATABASE IF EXISTS museumsearch_dev;
CREATE DATABASE museumsearch_dev;
USE museumsearch_dev;

-- table des rôles
CREATE TABLE museumsearch_dev.role (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- table des utilisateurs
CREATE TABLE museumsearch_dev.user (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code CHAR(5) NOT NULL,
    country VARCHAR(50) NOT NULL,
    phone_number CHAR(10),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    role_id TINYINT UNSIGNED,
    
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- table des artistes
CREATE TABLE museumsearch_dev.artist (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    date_of_death DATE,
    biography TEXT NOT NULL,
    nationality VARCHAR(255) NOT NULL
);

-- table des types de lieux
CREATE TABLE museumsearch_dev.type_of_place (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- table des lieux
CREATE TABLE museumsearch_dev.place (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    date_of_creation DATE,
    average_visit_time TIME,

    type_of_place_id TINYINT UNSIGNED,
    
    FOREIGN KEY (type_of_place_id) REFERENCES type_of_place(id)
);

-- table des types d'œuvres
CREATE TABLE museumsearch_dev.type_of_work (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- table des œuvres d’art
CREATE TABLE museumsearch_dev.work_of_art (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    date_of_creation DATE,
    description TEXT,

    type_of_work_id TINYINT UNSIGNED,
    place_id TINYINT UNSIGNED,
    artist_id TINYINT UNSIGNED,

    FOREIGN KEY (type_of_work_id) REFERENCES type_of_work(id),
    FOREIGN KEY (place_id) REFERENCES place(id),
    FOREIGN KEY (artist_id) REFERENCES artist(id)
);

CREATE TABLE museumsearch_dev.work_of_art_user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    view BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE,
    wishlist BOOLEAN DEFAULT FALSE,

    work_of_art_id TINYINT UNSIGNED,
    user_id TINYINT UNSIGNED,

    FOREIGN KEY (work_of_art_id) REFERENCES work_of_art (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE museumsearch_dev.place_user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    visit BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE,
    wishlist BOOLEAN DEFAULT FALSE,

    place_id TINYINT UNSIGNED,
    user_id TINYINT UNSIGNED,

    FOREIGN KEY (place_id) REFERENCES place (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Insert pour game 
INSERT INTO museumsearch_dev.role
VALUES
-- -- pour la PK utiliser NULL pour l'auto incrémentation
    (NULL, 'admin'),
    (NULL, 'user')
;

INSERT INTO museumsearch_dev.user (id, lastname, firstname, date_of_birth, address, city, postal_code, country, phone_number, email, password, role_id)
VALUES
   (NULL, 'Ahmed', "dosso", '2015-03-24', '9 place Andre MASSON', "Paris", "75013", "France", '0767312389','ahmed.dosso13@gmail.com','hvjhg', 1),
   (NULL, 'Ahmed', "dosso", '2015-03-24', '9 place Andre MASSON', "Paris", "75013", "France", '0767312389','ahmed.dosso@gmail.com','hvjhg', 2)
;