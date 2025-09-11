-- Extend users with Hedera fields
ALTER TABLE users ADD COLUMN hedera_account_id TEXT;
ALTER TABLE users ADD COLUMN hedera_public_key TEXT;
ALTER TABLE users ADD COLUMN hedera_private_key_encrypted TEXT;

-- Transactions table
CREATE TABLE IF NOT EXISTS hedera_transactions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	transaction_id TEXT NOT NULL,
	transaction_type TEXT NOT NULL, -- tip|reward|badge
	amount REAL,
	token_id TEXT,
	nft_serial_number INTEGER,
	status TEXT DEFAULT 'pending',
	memo TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Badges table
CREATE TABLE IF NOT EXISTS user_badges (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	badge_type TEXT NOT NULL,
	badge_name TEXT NOT NULL,
	token_id TEXT NOT NULL,
	serial_number INTEGER NOT NULL,
	earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	description TEXT,
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX IF NOT EXISTS idx_hedera_tx_user ON hedera_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_hedera_tx_type ON hedera_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_type ON user_badges(badge_type); 