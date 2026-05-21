-- Add "Show Pilot Holes" field for Regulatory Sign (id_category=1)
INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(26, 1, 'options', 'show_pilot_holes', 'Show Pilot Holes', '{"values": ["No", "top/bottom", "Corners"]}');

-- Add "Show Pilot Holes" field for Cautionary Sign (id_category=2)
INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(27, 2, 'options', 'show_pilot_holes', 'Show Pilot Holes', '{"values": ["No", "top/bottom", "Corners"]}');

-- Add "Show Pilot Holes" field for Informational Sign (id_category=3)
INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(28, 3, 'options', 'show_pilot_holes', 'Show Pilot Holes', '{"values": ["No", "top/bottom", "Corners"]}');

-- Add "Show Pilot Holes" field for Facility Blank Sign (id_category=8)
INSERT INTO sign_field (id, id_category, field_type, slug, name, restriction) VALUES
(29, 8, 'options', 'show_pilot_holes', 'Show Pilot Holes', '{"values": ["No", "top/bottom", "Corners"]}');
