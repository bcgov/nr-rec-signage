alter table sign_pictogram_category
add column if not exists code varchar(4);

UPDATE sign_pictogram_category set code = '01' where id = 1;
UPDATE sign_pictogram_category set name='Emergency, Guidance & Information', code = '03' where id = 3;
UPDATE sign_pictogram set id_category=3 where id_category=2;
UPDATE sign_pictogram_category set name='Danger', code = '02' where id = 2;
UPDATE sign_pictogram_category set code = '04' where id = 4;
UPDATE sign_pictogram_category set name='Traffic & Road Symbols', code = '05' where id = 5;
DELETE FROM sign_pictogram where id_category = 6;
DELETE FROM sign_pictogram_category where id = 6;



