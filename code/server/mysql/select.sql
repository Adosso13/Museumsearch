CREATE TABLE museumsearch_dev.work_of_art_user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    view BOOLEAN DEFAULT FAULSE,
    favorite BOOLEAN DEFAULT FAULSE,
    wishlist BOOLEAN DEFAULT FAULSE,
    FOREIGN KEY (work_of_art_id) REFERENCES work_of_art (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE museumsearch_dev.place_user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    visit BOOLEAN DEFAULT FAULSE,
    favorite BOOLEAN DEFAULT FAULSE,
    wishlist BOOLEAN DEFAULT FAULSE,
    FOREIGN KEY (place_id) REFERENCES place (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);



