-- Update list_order for dropdown_value_category rows

-- Authorization to cut, damage or destroy Crown timber
UPDATE dropdown_value_category SET list_order = 2 WHERE category_name = 'Authorization to cut, damage or destroy Crown timber';

-- Authorization under section 57 of the Act not required
UPDATE dropdown_value_category SET list_order = 3 WHERE category_name = 'Authorization under section 57 of the Act not required';

-- How to obtain authorization under section 57 of the Act
UPDATE dropdown_value_category SET list_order = 4 WHERE category_name = 'How to obtain authorization under section 57 of the Act';

-- Right of review
UPDATE dropdown_value_category SET list_order = 5 WHERE category_name = 'Right of review';

-- Operation of vehicles and equipment
UPDATE dropdown_value_category SET list_order = 6 WHERE category_name = 'Operation of Vehicle and Equipment';

-- Safety helmet
UPDATE dropdown_value_category SET list_order = 7 WHERE category_name = 'Safety helmet';

-- Discharge of holding tanks
UPDATE dropdown_value_category SET list_order = 8 WHERE category_name = 'Discharge of holding tanks';

-- Disposal of refuse
UPDATE dropdown_value_category SET list_order = 9 WHERE category_name = 'Disposal of refuse';

-- Disposal of game residue (not specified, assigning 10)
UPDATE dropdown_value_category SET list_order = 10 WHERE category_name = 'Disposal of game residue';

-- Traps and firearms
UPDATE dropdown_value_category SET list_order = 11 WHERE category_name = 'Traps and firearms';

-- Pets
UPDATE dropdown_value_category SET list_order = 12 WHERE category_name = 'Pets';

-- Duration of stay at a recreation site
UPDATE dropdown_value_category SET list_order = 13 WHERE category_name = 'Duration of stay at a recreation site';

-- Firewood
UPDATE dropdown_value_category SET list_order = 14 WHERE category_name = 'Firewood';

-- Structures
UPDATE dropdown_value_category SET list_order = 15 WHERE category_name = 'Structures';

-- Other uses requiring authorization
UPDATE dropdown_value_category SET list_order = 16 WHERE category_name = 'Other uses requiring authorization';

-- Respect for property and the environment
UPDATE dropdown_value_category SET list_order = 17 WHERE category_name = 'Respect for property and the environment';

-- Quiet and peaceful enjoyment
UPDATE dropdown_value_category SET list_order = 18 WHERE category_name = 'Quiet and peaceful enjoyment';

-- Responsibility for minors
UPDATE dropdown_value_category SET list_order = 19 WHERE category_name = 'Responsibility for minors';

-- Limitations on occupancy and use
UPDATE dropdown_value_category SET list_order = 20 WHERE category_name = 'Limitations on occupancy and use';
