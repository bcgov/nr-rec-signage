-- Update the regulations dropdown field to include subtext with link information
UPDATE sign_field
SET restriction = '{
  "multiple": true,
  "subtext": {
    "text": "Forest Recreation Regulation",
    "href": "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/16_2004"
  }
}'
WHERE id = 5 AND slug = 'regulations';
