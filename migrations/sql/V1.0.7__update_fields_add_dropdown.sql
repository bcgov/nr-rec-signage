ALTER TABLE dropdown_value add column text_label text null;

INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(18, 2, 'dropdown', 'regulations', 'Regulations', null),
(19, 3, 'dropdown', 'regulations', 'Regulations', null);


-- =========================================
-- Operation of Vehicle and Equipment
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Operation of Vehicle and Equipment'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Operation of Vehicle and Equipment'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES
    ('6 (1)'), ('6 (2)'), ('6 (3)'), ('6 (4)'), ('6 (5)')
) v(val) ON TRUE
WHERE c.category_name = 'Operation of Vehicle and Equipment'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Safety helmet
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Safety helmet'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Safety helmet'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '7 (1)', '7 (1)'
FROM dropdown_value_category c
WHERE c.category_name = 'Safety helmet'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '7 (1)'
);

-- =========================================
-- Discharge of holding tanks
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Discharge of holding tanks'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Discharge of holding tanks'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '8', '8'
FROM dropdown_value_category c
WHERE c.category_name = 'Discharge of holding tanks'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '8'
);

-- =========================================
-- Disposal of refuse
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Disposal of refuse'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Disposal of refuse'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '9', '9'
FROM dropdown_value_category c
WHERE c.category_name = 'Disposal of refuse'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '9'
);

-- =========================================
-- Disposal of game residue
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Disposal of game residue'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Disposal of game residue'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '10', '10'
FROM dropdown_value_category c
WHERE c.category_name = 'Disposal of game residue'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '10'
);

-- =========================================
-- Traps and firearms
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Traps and firearms'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Traps and firearms'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '11 (2)', '11 (2)'
FROM dropdown_value_category c
WHERE c.category_name = 'Traps and firearms'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '11 (2)'
);

-- =========================================
-- Pets
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Pets'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Pets'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES
    ('12 (1)'), ('12 (2)')
) v(val) ON TRUE
WHERE c.category_name = 'Pets'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Duration of stay at a recreation site
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Duration of stay at a recreation site'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Duration of stay at a recreation site'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES
    ('13 (1)'), ('13 (2)')
) v(val) ON TRUE
WHERE c.category_name = 'Duration of stay at a recreation site'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Firewood
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Firewood'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Firewood'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '14', '14'
FROM dropdown_value_category c
WHERE c.category_name = 'Firewood'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '14'
);

-- =========================================
-- Structures
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Structures'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Structures'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES
    ('15 (1)'), ('15 (2)')
) v(val) ON TRUE
WHERE c.category_name = 'Structures'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Other uses requiring authorization
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), sf, 'Other uses requiring authorization'
FROM (VALUES (18),(19),(5)) s(sf)
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = s.sf
    AND d.category_name = 'Other uses requiring authorization'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '16', '16'
FROM dropdown_value_category c
WHERE c.category_name = 'Other uses requiring authorization'
AND c.id_sign_field IN (18,19,5)
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '16'
);
