-- Update existing users to have default role 'user' where role is NULL
UPDATE users SET role = 'user' WHERE role IS NULL;

-- Update existing users to have default verification_status 'unverified' where verification_status is NULL  
UPDATE users SET verification_status = 'unverified' WHERE verification_status IS NULL;