-- Seed sign_category_options table with size options
INSERT INTO sign_category_options (id, id_category, name) VALUES
-- Regulatory Sign options (id_category=1)
(1, 1, '8 x 8'),
(2, 1, '12 x 16'),
(3, 1, '24 x 36'),
(4, 1, '36 x 24'),

-- Cautionary Sign options (id_category=2)
(5, 2, '8 x 8'),
(6, 2, '12 x 16'),
(7, 2, '24 x 36'),
(8, 2, '36 x 24'),

-- Information Sign options (id_category=3)
(9, 3, '8 x 8'),
(10, 3, '12 x 16'),
(11, 3, '24 x 36'),
(12, 3, '36 x 24');
