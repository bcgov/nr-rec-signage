DO $$
DECLARE
    v_category_id BIGINT;
    v_field_id BIGINT;
BEGIN
    select id
    into v_category_id
    from sign_category where slug = 'camp-sign-number-post';

    select coalesce(max(id), 0) + 1
    into v_field_id
    from sign_field;

   update sign_field set list_order = list_order + 1 where id_category = v_category_id and list_order >= 0;
   INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction, list_order) VALUES
   (v_field_id, v_category_id, 'options', 'pilot_holes', 'Pilot Holes',
    '{"values": ["none", "center", "top/bottom"]}', 0);

END $$;



