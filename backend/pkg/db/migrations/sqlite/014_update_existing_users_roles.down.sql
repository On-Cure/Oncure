-- Rollback: Set role and verification_status back to NULL for users who had them set to defaults
-- Note: This is a destructive operation and may not be fully reversible
UPDATE users SET role = NULL WHERE role = 'user';
UPDATE users SET verification_status = NULL WHERE verification_status = 'unverified';