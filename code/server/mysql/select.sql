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


INSERT INTO museumsearch_dev.place (id, name, image, description, address, date_of_creation, average_visit_time)
VALUES
   (NULL, 'Léonard de Vinci', "ghost-of-tsushima.webp", '1452-04-14', '1519-05-02', "Si Léonard de Vinci est surtout connu pour sa peinture, il se définit aussi comme ingénieur, architecte et scientifique. Les connaissances initialement utiles à la peinture deviennent pour lui une fin en soi. Ses centres d'intérêt sont très nombreux : optique, géologie, botanique, hydrodynamique, architecture, astronomie, acoustique, physiologie et anatomie.", "France"),
   (NULL, 'DAhmed', "ghost-of-tsushima.webp", '2000-03-24', '2015-03-24', "svvdvdisbcydgyivsdgyxyydvdiyv", "France")
;

(id, name, image, description, address, date_of_creation, average_visit_time, type_of_place)

-- Insertion de 10 œuvres d'art célèbres des musées parisiens
INSERT INTO museumsearch_dev.work_of_art (id, name, image, date_of_creation, description, type_of_work_id, place_id, artist_id) 
VALUES
    -- 1. La Joconde - Musée du Louvre
    (
        NULL,
        'La Joconde', 
        'joconde.jpg', 
        '1506-01-01', 
        "Portrait de Lisa Gherardini, épouse de Francesco del Giocondo, cette œuvre est considérée comme le chef-d'œuvre de Léonard de Vinci. Le sourire énigmatique du modèle et la technique du sfumato font de ce tableau l''une des peintures les plus célèbres au monde. L''œuvre mesure 77 × 53 cm et est peinte à l''huile sur panneau de bois de peuplier.", 
        1, 1, 1
    ),

    -- 2. La Liberté guidant le peuple - Musée du Louvre
    (
        NULL,
        'La Liberté guidant le peuple',
        'liberte_guidant_peuple.jpg',
        '1830-01-01',
        'Cette œuvre emblématique d''Eugène Delacroix représente la Révolution de juillet 1830. La figure allégorique de la Liberté, seins nus et tenant le drapeau tricolore, guide le peuple parisien vers la victoire. Cette peinture romantique de 260 × 325 cm capture l''esprit révolutionnaire français et est devenue un symbole national.', 
        1, 1, 2
    ),

    -- 3. Les Demoiselles d'Avignon - Centre Pompidou
    (
        NULL,
        "Les Demoiselles d'Avignon", 
        'demoiselles_avignon.jpg', 
        '1907-01-01', 
        "Œuvre révolutionnaire de Pablo Picasso marquant la naissance du cubisme. Cette peinture représente cinq femmes nues aux formes géométriques et aux visages inspirés de l'art ibérique et africain. Mesurant 243 × 233 cm, elle bouleverse les conventions artistiques traditionnelles et ouvre la voie à l'art moderne.", 
        1, 2, 3
    ),

    -- 4. Le Penseur - Musée Rodin
    (
        NULL,
        'Le Penseur', 
        'penseur.jpg', 
        '1902-01-01', 
        "Sculpture emblématique d'Auguste Rodin représentant un homme nu assis, plongé dans une méditation profonde. Initialement conçue pour surmonter ''Les Portes de l'Enfer'', cette œuvre de bronze de 186 cm de hauteur symbolise la réflexion intellectuelle et est devenue l'une des sculptures les plus reconnaissables au monde.", 
        2, 3, 4
    ),

    -- 5. Les Nymphéas - Musée de l'Orangerie
    (
        NULL,
        'Les Nymphéas', 
        'nympheas.jpg', 
        '1919-01-01', 
        "Série de peintures monumentales de Claude Monet représentant son jardin de Giverny. Ces œuvres impressionnistes, disposées dans deux salles ovales spécialement conçues, créent un environnement immersif de 200 mètres linéaires. Elles illustrent la fascination du peintre pour les reflets de la lumière sur l'eau et les variations chromatiques.", 
        1, 4, 5
    ),

    -- 6. Les Demoiselles de la Seine - Musée du Petit Palais
    (
        NULL,
        'Jeunes Femmes au bord de Seine', 
        'jeunes_femmes_seine.jpg', 
        '1857-01-01', 
        "Peinture de Gustave Courbet représentant deux bourgeoises se reposant au bord de la Seine. Cette œuvre réaliste de 174 × 206 cm fait scandale à l\'époque par sa représentation peu flatteuse de la bourgeoisie. Courbet y critique subtilement la société de son temps à travers ces figures alanguies et oisives.", 
        1, 5, 6
    ),

    -- 7. La Grande Odalisque - Musée du Louvre
    (
        NULL,
        'La Grande Odalisque', 
        'grande_odalisque.jpg', 
        '1814-01-01', 
        "Chef-d'œuvre orientaliste de Jean-Auguste-Dominique Ingres représentant une concubine dans un harem. Cette huile sur toile de 91 × 162 cm se distingue par ses déformations anatomiques volontaires, notamment l'allongement du dos, et par la richesse des détails décoratifs. L'œuvre illustre parfaitement le style néoclassique d'Ingres.", 
        1, 1, 7
    ),

    -- 8. La Danse - Musée d'Orsay
    (
        NULL,
        'La Danse à Bougival', 
        'danse_bougival.jpg', 
        '1883-01-01', 
        'Peinture impressionniste de Pierre-Auguste Renoir représentant un couple dansant dans la guinguette de Bougival. Cette œuvre de 182 × 98 cm capture la joie de vivre de la société parisienne de la Belle Époque. La technique impressionniste de Renoir se manifeste par ses touches libres et sa palette lumineuse.', 
        1, 6, 8
    ),

    -- 9. L'Origine du monde - Musée d'Orsay
    (
        NULL,
        "L'Origine du monde", 
        'origine_monde.jpg', 
        '1866-01-01', 
        "Peinture controversée de Gustave Courbet représentant le sexe féminin de manière explicite. Cette huile sur toile de 46 × 55 cm, longtemps cachée, illustre le réalisme radical de Courbet et sa volonté de peindre la vérité sans fard. L'œuvre questionne les tabous de la représentation du corps féminin.", 
        1, 6, 6
    ),

    -- 10. Le Déjeuner sur l'herbe - Musée d'Orsay
    (
        NULL,
        "Le Déjeuner sur l'herbe", 
        'dejeuner_herbe.jpg', 
        '1863-01-01', 
        "Œuvre révolutionnaire d'Édouard Manet qui fait scandale au Salon des Refusés de 1863. Cette peinture de 208 × 265 cm représente une femme nue déjeunant avec des hommes habillés dans un sous-bois. Elle marque la transition entre le réalisme de Courbet et l'impressionnisme naissant, bousculant les conventions académiques.", 
        1, 6, 9
    )
;

-- Note: Vous devrez ajuster les valeurs des foreign keys (type_of_work_id, place_id, artist_id) 
-- selon les données présentes dans vos tables de référence :
-- type_of_work : 1=Peinture, 2=Sculpture, etc.
-- place : 1=Louvre, 2=Centre Pompidou, 3=Musée Rodin, 4=Orangerie, 5=Petit Palais, 6=Musée d'Orsay
-- artist : 1=Léonard de Vinci, 2=Delacroix, 3=Picasso, 4=Rodin, 5=Monet, 6=Courbet, 7=Ingres, 8=Renoir, 9=Manet