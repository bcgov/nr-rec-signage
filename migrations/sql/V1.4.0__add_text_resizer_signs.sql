DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
BEGIN
    select id
    into v_category_id
    from sign_category where slug = 'regulatory';


    select coalesce(max(id), 0) + 1
    into v_field_id
    from sign_field;

    -- Regulatory Sign Updates
    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 2;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 1, v_category_id, 'resizer', 'title_resizer', 'Title Resizer', NULL, 2);

        UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 4;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 2, v_category_id, 'resizer', 'subheader_resizer', 'Subheader Resizer', NULL, 4);
    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 7;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 3, v_category_id, 'resizer', 'text_resizer', 'Text Resizer', NULL, 7);

    -- Caution Sign Updates
    select id
    into v_category_id
    from sign_category where slug = 'cautionary';

    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 2;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 4, v_category_id, 'resizer', 'title_resizer', 'Title Resizer', NULL, 2);

        UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 4;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 5, v_category_id, 'resizer', 'subheader_resizer', 'Subheader Resizer', NULL, 4);
    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 7;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 6, v_category_id, 'resizer', 'text_resizer', 'Text Resizer', NULL, 7);

    -- Information Sign Updates
    select id
    into v_category_id
    from sign_category where slug = 'informational';

    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 2;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 7, v_category_id, 'resizer', 'title_resizer', 'Title Resizer', NULL, 2);

        UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 4;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 8, v_category_id, 'resizer', 'subheader_resizer', 'Subheader Resizer', NULL, 4);
    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 7;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 9, v_category_id, 'resizer', 'text_resizer', 'Text Resizer', NULL, 7);
    -- Facility Sign Updates
    select id
    into v_category_id
    from sign_category where slug = 'facility-sign';

    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 2;
    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 10, v_category_id, 'resizer', 'title_resizer', 'Title Resizer', NULL, 2);

    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 4;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 11, v_category_id, 'resizer', 'subheader_resizer', 'Subheader Resizer', NULL, 4);
    UPDATE sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 7;

    INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order)
    VALUES
        (v_field_id + 12, v_category_id, 'resizer', 'text_resizer', 'Text Resizer', NULL, 7);
END $$;



