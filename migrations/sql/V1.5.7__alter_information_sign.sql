DO $$
DECLARE
    v_category_id BIGINT;

BEGIN
    select id into v_category_id from sign_category where slug = 'informational';
    update sign_category set name = 'Information' where id = v_category_id;
END $$;






