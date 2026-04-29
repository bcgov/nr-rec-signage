insert into sign_category (id, name,slug, preview_img) values
(8, 'Facility Blank Sign', 'facility-blank-sign', 'assets/img/facility-blank-sign.png');

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(20, 8, 'text', 'title', 'Title', NULL),
(21, 8, 'text', 'header_sub_text', 'Header Sub-Text', NULL),
(22, 8, 'icon_picker', 'icon', 'Icon', '{}'),
(23, 8, 'text', 'sub_text', 'Sub text', NULL),
(24, 8, 'dropdown', 'regulations', 'Regulations', '{"multiple": true}');

INSERT INTO sign_category_options (id, id_category, name) VALUES
(13, 8, '8 x 8'),
(14, 8, '12 x 16'),
(15, 8, '24 x 36'),
(16, 8, '36 x 24');


INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
(61, 'width', '8', 8, 13, 'Width', false, 'inch'),
(62, 'height', '8', 8, 13, 'Height', false, 'inch'),
(63, 'title_font_size', '66', 8, 13, 'Title Font Size', false, 'pt'),
(64, 'subtitle_font_size', '26', 8, 13, 'Subtitle Font Size', false, 'pt'),
(65, 'regulation_font_size', '12', 8, 13, 'Regulation Font Size', false, 'pt'),
(66, 'width', '12', 8, 14, 'Width', false, 'inch'),
(67, 'height', '16', 8, 14, 'Height', false, 'inch'),
(68, 'title_font_size', '114', 8, 14, 'Title Font Size', false, 'pt'),
(69, 'subtitle_font_size', '60', 8, 14, 'Subtitle Font Size', false, 'pt'),
(70, 'regulation_font_size', '24', 8, 14, 'Regulation Font Size', false, 'pt'),
(71, 'width', '24', 8, 15, 'Width', false, 'inch'),
(72, 'height', '36', 8, 15, 'Height', false, 'inch'),
(73, 'title_font_size', '192', 8, 15, 'Title Font Size', false, 'pt'),
(74, 'subtitle_font_size', '90', 8, 15, 'Subtitle Font Size', false, 'pt'),
(75, 'regulation_font_size', '48', 8, 15, 'Regulation Font Size', false, 'pt'),
(77, 'width', '36', 8, 16, 'Width', false, 'inch'),
(78, 'height', '24', 8, 16, 'Height', false, 'inch'),
(79, 'title_font_size', '192', 8, 16, 'Title Font Size', false, 'pt'),
(80, 'subtitle_font_size', '92', 8, 16, 'Subtitle Font Size', false, 'pt'),
(81, 'regulation_font_size', '48', 8, 16, 'Regulation Font Size', false, 'pt');

DELETE from sign_value where id_sign in (select id from "Sign" where id_category=5);
DELETE from "Sign" where id_category=5;
DELETE from sign_field where id_category=5;
DELETE from sign_category where id=5;

