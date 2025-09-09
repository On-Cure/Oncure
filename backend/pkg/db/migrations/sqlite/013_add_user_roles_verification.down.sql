-- Drop verification_requests table and indexes
DROP INDEX IF EXISTS idx_verification_requests_status;
DROP INDEX IF EXISTS idx_verification_requests_user_id;
DROP TABLE IF EXISTS verification_requests;

-- Note: SQLite doesn't support DROP COLUMN directly
-- In production, you would need to recreate the users table without the new columns