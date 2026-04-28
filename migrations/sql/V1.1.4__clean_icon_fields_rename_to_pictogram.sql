-- Update icon_picker fields: set restriction to NULL and rename 'Icon' to 'Pictogram'

-- Set restriction to NULL for all icon_picker fields
UPDATE sign_field
SET restriction = NULL
WHERE field_type = 'icon_picker';

-- Change name from 'Icon' to 'Pictogram' for icon_picker fields
UPDATE sign_field
SET name = 'Pictogram'
WHERE name = 'Icon' AND field_type = 'icon_picker';

