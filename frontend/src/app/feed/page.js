"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { posts as postsAPI, users as usersAPI, activity as activityAPI } from "../../lib/api";
import CreatePostComponent from "../../components/posts/CreatePostComponent";
import PostCard from "../../components/posts/PostCard";
import ClientAuthGuard from "../../components/auth/ClientAuthGuard";
import { Home, TrendingUp, Users, MessageCircle, Loader2 } from 'lucide-react';

function FeedContent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [networkCount, setNetworkCount] = useState(0);
  const [engagementCount, setEngagementCount] = useState(0);
  const [countsLoading, setCountsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch posts
  const fetchPosts = async () => {
    try {
      // Using API client - now returns normalized {posts: [...]} structure
      const data = await postsAPI.getPosts(page, 10);
      setPosts(prev => page === 1 ? data.posts : [...prev, ...data.posts]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  // Fetch network and engagement counts
  const fetchCounts = async () => {
    try {
      setCountsLoading(true);
      
      // Get network count (followers + following)
      const counts = await usersAPI.getFollowCounts();
      const totalConnections = counts.followers + counts.following;
      setNetworkCount(totalConnections);
      
      // Get engagement count (recent activities in the last week)
      const activities = await activityAPI.getUserActivities(null, {
        page: 1,
        limit: 100
      });
      
      // Filter activities from the last week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weeklyEngagement = activities.activities?.filter(activity => {
        const activityDate = new Date(activity.created_at);
        return activityDate >= oneWeekAgo;
      }).length || 0;
      
      setEngagementCount(weeklyEngagement);
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setCountsLoading(false);
    }
  };

  // Load initial posts
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, page]);

  // Load counts only once when user is available
  useEffect(() => {
    if (user) {
      fetchCounts();
    }
  }, [user]);

  // Handle new post creation
  const handlePostCreated = (newPost) => {
    if (newPost) {
      setPosts(prev => [newPost, ...prev]);
      // Refresh counts since there's a new post
      fetchCounts();
    } else {
      setPage(1);
      fetchPosts();
    }
  };

  return (
    <div className="w-full py-4 sm:py-6 lg:py-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)'}}>
            <Home size={20} className="sm:w-6 sm:h-6" style={{color: 'rgb(var(--color-background))'}} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 font-display" style={{color: 'rgb(var(--color-text-primary))'}}>
              Feed
            </h1>
            <p className="text-base sm:text-lg font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>
              Stay connected with your network
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="backdrop-blur-sm rounded-lg p-3 sm:p-4 transition-all duration-250 hover:scale-105" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{color: 'rgb(var(--color-primary))'}} />
              <span className="text-sm font-medium font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>Activity</span>
            </div>
            <p className="text-lg sm:text-xl font-bold font-display" style={{color: 'rgb(var(--color-text-primary))'}}>{posts.length}</p>
            <p className="text-xs font-sans" style={{color: 'rgb(var(--color-text-disabled))'}}>Posts in feed</p>
          </div>
          
          <div className="backdrop-blur-sm rounded-lg p-3 sm:p-4 transition-all duration-250 hover:scale-105" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} style={{color: 'rgb(var(--color-secondary))'}} />
              <span className="text-sm font-medium font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>Network</span>
            </div>
            <p className="text-lg sm:text-xl font-bold font-display" style={{color: 'rgb(var(--color-text-primary))'}}>
              {countsLoading ? '...' : networkCount}
            </p>
            <p className="text-xs font-sans" style={{color: 'rgb(var(--color-text-disabled))'}}>Connections</p>
          </div>
          
          <div className="backdrop-blur-sm rounded-lg p-3 sm:p-4 transition-all duration-250 hover:scale-105" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={16} style={{color: 'rgb(var(--color-tertiary))'}} />
              <span className="text-sm font-medium font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>Engagement</span>
            </div>
            <p className="text-lg sm:text-xl font-bold font-display" style={{color: 'rgb(var(--color-text-primary))'}}>
              {countsLoading ? '...' : engagementCount}
            </p>
            <p className="text-xs font-sans" style={{color: 'rgb(var(--color-text-disabled))'}}>This week</p>
          </div>
        </div>
      </div>

      {/* Create Post Section */}
      {user && (
        <div className="mb-6 sm:mb-8">
          <div className="backdrop-blur-sm rounded-xl p-1 shadow-xl" style={{backgroundColor: 'rgba(var(--color-surface), 0.9)', border: '1px solid rgb(var(--color-border))'}}>
            <CreatePostComponent onPostCreated={handlePostCreated} />
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4 sm:space-y-6">
        {isLoading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)'}}>
                <Loader2 className="animate-spin h-6 w-6 sm:h-8 sm:w-8" style={{color: 'rgb(var(--color-background))'}} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-display" style={{color: 'rgb(var(--color-text-primary))'}}>Loading your feed...</h3>
              <p className="text-sm sm:text-base font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>Fetching the latest posts from your network</p>
            </div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={(postId) => {
                setPosts(posts.filter(p => p.id !== postId));
              }}
              onUpdate={(updatedPost) => {
                setPosts(prevPosts =>
                  prevPosts.map(p =>
                    p.id === updatedPost.id ? { ...p, ...updatedPost } : p
                  )
                );
              }}
            />
          ))
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="backdrop-blur-sm rounded-xl p-8 sm:p-12 shadow-xl" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)'}}>
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" style={{color: 'rgb(var(--color-background))'}} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 font-display" style={{color: 'rgb(var(--color-text-primary))'}}>
                No posts yet
              </h3>
              <p className="text-sm sm:text-base max-w-md mx-auto mb-4 sm:mb-6 font-sans" style={{color: 'rgb(var(--color-text-secondary))'}}>
                Be the first to share something with your network! Create a post to get the conversation started.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium" style={{backgroundColor: 'rgba(var(--color-primary), 0.2)', color: 'rgb(var(--color-primary))'}}>Share thoughts</span>
                <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium" style={{backgroundColor: 'rgba(var(--color-secondary), 0.2)', color: 'rgb(var(--color-secondary))'}}>Upload photos</span>
                <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium" style={{backgroundColor: 'rgba(var(--color-tertiary), 0.2)', color: 'rgb(var(--color-tertiary))'}}>Connect</span>
              </div>
            </div>
          </div>
        )}

        {/* Load more button */}
        {posts.length > 0 && posts.length >= 10 && (
          <div className="text-center pt-6 sm:pt-8">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] hover:shadow-[0_0_20px_rgba(58,134,255,0.5)] text-white font-medium rounded-xl transition-all duration-250 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] focus:ring-offset-2 focus:ring-offset-[#0F1624] font-sans text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px]" />
              )}
              <span className="hidden sm:inline">{isLoading ? 'Loading...' : 'Load More Posts'}</span>
              <span className="sm:hidden">{isLoading ? 'Loading...' : 'Load More'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeedPage() {
  return <FeedContent />;
}