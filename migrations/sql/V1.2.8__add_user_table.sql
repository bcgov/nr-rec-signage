CREATE SEQUENCE IF NOT EXISTS sq_user START 1;

CREATE TABLE IF NOT EXISTS "User" (
  id numeric PRIMARY KEY DEFAULT nextval('sq_user'),
  display_name varchar(100) NOT NULL,
  idir_username varchar(100) NOT NULL UNIQUE,
  app_role varchar(20) NOT NULL,
  is_active boolean NOT NULL DEFAULT true
);
