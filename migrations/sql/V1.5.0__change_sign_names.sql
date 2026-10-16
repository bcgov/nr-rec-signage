DO $$
DECLARE
    v_category_id BIGINT;

BEGIN
    select id into v_category_id from sign_category where slug = 'regulatory';
    update sign_category set name = 'Regulatory' where id = v_category_id;
    select id into v_category_id from sign_category where slug = 'cautionary';
    update sign_category set name = 'Warning' where id = v_category_id;
    select id into v_category_id from sign_category where slug = 'informational';
    update sign_category set name = 'Informational' where id = v_category_id;
    select id into v_category_id from sign_category where slug = 'facility-sign';
    update sign_category set name = 'Facility' where id = v_category_id;
    select id into v_category_id from sign_category where slug = 'facility-sign-alternative';
    update sign_category set name = 'Facility Wayfinding' where id = v_category_id;
    select id into v_category_id from sign_category where slug = '3-blade-entrance-sign';
    update sign_category set name = 'Site or Trail Identification Blade' where id = v_category_id;
        select id into v_category_id from sign_category where slug = 'camp-sign-number-post';
    update sign_category set name = 'Campsite Number Posts' where id = v_category_id;
END $$;






