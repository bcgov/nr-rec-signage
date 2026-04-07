CREATE SCHEMA IF NOT EXISTS ${flyway:defaultSchema};
SET SEARCH_PATH TO ${flyway:defaultSchema};
CREATE EXTENSION IF NOT EXISTS "postgis";
-- Create sequences
CREATE SEQUENCE IF NOT EXISTS sq_user
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS sq_sign
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS sq_sign_value
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS sq_sign_pictogram
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS Sq_sign_pictogram_category
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS sq_dropdown_value_category
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS sq_dropdown_value
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create tables
CREATE TABLE IF NOT EXISTS "User"
(
    id          numeric      not null
        constraint "User_PK"
            primary key DEFAULT nextval('sq_user'),
    email       varchar(200) not null,
    display_name varchar(200) not null,
    role        varchar(50)  not null
);

CREATE TABLE IF NOT EXISTS sign_category
(
    id        numeric      not null
        constraint "sign_category_PK"
            primary key,
    name      varchar(100) not null,
    slug      varchar(100) not null,
    preview_img varchar(250) null
);

CREATE TABLE IF NOT EXISTS sign_category_options
(
    id        numeric      not null
        constraint "sign_category_options_PK"
            primary key,
    name      varchar(100) not null,
    id_category numeric      not null
        constraint "sign_category_options_FK_category"
            references sign_category (id)
);


CREATE TABLE IF NOT EXISTS sign_field
(
    id         numeric      not null
        constraint "sign_field_PK"
            primary key,
    id_category numeric      not null
        constraint "sign_field_FK_category"
            references sign_category (id),
    field_type varchar(50)  not null,
    slug       varchar(50)  not null,
    name       varchar(100) not null,
    restriction jsonb        null
);

CREATE TABLE IF NOT EXISTS sign_metadata
(
    id          numeric      not null
        constraint "sign_metadata_PK"
            primary key,
    meta_key    varchar(100) not null,
    meta_value  varchar(250) not null,
    id_category numeric      not null
        constraint "sign_metadata_FK_category"
            references sign_category (id),
    id_options numeric      null
        constraint "sign_metadata_FK_options"
            references sign_category_options (id),
    human_label varchar(200) not null,
    modifiable  boolean      not null default false
);

CREATE TABLE IF NOT EXISTS sign_pictogram_category
(
    id   numeric     not null
        constraint "sign_pictogram_category_PK"
            primary key DEFAULT nextval('Sq_sign_pictogram_category'),
    name varchar(50) not null
);

CREATE TABLE IF NOT EXISTS sign_pictogram
(
    id         numeric      not null
        constraint "sign_pictogram_PK"
            primary key DEFAULT nextval('sq_sign_pictogram'),
    name       varchar(100) not null,
    id_category numeric      not null
        constraint "sign_pictogram_FK_category"
            references sign_pictogram_category (id),
    link       varchar(250) not null,
    is_archived boolean      not null default false
);

CREATE TABLE IF NOT EXISTS dropdown_value_category
(
    id            numeric      not null
        constraint "dropdown_value_category_PK"
            primary key DEFAULT nextval('sq_dropdown_value_category'),
    id_sign_field numeric      not null
        constraint "dropdown_value_category_FK_field"
            references sign_field (id),
    category_name varchar(100) not null
);

CREATE TABLE IF NOT EXISTS dropdown_value
(
    id         numeric      not null
        constraint "dropdown_value_PK"
            primary key DEFAULT nextval('sq_dropdown_value'),
    id_category numeric      not null
        constraint "dropdown_value_FK_category"
            references dropdown_value_category (id),
    text_value      varchar(100) not null
);

CREATE TABLE IF NOT EXISTS "Sign"
(
    id           numeric    not null
        constraint "Sign_PK"
            primary key DEFAULT nextval('sq_sign'),
    id_user      numeric    null
        constraint "Sign_FK_user"
            references "User" (id),
    id_category  numeric    not null
        constraint "Sign_FK_category"
            references sign_category (id),
    id_options  numeric  null
        constraint "Sign_FK_options"
            references sign_category_options (id),
    date_created timestamp  not null,
    date_updated timestamp  not null,
    svg_version  text       null
);

CREATE TABLE IF NOT EXISTS sign_value
(
    id      numeric      not null
        constraint "sign_value_PK"
            primary key DEFAULT nextval('sq_sign_value'),
    id_sign numeric      not null
        constraint "sign_value_FK_sign"
            references "Sign" (id),
    id_field numeric      not null
        constraint "sign_value_FK_field"
            references sign_field (id),
    text_value   varchar(250) not null,
    constraint "sign_value_unique_pair" unique (id_sign, id_field)
);

