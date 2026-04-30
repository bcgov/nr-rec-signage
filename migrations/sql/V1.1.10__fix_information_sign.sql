delete from sign_value where id_field = 19;
delete from dropdown_value where id_category in (select id from dropdown_value_category where id_sign_field=19);
delete from dropdown_value_category where id_sign_field= 19;
delete from sign_field where id= 19;


INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
(90, 'border-width', '0.4', 3, 9, 'Border Width', false, 'inch'),
(91, 'border-width', '0.4', 3, 10, 'Border Width', false, 'inch'),
(92, 'border-width', '0.4', 3, 11, 'Border Width', false, 'inch'),
(93, 'border-width', '0.4', 3, 12, 'Border Width', false, 'inch');

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(25, 3, 'text', 'sub_text', 'Sub Text', '{"limit": "50"}');

