alter table sign_field add column list_order integer not null default 0;

insert into sign_field (id, id_category, field_type, slug, name, list_order) values
(30, 4, 'resizer', 'resizer_number', 'Resizer Number', 1),
(31, 6, 'resizer', 'resizer_blade_1', 'Resizer Blade 1', 2),
(32, 6, 'resizer', 'resizer_blade_2', 'Resizer Blade 2', 4);

update sign_field set list_order = 1 where id=1;
update sign_field set list_order = 2 where id=2;
update sign_field set list_order = 3 where id=3;
update sign_field set list_order = 4 where id=4;
update sign_field set list_order = 5 where id=5;
update sign_field set list_order = 1 where id=6;
update sign_field set list_order = 2 where id=7;
update sign_field set list_order = 3 where id=8;
update sign_field set list_order = 4 where id=9;
update sign_field set list_order = 1 where id=10;
update sign_field set list_order = 2 where id=11;
update sign_field set list_order = 3 where id=12;
update sign_field set list_order = 4 where id=25;
update sign_field set list_order = 5 where id=13;
update sign_field set list_order = 1 where id=15;
update sign_field set list_order = 3 where id=16;
update sign_field set list_order = 1 where id=20;
update sign_field set list_order = 2 where id=21;
update sign_field set list_order = 3 where id=22;
update sign_field set list_order = 4 where id=23;
