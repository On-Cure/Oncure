'use client';
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { communities, upload } from '../../lib/api';
import { ImagePlus, X, ThumbsUp, ThumbsDown, MessageSquare, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../utils/image';
import CommunityPostComments from './CommunityPostComments';

export default function CommunityPosts({ params, community, fetchCommunity }) {
    const [newPost, setNewPost] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});
    const [postReactions, setPostReactions] = useState({});
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const res = await fetch(`${apiUrl}/api/auth/session`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error getting user:', error);
            }
        };
        getCurrentUser();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
        setImage(file);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.trim() && !image) return;

        try {
            setIsSubmitting(true);
            let imageUrl = null;

            if (image) {
                const result = await upload.uploadFile(image);
                if (!result || !result.url) {
                    throw new Error('Invalid response from server');
                }
                imageUrl = result.url;
            }

            await communities.createPost(params.id, {
                content: newPost,
                image_url: imageUrl
            });

            setNewPost('');
            setImage(null);
            setImagePreview(null);
            fetchCommunity();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePostReaction = async (postId, type) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
            const res = await fetch(`${apiUrl}/api/communities/${params.id}/posts/${postId}/reactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ reaction_type: type })
            });

            if (!res.ok) throw new Error('Failed to update reaction');

            const data = await res.json();
            setPostReactions(prev => ({ ...prev, [postId]: data }));
        } catch (error) {
            console.error('Error updating post reaction:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
            const res = await fetch(`${apiUrl}/api/communities/${params.id}/posts/${postId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!res.ok) throw new Error('Failed to delete post');
            fetchCommunity();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    return (
        <div className="space-y-6">
            <Card variant="glassmorphism" className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-display font-semibold text-text-primary mb-1">Share with the community</h3>
                    <p className="text-text-secondary text-sm">What would you like to discuss?</p>
                </div>
                <form onSubmit={handleCreatePost}>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full p-4 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal resize-none"
                        rows="4"
                        disabled={isSubmitting}
                    />

                    {imagePreview && (
                        <div className="relative mb-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-64 rounded-lg border border-border object-cover shadow-lg"
                            />
                            <button
                                type="button"
                                onClick={() => { setImage(null); setImagePreview(null); }}
                                className="absolute top-3 right-3 p-2 bg-error/90 hover:bg-error text-white rounded-full transition-all duration-normal hover:scale-105 shadow-lg"
                                disabled={isSubmitting}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        <label className="cursor-pointer flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-normal hover:scale-105">
                            <ImagePlus size={18} />
                            <span className="text-sm font-medium">Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                        </label>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={(!newPost.trim() && !image) || isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Share Post'}
                        </Button>
                    </div>
                </form>
            </Card>

            {community.posts?.map((post) => {
                const reactions = postReactions[post.id] || { likeCount: 0, dislikeCount: 0, userReaction: null };

                return (
                <Card key={post.id} variant="glassmorphism" hover className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        {(post.user?.avatar || post.avatar) ? (
                            <img
                                src={getImageUrl(post.user?.avatar || post.avatar)}
                                alt={`${post.user?.first_name || post.first_name} ${post.user?.last_name || post.last_name}`}
                                className="w-12 h-12 rounded-full object-cover border border-border"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-lg font-display font-semibold">
                                    {(post.user?.first_name || post.first_name)?.[0]}{(post.user?.last_name || post.last_name)?.[0]}
                                </span>
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="font-display font-semibold text-text-primary text-lg">
                                {post.user?.first_name || post.first_name} {post.user?.last_name || post.last_name}
                            </p>
                            <p className="text-sm text-text-secondary">{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                        {user && (user.id === community.creator_id || user.id === post.user_id) && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                title="Delete post"
                            >
                                <Trash2 size={16} />
                            </Button>
                        )}
                    </div>

                    <p className="mb-4 text-text-primary whitespace-pre-wrap text-base leading-relaxed">{post.content}</p>

                    {(post.image_path || post.image_url) && (
                        <div className="mb-3">
                            <img
                                src={getImageUrl(post.image_path || post.image_url)}
                                alt="Post image"
                                className="max-w-full max-h-64 sm:max-h-96 rounded-md border border-border object-cover"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2 sm:gap-4 py-2 border-t border-border">
                        <button
                            onClick={() => handlePostReaction(post.id, 'like')}
                            className={`flex items-center gap-1 p-1 sm:p-1.5 rounded-full transition-colors ${
                                reactions.userReaction === 'like'
                                    ? 'text-red-500'
                                    : 'text-text-secondary hover:text-red-500 hover:bg-accent/50'
                            }`}
                            title="Like"
                        >
                            <ThumbsUp
                                size={16}
                                className="sm:w-5 sm:h-5"
                                fill={reactions.userReaction === 'like' ? 'currentColor' : 'none'}
                            />
                            {reactions.likeCount > 0 && (
                                <span className="text-xs sm:text-sm">{reactions.likeCount}</span>
                            )}
                        </button>

                        <button
                            onClick={() => handlePostReaction(post.id, 'dislike')}
                            className={`flex items-center gap-1 p-1 sm:p-1.5 rounded-full transition-colors ${
                                reactions.userReaction === 'dislike'
                                    ? 'text-blue-500'
                                    : 'text-text-secondary hover:text-blue-500 hover:bg-accent/50'
                            }`}
                            title="Dislike"
                        >
                            <ThumbsDown
                                size={16}
                                className="sm:w-5 sm:h-5"
                                fill={reactions.userReaction === 'dislike' ? 'currentColor' : 'none'}
                            />
                            {reactions.dislikeCount > 0 && (
                                <span className="text-xs sm:text-sm">{reactions.dislikeCount}</span>
                            )}
                        </button>

                        <button
                            onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                            className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full text-text-secondary hover:text-primary hover:bg-accent/50 transition-colors"
                            title="Comments"
                        >
                            <MessageSquare size={14} className="sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">
                                {expandedComments[post.id] ? 'Hide Comments' : 'Comments'}
                            </span>
                        </button>
                    </div>

                    {expandedComments[post.id] && (
                        <CommunityPostComments
                            communityId={params.id}
                            communityPostId={post.id}
                            onCommentAdded={() => console.log('Comment added to post', post.id)}
                        />
                    )}
                </Card>
                );
            })}
        </div>
    );
}