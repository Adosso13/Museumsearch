DROP DATABASE IF EXISTS museumsearch_dev;

CREATE DATABASE museumsearch_dev;

-- table des rôles
CREATE TABLE museumsearch_dev.role (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- table des utilisateurs
CREATE TABLE museumsearch_dev.user (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    date_of_death DATE,
    biography TEXT NOT NULL,
    nationality VARCHAR(255) NOT NULL
);

-- table des types de lieux
CREATE TABLE museumsearch_dev.type_of_place (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- table des lieux
CREATE TABLE museumsearch_dev.place (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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

-- Insert  
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

-- Insertions pour la table artist du musées parisiens
INSERT INTO museumsearch_dev.artist (id, name, image, date_of_birth, date_of_death, biography, nationality) 
VALUES
    -- 1. Léonard de Vinci
    (
        NULL,
        'Léonard de Vinci', 
        'leonard_de_vinci.jpg', 
        '1452-04-15', 
        '1519-05-02', 
        'Génie de la Renaissance italienne, Léonard de Vinci est à la fois peintre, inventeur, ingénieur, scientifique, humaniste, philosophe et anatomiste. Il incarne l''idéal de l''homme de la Renaissance par sa curiosité et son talent dans de multiples domaines. Ses œuvres les plus célèbres incluent La Joconde et La Cène. Il a également produit de nombreux dessins scientifiques et techniques, anticipant des inventions modernes comme l''hélicoptère ou le char d''assaut.', 
        'Italienne'
    ),

    -- 2. Eugène Delacroix
    (
        NULL,
        'Eugène Delacroix',
        'eugene_delacroix.jpg',
        '1798-04-26',
        '1863-08-13',
        'Chef de file du romantisme français, Eugène Delacroix révolutionne la peinture par sa technique libre et expressive. Il privilégie la couleur et le mouvement, s''inspirant de l''art de Rubens et des orientalistes. Son œuvre la plus célèbre, "La Liberté guidant le peuple", symbolise l''esprit révolutionnaire français. Delacroix influence profondément les impressionnistes et les post-impressionnistes par sa modernité et son approche novatrice de la couleur.',
        'Française'
    ),

    -- 3. Pablo Picasso
    (
        NULL,
        'Pablo Picasso',
        'pablo_picasso.jpg',
        '1881-10-25',
        '1973-04-08',
        'Artiste révolutionnaire du XXe siècle, Pablo Picasso co-fonde le mouvement cubiste avec Georges Braque. Son œuvre traverse plusieurs périodes distinctes : bleue, rose, cubiste, néoclassique et surréaliste. Peintre prolifique, il réalise plus de 50 000 œuvres. "Les Demoiselles d''Avignon" marque une rupture dans l''art occidental. Picasso révolutionne la représentation artistique et influence durablement l''art moderne par ses innovations constantes et sa créativité sans limites.',
        'Espagnole'
    ),

    -- 4. Auguste Rodin
    (
        NULL,
        'Auguste Rodin',
        'auguste_rodin.jpg',
        '1840-11-12',
        '1917-11-17',
        'Sculpteur français considéré comme le père de la sculpture moderne, Auguste Rodin libère cet art des conventions académiques. Ses œuvres les plus célèbres incluent "Le Penseur", "Le Baiser" et "Les Bourgeois de Calais". Il révolutionne la sculpture par son expressivité, son réalisme psychologique et sa technique novatrice. Rodin capture l''émotion humaine dans le bronze et le marbre, créant des œuvres d''une intensité dramatique saisissante qui influencent toute la sculpture contemporaine.',
        'Française'
    ),

    -- 5. Claude Monet
    (
        NULL,
        'Claude Monet',
        'claude_monet.jpg',
        '1840-11-14',
        '1926-12-05',
        'Fondateur de l''impressionnisme français, Claude Monet révolutionne la peinture par sa technique de plein air et sa recherche des effets de lumière. Sa toile "Impression, soleil levant" donne son nom au mouvement impressionniste. Obsédé par les variations lumineuses, il peint en série : les Cathédrales de Rouen, les Meules, les Nymphéas. Dans sa propriété de Giverny, il crée un jardin aquatique qui inspire ses dernières œuvres monumentales, véritables chefs-d''œuvre de l''art occidental.',
        'Française'
    ),

    -- 6. Gustave Courbet
    (
        NULL,
        'Gustave Courbet',
        'gustave_courbet.jpg',
        '1819-06-10',
        '1877-12-31',
        'Père du réalisme en peinture, Gustave Courbet rompt avec l''idéalisme romantique et académique pour représenter la réalité sociale de son époque. Il peint des scènes de la vie quotidienne, des paysans et des ouvriers avec une vérité crue. Ses œuvres comme "L''Enterrement à Ornans" et "L''Atelier du peintre" font scandale par leur réalisme. Courbet revendique une peinture engagée socialement et influence profondément les générations suivantes d''artistes par son approche révolutionnaire.',
        'Française'
    ),

    -- 7. Jean-Auguste-Dominique Ingres
    (
        NULL,
        'Jean-Auguste-Dominique Ingres',
        'jean_auguste_dominique_ingres.jpg',
        '1780-08-29',
        '1867-01-14',
        'Peintre néoclassique français, Ingres se distingue par la pureté de son dessin et la perfection de sa technique. Élève de David, il développe un style personnel caractérisé par la précision du trait et l''élégance des formes. Ses portraits d''une finesse extraordinaire et ses nus sensuels comme "La Grande Odalisque" marquent l''art du XIXe siècle. Ingres défend la primauté du dessin face aux coloristes romantiques, incarnant l''excellence de l''École française de peinture.',
        'Française'
    ),

    -- 8. Pierre-Auguste Renoir
    (
        NULL,
        'Pierre-Auguste Renoir',
        'pierre_auguste_renoir.jpg',
        '1841-02-25',
        '1919-12-03',
        'Figure majeure de l''impressionnisme, Renoir célèbre la joie de vivre par sa peinture lumineuse et colorée. Il excelle dans les scènes de bonheur bourgeois, les portraits féminins et les nus nacrés. Ses œuvres comme "Le Déjeuner des canotiers" et "Les Grandes Baigneuses" rayonnent de sensualité et d''optimisme. Malgré l''arthrite qui déforme ses mains en fin de vie, il continue de peindre avec passion, léguant un art joyeux qui célèbre la beauté et la sensualité de l''existence.',
        'Française'
    ),

    -- 9. Édouard Manet
    (
        NULL,
        'Édouard Manet',
        'edouard_manet.jpg',
        '1832-01-23',
        '1883-04-30',
        'Précurseur de l''art moderne, Manet révolutionne la peinture par sa technique libre et ses sujets contemporains. Ses œuvres "Le Déjeuner sur l''herbe" et "Olympia" font scandale au Salon par leur modernité provocante. Il simplifie la palette, élimine les demi-teintes et peint avec une franchise qui annonce l''impressionnisme. Bien qu''il ne participe jamais aux expositions impressionnistes, Manet influence profondément ce mouvement et ouvre la voie à l''art du XXe siècle par son approche révolutionnaire.',
        'Française'
    ),

    -- 10. Vincent van Gogh
    (
        NULL,
        'Vincent van Gogh',
        'vincent_van_gogh.jpg',
        '1853-03-30',
        '1890-07-29',
        'Post-impressionniste néerlandais, Van Gogh développe un style unique caractérisé par des couleurs intenses et des coups de pinceau expressifs. En seulement dix années de création, il produit plus de 2000 œuvres, incluant "La Nuit étoilée" et la série des "Tournesols". Malgré des troubles mentaux qui marquent sa vie, son génie artistique transparaît dans chaque toile. Incompris de son vivant, Van Gogh devient posthumément l''un des artistes les plus célèbres au monde, influençant l''expressionnisme et l''art moderne.', 
        'Néerlandaise'
    )
;

INSERT INTO museumsearch_dev.type_of_place
VALUES
   (NULL, 'Museum'),
   (NULL, 'Castle'),
   (NULL, 'Cathedral'),
   (NULL, 'Gallery')
;

INSERT INTO museumsearch_dev.place (id, name, image, description, address, date_of_creation, average_visit_time, type_of_place_id)
VALUES

    -- 1. Musée du Louvre
    (
        NULL,
        'Musée du Louvre',
        'louvre_facade.jpg',
        'Le plus grand musée du monde et monument historique situé au cœur de Paris. Ancien palais royal, le Louvre abrite des collections exceptionnelles couvrant 9 000 ans d''histoire et de civilisations. Il expose notamment la Joconde de Léonard de Vinci, la Vénus de Milo et la Victoire de Samothrace. Avec ses 35 000 œuvres exposées sur 72 735 m², c''est un incontournable du patrimoine mondial.',
        'Rue de Rivoli, 75001 Paris',
        '1793-08-10',
        '04:00:00',
        1
    ),

    -- 2. Musée d'Orsay
    (
        NULL,
        'Musée d''Orsay',
        'orsay_interior.jpg',
        'Installé dans une ancienne gare ferroviaire de 1900, le musée d''Orsay possède la plus riche collection d''œuvres impressionnistes au monde. Il présente l''art occidental de 1848 à 1914 avec des chefs-d''œuvre de Renoir, Monet, Van Gogh, Degas, Cézanne et bien d''autres. L''architecture remarquable de l''ancienne gare Beauvais-Orsay ajoute un charme unique à la visite.',
        '1 Rue de la Légion d''Honneur, 75007 Paris',
        '1986-12-01',
        '02:30:00',
        1
    ),

    -- 3. Centre Pompidou
    (
        NULL,
        'Centre Pompidou',
        'pompidou_exterior.jpg',
        'Centre national d''art et de culture moderne, reconnaissable à son architecture révolutionnaire aux structures colorées apparentes. Il abrite la plus importante collection d''art moderne et contemporain d''Europe, avec des œuvres de Picasso, Kandinsky, Matisse, Duchamp... Le centre propose également des expositions temporaires innovantes et une vue panoramique sur Paris depuis son sommet.',
        'Place Georges-Pompidou, 75004 Paris',
        '1977-01-31',
        '03:00:00',
        1
    ),

    -- 4. Musée Rodin
    (
        NULL,
        'Musée Rodin',
        'rodin_garden.jpg',
        'Installé dans l''hôtel Biron du XVIIIe siècle et son magnifique jardin de sculptures, le musée Rodin présente la plus importante collection au monde des œuvres du sculpteur Auguste Rodin. On y découvre "Le Penseur", "Le Baiser", "Les Bourgeois de Calais" ainsi que les œuvres de Camille Claudel. Le jardin de 3 hectares offre un cadre exceptionnel pour admirer les sculptures monumentales.',
        '77 Rue de Varenne, 75007 Paris',
        '1919-08-04',
        '02:00:00',
        1
    ),

    -- 5. Musée Picasso
    (
        NULL,
        'Musée Picasso',
        'picasso_hotel_sale.jpg',
        'Situé dans l''hôtel Salé, magnifique demeure du XVIIe siècle dans le Marais, le musée Picasso conserve la plus importante collection publique d''œuvres de Pablo Picasso au monde. Plus de 5 000 œuvres retracent toute la carrière de l''artiste : peintures, sculptures, dessins, gravures, céramiques, de la période bleue au cubisme jusqu''aux dernières créations.',
        '5 Rue de Thorigny, 75003 Paris',
        '1985-09-28',
        '02:00:00',
        1
    ),

    -- 6. Musée de l'Armée - Invalides
    (
        NULL,
        'Musée de l''Armée - Invalides',
        'invalides_dome.jpg',
        'Situé dans l''emblématique Hôtel des Invalides sous le Dôme doré, ce musée retrace l''histoire militaire française de l''Antiquité à nos jours. Il abrite le tombeau de Napoléon Ier, des collections d''armures, d''armes historiques et d''uniformes exceptionnelles. L''architecture grandiose du monument et la crypte impériale en font un lieu chargé d''histoire et d''émotion.',
        '129 Rue de Grenelle, 75007 Paris',
        '1905-07-16',
        '03:00:00',
        1
    ),

    -- 7. Musée Carnavalet
    (
        NULL,
        'Musée Carnavalet - Histoire de Paris',
        'carnavalet_courtyard.jpg',
        'Dédié à l''histoire de Paris, ce musée occupe deux hôtels particuliers historiques du Marais : l''hôtel Carnavalet et l''hôtel Le Peletier de Saint-Fargeau. Il retrace 2 600 ans d''histoire parisienne à travers des collections exceptionnelles : meubles, peintures, sculptures, objets d''art. De la Préhistoire à nos jours, découvrez l''évolution de la capitale française.',
        '23 Rue de Sévigné, 75003 Paris',
        '1880-02-25',
        '02:30:00',
        1
    ),

    -- 8. Musée des Arts Décoratifs
    (
        NULL,
        'Musée des Arts Décoratifs',
        'arts_decoratifs_facade.jpg',
        'Installé dans l''aile de Marsan du palais du Louvre, le musée des Arts décoratifs présente l''art de vivre à la française du Moyen Âge à nos jours. Ses collections exceptionnelles couvrent les arts décoratifs, la mode, la publicité et les arts graphiques. Mobilier, bijoux, textiles, céramiques, verreries témoignent du savoir-faire et de la créativité française à travers les siècles.',
        '107 Rue de Rivoli, 75001 Paris',
        '1905-05-29',
        '02:30:00',
        1
    ),

    -- 9. Musée Cluny - Musée national du Moyen Âge
    (
        NULL,
        'Musée de Cluny - Musée national du Moyen Âge',
        'cluny_facade.jpg',
        'Situé dans l''hôtel de Cluny, rare exemple d''architecture civile gothique parisienne, et sur les vestiges des thermes gallo-romains, ce musée présente l''une des plus belles collections d''art médiéval au monde. Il abrite la célèbre tenture de "La Dame à la licorne", des sculptures, orfèvreries, manuscenluminés et vitraux qui témoignent de la richesse artistique du Moyen Âge.',
        '6 Place Paul Painlevé, 75005 Paris',
        '1844-03-24',
        '02:00:00',
        1
    ),

    -- 10. Musée Jacquemart-André
    (
        NULL,
        'Musée Jacquemart-André',
        'jacquemart_andre_facade.jpg',
        'Ancien hôtel particulier du XIXe siècle, ce musée présente les collections exceptionnelles rassemblées par Édouard André et Nélie Jacquemart. Les appartements privés reconstitués abritent des chefs-d''œuvre de l''art français du XVIIIe siècle et de l''art italien de la Renaissance : Fragonard, Boucher, Chardin, Botticelli, Donatello... L''élégance des salons d''époque offre un cadre raffiné à ces trésors artistiques.',
        '158 Boulevard Haussmann, 75008 Paris',
        '1913-12-01',
        '01:30:00',
        1
    )
;

INSERT INTO museumsearch_dev.type_of_work
VALUES
   (NULL, 'Painting'),
   (NULL, 'Sculpture'),
   (NULL, 'Photography'),
   (NULL, 'Jewelry'),
   (NULL, 'clothing and textile'),
   (NULL, 'Tapestry'),
   (NULL, 'Ceramics'),
   (NULL, 'Weapons and Armor')
; 

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