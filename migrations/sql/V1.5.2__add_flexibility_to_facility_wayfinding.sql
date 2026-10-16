DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
BEGIN
    select id
    into v_category_id
    from sign_category where slug = 'facility-sign-alternative';

    select coalesce(max(id), 0) + 1
    into v_field_id
    from sign_field;

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id, v_category_id, 'options', 'arrow_direction', 'Arrow Direction', '{"values": ["Left", "Right", "Up", "Down"]}', 3);

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 1, v_category_id, 'toggle', 'swap_side', 'Swap Pictogram/Arrow', '{"default_value": "false"}', 4);

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id + 2, v_category_id, 'options', 'pilot_holes', 'Pilot Holes', '{"values": ["None", "Center", "Top/Bottom", "Offset"]}', 0);

END $$;



