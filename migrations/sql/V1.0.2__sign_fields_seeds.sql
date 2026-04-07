-- Seed sign fields for various categories
INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
-- Regulatory Sign (id_category=1)
(1, 1, 'text', 'title', 'Title', NULL),
(2, 1, 'text', 'header_sub_text', 'Header Sub-Text', NULL),
(3, 1, 'icon_picker', 'icon', 'Icon', '{"categories": ["permitted", "prohibited"]}'),
(4, 1, 'text', 'sub_text', 'Sub text', NULL),
(5, 1, 'dropdown', 'regulations', 'Regulations', '{"multiple": true}'),

-- Cautionary Sign (id_category=2)
(6, 2, 'text', 'title', 'Title', NULL),
(7, 2, 'text', 'header_sub_text', 'Header Sub-Text', NULL),
(8, 2, 'icon_picker', 'icon', 'Icon', '{"categories": ["caution"], "multiple": true}'),
(9, 2, 'rich_text', 'sub_text', 'Sub text', NULL),

-- Information Sign (id_category=3)
(10, 3, 'text', 'title', 'Title', NULL),
(11, 3, 'text', 'header_sub_text', 'Header Sub-Text', NULL),
(12, 3, 'icon_picker', 'main_pictogram', 'Main Pictogram', '{"multiple": true}'),
(13, 3, 'icon_picker', 'partnership_logos', 'Partnership logos', '{"multiple": true}'),

-- Welcome to Your Rec Site Entrance sign (id_category=5)
(14, 5, 'number', 'daily_camping_fee', 'Daily Camping fee', NULL),

-- 3-Blade Entrance Sign (id_category=6)
(15, 6, 'text', 'blade_1_text', 'Blade 1 Text', NULL),
(16, 6, 'text', 'blade_2_text', 'Blade 2 Text', '{"default": "Recreation site"}'),

-- Camp Sign number post (id_category=4)
(17, 4, 'number', 'camp_number', 'Camp Number', NULL);
