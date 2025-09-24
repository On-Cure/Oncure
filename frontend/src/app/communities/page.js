"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { communities } from "../../lib/api";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { getImageUrl } from "../../utils/image";
import { Users, Search, Plus, Crown, Trash2 } from "lucide-react";
import ClientAuthGuard from "../../components/auth/ClientAuthGuard";

const COMMUNITY_CATEGORIES = [
  'Support Groups', 'Treatment Discussion', 'Nutrition & Wellness', 'Caregivers', 
  'Survivors', 'General Discussion', 'Mental Health', 'Exercise & Fitness', 'Other'
];

function CommunitiesContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-communities');
  const [myCommunities, setMyCommunities] = useState([]);
  const [discoverCommunities, setDiscoverCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunity, setNewCommunity] = useState({ 
    title: '', 
    description: '', 
    category: 'Support Groups' 
  });
  const [membershipStates, setMembershipStates] = useState({});

  useEffect(() => {
    if (user?.id) {
      fetchCommunities();
    }
  }, [user]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const data = await communities.getCommunities();
      const communitiesArray = Array.isArray(data) ? data : data.communities || [];
      
      await categorizeCommunities(communitiesArray);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const categorizeCommunities = async (communitiesArray) => {
    const myComms = [];
    const discoverComms = [];
    const states = {};

    await Promise.all(
      communitiesArray.map(async (community) => {
        try {
          const communityDetail = await communities.getCommunity(community.id);
          if (communityDetail?.members && Array.isArray(communityDetail.members)) {
            const userMembership = communityDetail.members.find(
              member => parseInt(member.user_id) === parseInt(user.id)
            );
            
            const status = userMembership ? userMembership.status : 'none';
            states[community.id] = status;
            
            const communityData = {
              ...community,
              isCreator: parseInt(community.creator_id) === parseInt(user.id),
              memberCount: communityDetail.members.length,
              members: communityDetail.members
            };

            if (userMembership && userMembership.status === 'accepted') {
              myComms.push(communityData);
            } else {
              discoverComms.push(communityData);
            }
          }
        } catch (error) {
          console.error(`Error fetching details for community ${community.id}:`, error);
          states[community.id] = 'none';
          discoverComms.push(community);
        }
      })
    );

    setMyCommunities(myComms);
    setDiscoverCommunities(discoverComms);
    setMembershipStates(states);
  };

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      const newCommunityData = await communities.createCommunity(newCommunity);
      setNewCommunity({ title: '', description: '', category: 'Support Groups' });
      setShowCreateForm(false);
      
      if (newCommunityData) {
        const communityWithDetails = {
          ...newCommunityData,
          isCreator: true,
          memberCount: 1,
          members: [{ user_id: user.id, status: 'accepted' }]
        };
        setMyCommunities(prev => [communityWithDetails, ...prev]);
        setMembershipStates(prev => ({ ...prev, [newCommunityData.id]: 'accepted' }));
      } else {
        fetchCommunities();
      }
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      setMembershipStates(prev => ({ ...prev, [communityId]: 'pending' }));
      await communities.joinCommunity(communityId);
      
      setTimeout(() => {
        fetchCommunities();
      }, 1000);
    } catch (error) {
      console.error('Error joining community:', error);
      setMembershipStates(prev => ({ ...prev, [communityId]: 'none' }));
      alert('Failed to join community. Please try again.');
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    if (!confirm('Are you sure you want to delete this community? This action cannot be undone.')) {
      return;
    }
    
    try {
      await communities.deleteCommunity(communityId);
      setMyCommunities(prev => prev.filter(c => c.id !== communityId));
      alert('Community deleted successfully.');
    } catch (error) {
      console.error('Error deleting community:', error);
      alert('Failed to delete community. Please try again.');
    }
  };

  const getFilteredCommunities = (communities) => {
    if (!searchQuery) return communities;
    return communities.filter(community =>
      community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Check if user can create communities (verified mentors and coaches)
  const canCreateCommunity = () => {
    if (!user) return false;
    const isVerified = user.verification_status === 'verified';
    const isMentorOrCoach = user.role === 'mentor' || user.role === 'coach';
    return isVerified && isMentorOrCoach;
  };

  const getJoinButtonState = (community) => {
    const membershipStatus = membershipStates[community.id];
    
    switch (membershipStatus) {
      case 'accepted':
        return { text: 'View Community', disabled: false, variant: 'default', action: 'view' };
      case 'pending':
        return { text: 'Request Sent', disabled: true, variant: 'outline', action: 'none' };
      default:
        return { text: 'Join Community', disabled: false, variant: 'outline', action: 'join' };
    }
  };

  const handleButtonClick = (community) => {
    const buttonState = getJoinButtonState(community);
    
    if (buttonState.action === 'view') {
      window.location.href = `/communities/${community.id}`;
    } else if (buttonState.action === 'join') {
      handleJoinCommunity(community.id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading communities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 lg:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-2">
                Communities
              </h1>
              <p className="text-lg text-text-secondary">
                Connect with supportive communities on your healing journey
              </p>
            </div>
            {canCreateCommunity() && (
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white"
                style={{
                  backgroundColor: 'rgb(var(--color-primary))',
                  color: 'white'
                }}
              >
                <Plus className="w-5 h-5" />
                {showCreateForm ? 'Cancel' : 'Create Community'}
              </Button>
            )}
          </div>

          {/* Info message for non-verified users */}
          {!canCreateCommunity() && (
            <div className="mb-6 p-4 rounded-lg border border-border bg-surface/50">
              <p className="text-sm text-text-secondary">
                <strong>Want to create a community?</strong> Only verified mentors and coaches can create and manage communities. 
                {user?.role !== 'mentor' && user?.role !== 'coach' && (
                  <span> Consider applying to become a mentor or coach.</span>
                )}
                {(user?.role === 'mentor' || user?.role === 'coach') && user?.verification_status !== 'verified' && (
                  <span> Please complete your verification process.</span>
                )}
              </p>
            </div>
          )}

          {/* Community Tabs */}
          <div className="flex gap-1 p-1 rounded-lg mb-6" style={{backgroundColor: 'rgba(var(--color-surface), 0.8)', border: '1px solid rgb(var(--color-border))'}}>
            <button
              onClick={() => setActiveTab('my-communities')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-normal ${
                activeTab === 'my-communities'
                  ? 'text-white shadow-lg'
                  : 'hover:bg-primary/10'
              }`}
              style={{
                backgroundColor: activeTab === 'my-communities' ? 'rgb(var(--color-primary))' : 'transparent',
                color: activeTab === 'my-communities' ? 'white' : 'rgb(var(--color-text-primary))'
              }}
            >
              My Communities ({myCommunities.length})
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-normal ${
                activeTab === 'discover'
                  ? 'text-white shadow-lg'
                  : 'hover:bg-primary/10'
              }`}
              style={{
                backgroundColor: activeTab === 'discover' ? 'rgb(var(--color-primary))' : 'transparent',
                color: activeTab === 'discover' ? 'white' : 'rgb(var(--color-text-primary))'
              }}
            >
              Discover ({discoverCommunities.length})
            </button>
          </div>
        </div>

        {/* Create Community Form */}
        {showCreateForm && canCreateCommunity() && (
          <Card variant="glassmorphism" className="p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Create New Community</h2>
              <p className="text-text-secondary">Start a supportive community for your healing journey</p>
            </div>
            <form onSubmit={handleCreateCommunity}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-display font-semibold text-text-primary mb-2">Community Name</label>
                  <Input
                    value={newCommunity.title}
                    onChange={(e) => setNewCommunity({ ...newCommunity, title: e.target.value })}
                    placeholder="Enter community name"
                    variant="filled"
                    size="lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-display font-semibold text-text-primary mb-2">Category</label>
                  <select
                    value={newCommunity.category}
                    onChange={(e) => setNewCommunity({ ...newCommunity, category: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal appearance-none pr-10 font-medium"
                    style={{
                      backgroundImage: "url(" + encodeURI("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23B8C1CF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") + "" + ")",
                      backgroundPosition: "right 0.75rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.25em 1.25em"
                    }}
                    required
                  >
                    {COMMUNITY_CATEGORIES.map(category => (
                      <option key={category} value={category} style={{backgroundColor: '#1A2333', color: '#FFFFFF'}}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-display font-semibold text-text-primary mb-2">Description</label>
                  <textarea
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                    placeholder="Describe what your community is about..."
                    className="w-full p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal resize-none"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Create Community
                  </Button>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="lg"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        )}

        {/* Search Bar for Discover Tab */}
        {activeTab === 'discover' && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="pl-10"
                variant="filled"
                size="lg"
              />
            </div>
          </div>
        )}

        {/* Communities List */}
        <div className="space-y-6">
          {activeTab === 'my-communities' ? (
            getFilteredCommunities(myCommunities).length > 0 ? (
              getFilteredCommunities(myCommunities).map((community) => (
                <Card key={community.id} variant="glassmorphism" hover className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-display font-bold text-xl">
                            {community.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-bold text-xl text-text-primary">{community.title}</h3>
                            {community.isCreator && (
                              <Crown className="w-5 h-5 text-yellow-500" title="You are the creator" />
                            )}
                          </div>
                          <span className="px-3 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full border border-secondary/30 w-fit">
                            {community.category || 'General'}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm mb-3 line-clamp-2">{community.description}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {community.memberCount || community.member_count || 0} members
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
                      <Button
                        size="lg"
                        variant="default"
                        onClick={() => window.location.href = `/groups/${community.id}`}
                        className="flex-1 sm:flex-none"
                      >
                        View Community
                      </Button>
                      {community.isCreator && (
                        <Button
                          size="lg"
                          variant="danger"
                          onClick={() => handleDeleteCommunity(community.id)}
                          className="sm:w-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface border border-border flex items-center justify-center">
                  <Users className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                  No communities yet
                </h3>
                <p className="text-text-secondary max-w-md mx-auto mb-4">
                  Join communities to connect with others on similar healing journeys.
                </p>
                <Button onClick={() => setActiveTab('discover')} variant="primary">
                  Discover Communities
                </Button>
              </div>
            )
          ) : (
            getFilteredCommunities(discoverCommunities).length > 0 ? (
              getFilteredCommunities(discoverCommunities).map((community) => {
                const joinButtonState = getJoinButtonState(community);
                
                return (
                  <Card key={community.id} variant="glassmorphism" hover className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-display font-bold text-xl">
                              {community.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-display font-bold text-xl text-text-primary">{community.title}</h3>
                            <span className="px-3 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full border border-secondary/30 w-fit">
                              {community.category || 'General'}
                            </span>
                          </div>
                          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{community.description}</p>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                              {community.creator?.avatar || community.avatar ? (
                                <img
                                  src={getImageUrl(community.creator?.avatar || community.avatar)}
                                  alt={`${community.creator?.first_name || community.first_name} ${community.creator?.last_name || community.last_name}`}
                                  className="w-6 h-6 rounded-full border border-border"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-primary-gradient rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-semibold">
                                    {(community.creator?.first_name || community.first_name)?.[0]}{(community.creator?.last_name || community.last_name)?.[0]}
                                  </span>
                                </div>
                              )}
                              <span>by {community.creator?.first_name || community.first_name} {community.creator?.last_name || community.last_name}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {community.member_count || 0} members
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
                        <Button
                          size="lg"
                          variant={joinButtonState.variant}
                          disabled={joinButtonState.disabled}
                          onClick={() => handleButtonClick(community)}
                          className="flex-1 sm:flex-none"
                        >
                          {joinButtonState.text}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface border border-border flex items-center justify-center">
                  <Search className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                  {searchQuery ? 'No communities found' : 'No communities available'}
                </h3>
                <p className="text-text-secondary max-w-md mx-auto">
                  {searchQuery 
                    ? 'Try adjusting your search terms or create a new community.'
                    : 'Be the first to create a community and start building your support network!'
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommunitiesPage() {
  return (
    <ClientAuthGuard>
      <CommunitiesContent />
    </ClientAuthGuard>
  );
}