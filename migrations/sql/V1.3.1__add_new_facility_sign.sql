DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
    v_option_id BIGINT;
    v_metadata_id BIGINT;
BEGIN

    -- Category
    SELECT COALESCE(MAX(id), 0) + 1
    INTO v_category_id
    FROM sign_category;

    INSERT INTO sign_category (id, name, slug, preview_img, list_order)
    VALUES (
        v_category_id,
        'Facility Sign with Arrow',
        'facility-sign-alternative',
        'assets/img/facility-sign-alternative.png',
        5
    );

    UPDATE sign_category SET list_order = list_order + 1 WHERE list_order >= 5 AND id != v_category_id;

    -- Fields
    SELECT COALESCE(MAX(id), 0) + 1
    INTO v_field_id
    FROM sign_field;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id,     v_category_id, 'text',        'title',           'Title',           NULL, 1),
        (v_field_id + 1, v_category_id, 'resizer',        'resizer_text',    'Title Size',            '{}', 2),
        (v_field_id + 2, v_category_id, 'icon_picker', 'icon',             'Pictogram',            '{}', 3);


END $$;
