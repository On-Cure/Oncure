'use client';
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { getImageUrl } from '../../utils/image';

export default function CommunityPostComments({ communityId, communityPostId, onCommentAdded }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, [communityId, communityPostId]);

    const fetchComments = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
            const res = await fetch(`${apiUrl}/api/communities/${communityId}/posts/${communityPostId}/comments`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setComments(Array.isArray(data) ? data : data.comments || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            setIsSubmitting(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
            const res = await fetch(`${apiUrl}/api/communities/${communityId}/posts/${communityPostId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content: newComment })
            });

            if (res.ok) {
                const comment = await res.json();
                setComments(prev => [...prev, comment]);
                setNewComment('');
                if (onCommentAdded) onCommentAdded(comment);
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading comments...</div>;
    }

    return (
        <div className="space-y-4 mt-4 pt-4 border-t border-border/20">
            <form onSubmit={handleSubmitComment} className="flex gap-3">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal"
                    disabled={isSubmitting}
                />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!newComment.trim() || isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Comment'}
                </Button>
            </form>

            <div className="space-y-3">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-surface/30 rounded-lg">
                        {comment.user?.avatar ? (
                            <img
                                src={getImageUrl(comment.user.avatar)}
                                alt={comment.user.first_name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                    {comment.user?.first_name?.[0]}{comment.user?.last_name?.[0]}
                                </span>
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-text-primary text-sm">
                                    {comment.user?.first_name} {comment.user?.last_name}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-text-primary text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {comments.length === 0 && (
                <div className="text-center py-4">
                    <p className="text-text-secondary text-sm">No comments yet. Be the first to comment!</p>
                </div>
            )}
        </div>
    );
}