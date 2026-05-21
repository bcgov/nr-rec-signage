-- Add list_order column to sign_category table
ALTER TABLE sign_category ADD COLUMN list_order INTEGER;

-- Update list_order values according to the specified ordering
UPDATE sign_category SET list_order = 1 WHERE id = 1;
UPDATE sign_category SET list_order = 2 WHERE id = 2;
UPDATE sign_category SET list_order = 3 WHERE id = 3;
UPDATE sign_category SET list_order = 7 WHERE id = 4;
UPDATE sign_category SET list_order = 5 WHERE id = 5;
UPDATE sign_category SET list_order = 6 WHERE id = 6;
UPDATE sign_category SET list_order = 4 WHERE id = 8;
