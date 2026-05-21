-- Add missing dropdown values for regulatory sign regulations

-- =========================================
-- Add missing § 6 (6) to Operation of Vehicle and Equipment
-- =========================================
INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '6 (6)', '6 (6)'
FROM dropdown_value_category c
WHERE c.category_name = 'Operation of Vehicle and Equipment'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '6 (6)'
);

-- =========================================
-- Add missing § 7 (2) to Safety helmet
-- =========================================
INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '7 (2)', '7 (2)'
FROM dropdown_value_category c
WHERE c.category_name = 'Safety helmet'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '7 (2)'
);

-- =========================================
-- Add missing § 11 (1), § 11 (3), § 11 (4) to Traps and firearms
-- =========================================
INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('11 (1)'), ('11 (3)'), ('11 (4)')) v(val) ON TRUE
WHERE c.category_name = 'Traps and firearms'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Authorization to cut, damage or destroy Crown timber
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Authorization to cut, damage or destroy Crown timber'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Authorization to cut, damage or destroy Crown timber'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '2 (1)', '2 (1)'
FROM dropdown_value_category c
WHERE c.category_name = 'Authorization to cut, damage or destroy Crown timber'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '2 (1)'
);

-- =========================================
-- Authorization under section 57 of the Act not required
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Authorization under section 57 of the Act not required'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Authorization under section 57 of the Act not required'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('3 (1)'), ('3 (2)')) v(val) ON TRUE
WHERE c.category_name = 'Authorization under section 57 of the Act not required'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- How to obtain authorization under section 57 of the Act
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'How to obtain authorization under section 57 of the Act'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'How to obtain authorization under section 57 of the Act'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('4 (1)'), ('4 (2)'), ('4 (3)'), ('4 (4)')) v(val) ON TRUE
WHERE c.category_name = 'How to obtain authorization under section 57 of the Act'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Right of review
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Right of review'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Right of review'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('5 (1)'), ('5 (2)')) v(val) ON TRUE
WHERE c.category_name = 'Right of review'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Respect for property and the environment
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Respect for property and the environment'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Respect for property and the environment'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '17', '17'
FROM dropdown_value_category c
WHERE c.category_name = 'Respect for property and the environment'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '17'
);

-- =========================================
-- Quiet and peaceful enjoyment
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Quiet and peaceful enjoyment'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Quiet and peaceful enjoyment'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('18 (1)'), ('18 (2)')) v(val) ON TRUE
WHERE c.category_name = 'Quiet and peaceful enjoyment'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);

-- =========================================
-- Responsibility for minors
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Responsibility for minors'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Responsibility for minors'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, '19', '19'
FROM dropdown_value_category c
WHERE c.category_name = 'Responsibility for minors'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = '19'
);

-- =========================================
-- Limitations on occupancy and use
-- =========================================
INSERT INTO dropdown_value_category (id, id_sign_field, category_name)
SELECT nextval('sq_dropdown_value_category'), 5, 'Limitations on occupancy and use'
WHERE NOT EXISTS (
    SELECT 1 FROM dropdown_value_category d
    WHERE d.id_sign_field = 5
    AND d.category_name = 'Limitations on occupancy and use'
);

INSERT INTO dropdown_value (id, id_category, text_value, text_label)
SELECT nextval('sq_dropdown_value'), c.id, v.val, v.val
FROM dropdown_value_category c
JOIN (VALUES ('20 (1)'), ('20 (2)'), ('20 (3)'), ('20 (4)'), ('20 (5)'), ('20 (6)')) v(val) ON TRUE
WHERE c.category_name = 'Limitations on occupancy and use'
AND c.id_sign_field = 5
AND NOT EXISTS (
    SELECT 1 FROM dropdown_value dv
    WHERE dv.id_category = c.id
    AND dv.text_value = v.val
);
