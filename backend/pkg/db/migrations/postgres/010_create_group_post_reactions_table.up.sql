CREATE TABLE IF NOT EXISTS group_post_reactions (
    id SERIAL PRIMARY KEY,
    group_post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    reaction_type VARCHAR(50) NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_post_id) REFERENCES group_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(group_post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_post_reactions_post_id ON group_post_reactions(group_post_id);
CREATE INDEX IF NOT EXISTS idx_group_post_reactions_user_id ON group_post_reactions(user_id);