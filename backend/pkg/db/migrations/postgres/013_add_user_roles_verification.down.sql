DROP INDEX IF EXISTS idx_verification_requests_status;
DROP INDEX IF EXISTS idx_verification_requests_user_id;
DROP TABLE IF EXISTS verification_requests;
ALTER TABLE users DROP COLUMN IF EXISTS verified_at;
ALTER TABLE users DROP COLUMN IF EXISTS verification_status;
ALTER TABLE users DROP COLUMN IF EXISTS role;