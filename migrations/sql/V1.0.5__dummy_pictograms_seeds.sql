-- Seed sign_category_options table with size options
INSERT INTO sign_pictogram_category (id, name) VALUES
(1, 'Cautionary'),
(2, 'Emergency'),
(3, 'Guidance & information'),
(4, 'Regulatory'),
(5, 'Traffic & Road'),
(6, 'Logos');

INSERT INTO sign_pictogram(id,name,id_category,link) values
(nextval('Sq_sign_pictogram_category'), 'cautionary Bison Wildlife', 1, '/assets/icons/Caution-bison.svg'),
(nextval('Sq_sign_pictogram_category'), 'Cautionary Butterfly insect wildlife', 1, '/assets/icons/Caution-butterfly.svg'),
(nextval('Sq_sign_pictogram_category'), 'Cautionary Canine Generic', 1, '/assets/icons/caution-canine-generic.svg'),
(nextval('Sq_sign_pictogram_category'), 'Prohibited Bicycles', 4, '/assets/icons/No-Bicycles.svg'),
(nextval('Sq_sign_pictogram_category'), 'Prohibited Bicycles', 4, '/assets/icons/No-Boat-Launch.svg');
