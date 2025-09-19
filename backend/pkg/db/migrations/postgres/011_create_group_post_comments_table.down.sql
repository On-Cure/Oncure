DROP INDEX IF EXISTS idx_group_post_comment_reactions_user_id;
DROP INDEX IF EXISTS idx_group_post_comment_reactions_comment_id;
DROP TABLE IF EXISTS group_post_comment_reactions;
DROP INDEX IF EXISTS idx_group_post_comments_created_at;
DROP INDEX IF EXISTS idx_group_post_comments_parent_id;
DROP INDEX IF EXISTS idx_group_post_comments_user_id;
DROP INDEX IF EXISTS idx_group_post_comments_group_post_id;
DROP TABLE IF EXISTS group_post_comments;