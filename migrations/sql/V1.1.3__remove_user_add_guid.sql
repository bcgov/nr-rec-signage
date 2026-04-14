-- Migration: Remove User table and update Sign table
-- Add idir_user_guid and author_display_name to Sign
-- Remove id_user from Sign

-- Add new columns to Sign table
ALTER TABLE "Sign" ADD COLUMN "idir_user_guid" VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE "Sign" ADD COLUMN "author_display_name" VARCHAR(200) NOT NULL DEFAULT '';

-- Drop foreign key constraint and column
ALTER TABLE "Sign" DROP CONSTRAINT IF EXISTS "Sign_id_user_fkey";
ALTER TABLE "Sign" DROP COLUMN IF EXISTS "id_user";

-- Drop User table
DROP TABLE IF EXISTS "User";
