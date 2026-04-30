INSERT INTO sign_category_options (id, id_category, name) VALUES
(17, 4, 'Carsonite Wand: 3 x 3.75'),
(18, 4, 'Log Post: 4 x 6');


INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
(94, 'width', '3', 4, 17, 'Width', false, 'inch'),
(95, 'height', '3.75', 4, 17, 'Height', false, 'inch'),
(96, 'font-size','108', 4, 17, 'Font Size', false, 'pt'),
(97, 'width', '3', 4, 18, 'Width', false, 'inch'),
(98, 'height', '4 x 6', 4, 18, 'Height', false, 'inch'),
(99, 'font-size','216', 4, 18, 'Font Size', false, 'pt');
