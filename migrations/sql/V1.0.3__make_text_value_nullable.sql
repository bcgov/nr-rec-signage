-- Make text_value nullable in sign_value and dropdown_value tables
ALTER TABLE sign_value ALTER COLUMN text_value DROP NOT NULL;
ALTER TABLE dropdown_value ALTER COLUMN text_value DROP NOT NULL;