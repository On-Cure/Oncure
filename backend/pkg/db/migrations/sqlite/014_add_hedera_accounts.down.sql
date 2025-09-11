DROP INDEX IF EXISTS idx_user_badges_type;
DROP INDEX IF EXISTS idx_user_badges_user;
DROP INDEX IF EXISTS idx_hedera_tx_type;
DROP INDEX IF EXISTS idx_hedera_tx_user;

DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS hedera_transactions;

-- Note: SQLite cannot drop columns directly; leaving user columns in place to avoid destructive copy. 