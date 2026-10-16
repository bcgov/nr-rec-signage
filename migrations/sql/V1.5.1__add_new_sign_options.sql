DO $$
DECLARE
    v_category_id BIGINT;
    v_option_id BIGINT;
    v_metadata_id BIGINT;
BEGIN
    alter table sign_category_options add column list_order integer;
    -- LOOP THROUGH EACH CATEGORY AND ASSIGN A LIST ORDER TO EACH OPTION
    UPDATE sign_category_options sco
    SET list_order = ranked.row_num
    FROM (
        SELECT
            id,
            ROW_NUMBER() OVER (
                PARTITION BY id_category
                ORDER BY id
            ) AS row_num
        FROM sign_category_options
    ) ranked
    WHERE sco.id = ranked.id;
    -- GET THE MAX OF EACH ID TO ENSURE WE ARE NOT DUPLICATING ANYTHING
    select coalesce(max(id), 0) + 1
    into v_option_id
    from sign_category_options;
    select coalesce(max(id), 0) + 1
    into v_metadata_id
    from sign_metadata;
    select id into v_category_id from sign_category where slug = 'regulatory';
    delete from sign_metadata where meta_key = 'regulation_font_size' and id_category != v_category_id;
    UPDATE sign_category_options set list_order = list_order + 2 where id_category = v_category_id AND list_order >= 3;
    insert into sign_category_options (id, name, id_category,list_order)
    values (v_option_id, '12 x 12', v_category_id, 3);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '12', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'regulation_font_size', '24', v_category_id, v_option_id, 'Regulation Font Size', false, 'pt'),
    (v_metadata_id + 5, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
    -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 6;
    v_option_id := v_option_id + 1;
    -- CREATE 16 x 12 OPTION FOR REGULATORY CATEGORY
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '16 x 12', v_category_id, 4);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '16', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'regulation_font_size', '24', v_category_id, v_option_id, 'Regulation Font Size', false, 'pt'),
    (v_metadata_id + 5, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
    -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 6;
    v_option_id := v_option_id + 1;
    -- CREATE 12 x 12 OPTION FOR CAUTIONARY CATEGORY
    select id into v_category_id from sign_category where slug = 'cautionary';
    UPDATE sign_category_options set list_order = list_order + 2 where id_category = v_category_id AND list_order >= 3;
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '12 x 12', v_category_id, 3);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '12', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
    -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 5;
    v_option_id := v_option_id + 1;
    -- CREATE 16 x 12 OPTION FOR CAUTIONARY CATEGORY
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '16 x 12', v_category_id, 4);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '16', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
    -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 5;
    v_option_id := v_option_id + 1;
    -- CREATE 12 x 12 OPTION FOR INFORMATIONAL CATEGORY
    select id into v_category_id from sign_category where slug = 'informational';
    UPDATE sign_category_options set list_order = list_order + 2 where id_category = v_category_id AND list_order >= 3;
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '12 x 12', v_category_id, 3);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '12', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
    -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 5;
    v_option_id := v_option_id + 1;
    -- CREATE 16 x 12 OPTION FOR INFORMATIONAL CATEGORY
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '16 x 12', v_category_id, 4);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '16', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
        -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 5;
    v_option_id := v_option_id + 1;
    -- CREATE 12 x 12 OPTION FOR FACILITY CATEGORY
    select id into v_category_id from sign_category where slug = 'facility-sign';
    UPDATE sign_category_options set list_order = list_order + 2 where id_category = v_category_id AND list_order >= 3;
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '12 x 12', v_category_id, 3);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '12', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
        -- RESET METADATA ID FOR NEXT OPTION
    v_metadata_id := v_metadata_id + 5;
    v_option_id := v_option_id + 1;
    -- CREATE 16 x 12 OPTION FOR FACILITY CATEGORY
    insert into sign_category_options (id, name, id_category, list_order)
    values (v_option_id, '16 x 12', v_category_id, 4);
    INSERT INTO sign_metadata (id, meta_key, meta_value, id_category, id_options, human_label, modifiable, unit) VALUES
    (v_metadata_id, 'width', '16', v_category_id, v_option_id, 'Width', false, 'inch'),
    (v_metadata_id + 1, 'height', '12', v_category_id, v_option_id, 'Height', false, 'inch'),
    (v_metadata_id + 2, 'title_font_size', '114', v_category_id, v_option_id, 'Title Font Size', false, 'pt'),
    (v_metadata_id + 3, 'subtitle_font_size', '60', v_category_id, v_option_id, 'Subtitle Font Size', false, 'pt'),
    (v_metadata_id + 4, 'border-width', '0.4', v_category_id, v_option_id, 'Border Width', false, 'inch');
END $$;
