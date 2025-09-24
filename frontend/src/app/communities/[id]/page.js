'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../../hooks/useAuth';
import { communities } from '../../../lib/api';
import { getImageUrl } from '../../../utils/image';
import CommunityPosts from '../../../components/communities/CommunityPosts';
import CommunityMembers from '../../../components/communities/CommunityMembers';
import CommunityEvents from '../../../components/communities/CommunityEvents';
import CommunityChatInterface from '../../../components/chat/CommunityChatInterface';

export default function CommunityDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (params.id) {
      fetchCommunity();
    }
  }, [params.id]);

  const fetchCommunity = async () => {
    try {
      const data = await communities.getCommunity(params.id);

      const [postsData, eventsData] = await Promise.all([
        communities.getPosts(params.id).catch(() => ({ posts: [] })),
        communities.getEvents(params.id).catch(() => [])
      ]);

      const communityData = {
        id: data.id,
        title: data.title || '',
        description: data.description || '',
        creator_id: data.creator_id,
        first_name: data.creator?.first_name || data.first_name || data.creator_first_name || '',
        last_name: data.creator?.last_name || data.last_name || data.creator_last_name || '',
        members: Array.isArray(data.members) ? data.members : [],
        posts: postsData.posts || postsData || [],
        events: Array.isArray(eventsData) ? eventsData : eventsData.events || [],
        ...data
      };

      setCommunity(communityData);
    } catch (error) {
      console.error('Error fetching community:', error);
      if (error.message.includes('403') || error.message.includes('access')) {
        alert('You need to be a member to view this community');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = async () => {
    if (!confirm('Are you sure you want to leave this community?')) return;

    try {
      await communities.leaveCommunity(params.id);
      alert('Successfully left the community');
      window.location.href = '/communities';
    } catch (error) {
      console.error('Error leaving community:', error);
      alert(error.message || 'Failed to leave community');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading community...</div>;
  }

  if (!community) {
    return <div className="text-center p-8">Community not found or access denied</div>;
  }

  const isCreator = user && community.creator_id === user.id;
  const pendingMembers = community.members?.filter(member => member.status === 'pending') || [];
  const acceptedMembers = community.members?.filter(member => member.status === 'accepted') || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <Card variant="glassmorphism" className="p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary">{community.title}</h1>
              <span className="px-4 py-2 text-sm font-medium bg-secondary/20 text-secondary rounded-full border border-secondary/30 w-fit">
                {community.category || 'General'}
              </span>
            </div>
            <p className="text-text-secondary text-lg mb-4 leading-relaxed">{community.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                {community.creator?.avatar ? (
                  <img
                    src={getImageUrl(community.creator.avatar)}
                    alt={`${community.creator.first_name} ${community.creator.last_name}`}
                    className="w-6 h-6 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-6 h-6 bg-primary-gradient rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {community.creator?.first_name?.[0]}{community.creator?.last_name?.[0]}
                    </span>
                  </div>
                )}
                <span>Created by {community.creator?.first_name || community.first_name} {community.creator?.last_name || community.last_name}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {acceptedMembers.length} members
              </span>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            {!isCreator && (
              <Button
                variant="danger"
                size="lg"
                onClick={handleLeaveCommunity}
                className="flex-1 lg:flex-none"
              >
                Leave Community
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 mb-8">
        {['posts', 'members', 'events', 'chat'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'primary' : 'ghost'}
            size="lg"
            onClick={() => setActiveTab(tab)}
            className="capitalize relative"
          >
            {tab}
            {tab === 'members' && pendingMembers.length > 0 && (
              <span className="ml-2 bg-error text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                {pendingMembers.length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {activeTab === 'posts' && (
        <CommunityPosts
          params={params}
          community={community}
          fetchCommunity={fetchCommunity}
        />
      )}

      {activeTab === 'members' && (
        <CommunityMembers
          params={params}
          community={community}
          isCreator={isCreator}
          pendingMembers={pendingMembers}
          acceptedMembers={acceptedMembers}
          fetchCommunity={fetchCommunity}
        />
      )}

      {activeTab === 'events' && (
        <CommunityEvents
          params={params}
          community={community}
          fetchCommunity={fetchCommunity}
        />
      )}

      {activeTab === 'chat' && (
        <div style={{ height: '600px' }}>
          <CommunityChatInterface community={community} />
        </div>
      )}
    </div>
  );
}