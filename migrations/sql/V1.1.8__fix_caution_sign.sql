delete from sign_value where id_field = 18;
delete from dropdown_value where id_category in (select id from dropdown_value_category where id_sign_field=18);
delete from dropdown_value_category where id_sign_field= 18;
delete from sign_field where id= 18;


INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
(82, 'border-width', '0.4', 2, 5, 'Border Width', false, 'inch'),
(83, 'border-width', '0.4', 2, 6, 'Border Width', false, 'inch'),
(84, 'border-width', '0.4', 2, 7, 'Border Width', false, 'inch'),
(85, 'border-width', '0.4', 2, 8, 'Border Width', false, 'inch');


