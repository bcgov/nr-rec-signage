DO $$
DECLARE
    v_field_id BIGINT;
    v_category_id BIGINT;
BEGIN
   update sign_field set name = '(Optional) Blade 5 - Partnership Name'  where slug = 'blade_5_text';
   update sign_field set name = '(Optional) Blade 4 - In Partnership Text'  where slug = 'blade_4_text';

   select id
    into v_category_id
    from sign_category where slug = '3-blade-entrance-sign';

   select coalesce(max(id), 0) + 1
    into v_field_id
    from sign_field;

   update sign_field set list_order = 3 where id_category = v_category_id and slug = 'blade_1_hide';
   update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 1;
   INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id, v_category_id, 'options', 'pilot_holes_blade_1', 'Blade 1 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 1);
    update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 5;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 1, v_category_id, 'options', 'pilot_holes_blade_2', 'Blade 2 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 5);
   update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 9;
   INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 2, v_category_id, 'options', 'pilot_holes_blade_3', 'Blade 3 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 9);
    update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 11;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 3, v_category_id, 'options', 'pilot_holes_blade_4', '(Optional) Blade 4 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 11);
    update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 15;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 4, v_category_id, 'options', 'pilot_holes_blade_5', '(Optional) Blade 5 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 15);
        update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 19;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 5, v_category_id, 'options', 'pilot_holes_blade_6', '(Optional) Blade 6 - Pilot Holes',
    '{"values": ["none", "center", "top/bottom", "offset"]}', 19);
END $$;

