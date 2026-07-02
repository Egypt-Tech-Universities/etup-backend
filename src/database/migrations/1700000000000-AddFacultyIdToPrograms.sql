-- Migration: Add faculty_id to programs, drop university_programs
-- 
-- Note: This project uses synchronize: true, so these changes
-- are auto-applied when the app starts. This file serves as
-- a reference for production or when synchronize is disabled.

BEGIN;

-- 1. Add faculty_id column to programs (non-nullable, FK to faculties)
ALTER TABLE "programs"
  ADD COLUMN "faculty_id" uuid NOT NULL,
  ADD CONSTRAINT "FK_programs_faculty"
    FOREIGN KEY ("faculty_id")
    REFERENCES "faculties"("id")
    ON DELETE CASCADE;

-- 2. Create index on faculty_id for performance
CREATE INDEX "idx_programs_faculty_id" ON "programs" ("faculty_id");

-- 3. Drop the old many-to-many join table
DROP TABLE IF EXISTS "university_programs" CASCADE;

COMMIT;
