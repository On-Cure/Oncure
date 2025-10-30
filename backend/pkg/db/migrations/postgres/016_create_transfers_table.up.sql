-- Create transfers table to track Hedera token transfers
CREATE TABLE IF NOT EXISTS transfers (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER NOT NULL,
    to_user_id INTEGER NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    transaction_id TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_transfers_from_user ON transfers(from_user_id);
CREATE INDEX IF NOT EXISTS idx_transfers_to_user ON transfers(to_user_id);
CREATE INDEX IF NOT EXISTS idx_transfers_transaction_id ON transfers(transaction_id);