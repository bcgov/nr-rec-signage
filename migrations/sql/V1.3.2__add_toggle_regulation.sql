DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
BEGIN

    -- Category
    SELECT id
    INTO v_category_id
    FROM sign_category where slug = 'regulatory';

    -- Max ID
    SeLECT COALESCE(MAX(id), 0) + 1
    INTO v_field_id
    FROM sign_field;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id, v_category_id, 'toggle', 'regulation-hide', 'Hide regulation', '{"default_value": "false"}', 7);

END $$;
