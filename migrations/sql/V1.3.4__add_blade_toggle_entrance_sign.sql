DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
BEGIN
    select id
    into v_category_id
    from sign_category where slug = '3-blade-entrance-sign';

    update sign_category set name = 'Blade Entrance Sign' where id = v_category_id;

    select coalesce(max(id), 0) + 1
    into v_field_id
    from sign_field;


    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id, v_category_id, 'toggle', 'blade_1_hide', 'Hide Blade 1', '{"default_value": "false"}', 3);

    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 3 and slug != 'blade-1-hide';

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 1, v_category_id, 'toggle', 'blade_2_hide', 'Hide Blade 2', '{"default_value": "false"}', 6);

        INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 2, v_category_id, 'toggle', 'blade_3_hide', 'Hide Blade 3', '{"default_value": "false"}', 7);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 3, v_category_id, 'text', 'blade_4_text', '(Optional) Blade 4 - partnership text', NULL, 8);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 4, v_category_id, 'resizer', 'blade_4_resizer', 'Blade 4 - resizer', NULL, 9);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 5, v_category_id, 'toggle', 'blade_4_hide', 'Hide Blade 4', '{"default_value": "true"}', 10);

        INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 6, v_category_id, 'text', 'blade_5_text', '(Optional) Blade 5 - partnership text', NULL, 11);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 7, v_category_id, 'resizer', 'blade_5_resizer', 'Blade 5 - resizer', NULL, 12);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 8, v_category_id, 'toggle', 'blade_5_hide', 'Hide Blade 5', '{"default_value": "true"}', 13);


        INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 9, v_category_id, 'text', 'blade_6_text', '(Optional) Blade 6 - Cautionary Text', NULL, 14);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 10, v_category_id, 'resizer', 'blade_6_resizer', 'Blade 6 - resizer', NULL, 15);

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 11, v_category_id, 'toggle', 'blade_6_hide', 'Hide Blade 6', '{"default_value": "true"}', 16);

END $$;



