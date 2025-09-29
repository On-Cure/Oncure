"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Users, Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { users, communities } from "../../lib/api";
import FollowButton from "../connections/FollowButton";
import { getImageUrl } from "../../utils/image";
import VerificationBadge from "../ui/VerificationBadge";

export default function RightSidebar() {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchAllData();
      fetchAllUsers(); // Fetch all users for the sidebar
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchOnlineUsers(),
        fetchCommunitiesData()
      ]);
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch online users from WebSocket connections
  const fetchOnlineUsers = async () => {
    try {
      const response = await users.getOnlineUsers();
      setOnlineUsers(response || []);
    } catch (error) {
      console.error('Error fetching online users:', error);
      setOnlineUsers([]);
    }
  };

  // Fetch all users for the sidebar (public and private)
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const data = await users.getAllUsers();
      setSuggestedUsers(data || []);
    } catch (error) {
      console.error('❌ Failed to fetch all users:', error);
      setSuggestedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch and categorize communities based on user membership
  const fetchCommunitiesData = async () => {
    try {
      const data = await communities.getCommunities();
      const communitiesArray = Array.isArray(data) ? data : data.communities || [];

      const userMemberGroups = [];
      const nonMemberGroups = [];

      // Process all communities in a single loop
      for (const community of communitiesArray) {
        try {
          const communityDetail = await communities.getCommunity(community.id);
          if (communityDetail?.members && Array.isArray(communityDetail.members)) {
            const userMembership = communityDetail.members.find(
              member => parseInt(member.user_id) === parseInt(user.id)
            );

            const communityData = {
              id: community.id,
              name: community.title,
              members: community.member_count || 0,
              category: community.category || 'General'
            };

            if (userMembership && userMembership.status === 'accepted') {
              // User is a member - add to user communities with unread count
              const unreadCount = 0; // Replace with actual unread count from the API
              userMemberGroups.push({
                ...communityData,
                unread: unreadCount
              });
            } else {
              // User is not a member or not accepted - add to suggested communities
              nonMemberGroups.push(communityData);
            }
          }
        } catch (error) {
          console.error(`Error fetching details for community ${community.id}:`, error);
        }
      }

      // Limit both lists to 4 items for better presentation
      setUserGroups(userMemberGroups.slice(0, 4));
      setSuggestedGroups(nonMemberGroups.slice(0, 4));

    } catch (error) {
      console.error('Error fetching communities data:', error);
    }
  };

  // Handle follow status change
  const handleFollowStatusChange = (userID, status) => {
    // Keep all users in the list but the follow button will update its state automatically
    // No need to remove users from the suggested list anymore
  };

  // Get user initials for avatar display
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Handle follow user action (for online users section)
  const handleFollowUser = async (userId) => {
    try {
      // This will be handled by the FollowButton component
      console.log('Following user:', userId);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  // Handle join community action
  const handleJoinCommunity = async (communityId) => {
    try {
      await communities.joinCommunity(communityId);
      // Refresh the communities data to update both lists
      fetchCommunitiesData();
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Failed to send join request. Please try again.');
    }
  };

  const sidebarClasses = "fixed right-0 top-16 bottom-0 w-80 border-l overflow-y-auto z-20 glassmorphism";
  const sidebarStyles = {
    backgroundColor: 'rgba(var(--color-surface), 0.9)',
    borderColor: 'rgb(var(--color-border))'
  };
  const containerClasses = "p-6";

  const sectionClasses = "mb-8";
  const sectionHeaderClasses = "flex items-center justify-between mb-4";
  const sectionTitleStyles = {
    fontSize: '0.875rem',
    fontFamily: 'var(--font-outfit)',
    fontWeight: '600',
    color: 'rgb(var(--color-text-primary))'
  };
  const seeAllLinkStyles = {
    fontSize: '0.75rem',
    color: 'rgb(var(--color-primary))',
    textDecoration: 'none',
    transition: 'color 0.2s'
  };

  const userListStyles = {
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '0.5rem',
    backgroundColor: 'rgb(var(--color-background))',
    borderRadius: '0.75rem',
    marginBottom: '1rem',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgb(var(--color-border)) rgb(var(--color-background))'
  };

  const userItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem'
  };

  const userAvatarStyles = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '9999px',
    backgroundColor: 'rgb(var(--color-border))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(var(--color-text-secondary))'
  };

  const userInfoStyles = {
    flex: 1
  };

  const userNameStyles = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'rgb(var(--color-text-primary))'
  };

  const userMetaStyles = {
    fontSize: '0.75rem',
    color: 'rgb(var(--color-text-secondary))'
  };

  const onlineIndicatorStyles = {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '9999px',
    backgroundColor: 'rgb(var(--color-primary))',
    marginLeft: 'auto'
  };

  const followButtonStyles = {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    backgroundColor: 'rgb(var(--color-primary))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(var(--color-background))',
    border: 'none',
    cursor: 'pointer'
  };

  const groupItemStyles = {
    padding: '0.75rem',
    backgroundColor: 'rgba(var(--color-surface), 0.8)',
    border: '1px solid rgb(var(--color-border))',
    borderRadius: '0.75rem',
    marginBottom: '0.75rem',
    transition: 'all 0.2s ease'
  };

  const groupHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem'
  };

  const groupAvatarStyles = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '9999px',
    background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(var(--color-background))'
  };

  const groupInfoStyles = {
    flex: 1
  };

  const groupNameStyles = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'rgb(var(--color-text-primary))'
  };

  const groupMetaStyles = {
    fontSize: '0.75rem',
    color: 'rgb(var(--color-text-secondary))'
  };

  const unreadBadgeStyles = {
    minWidth: '1.5rem',
    height: '1.5rem',
    borderRadius: '9999px',
    backgroundColor: 'rgb(var(--color-tertiary))',
    color: 'rgb(var(--color-background))',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0.375rem'
  };

  const joinButtonStyles = {
    width: '100%',
    padding: '0.5rem 0',
    background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
    color: 'rgb(var(--color-background))',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  if (loading) {
    return (
      <aside className={sidebarClasses} style={sidebarStyles}>
        <div className={containerClasses}>
          <div className="text-center py-8" style={{color: 'rgb(var(--color-text-primary))'}}>
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 mb-4" style={{borderColor: 'rgb(var(--color-primary))', borderTopColor: 'transparent'}}></div>
            <p>Loading...</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={sidebarClasses}>
      <div className={containerClasses}>
        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className={sectionClasses}>
            <div className={sectionHeaderClasses}>
              <h3 style={sectionTitleStyles}>Online Users ({onlineUsers.length})</h3>
              <Link href="/online" style={seeAllLinkStyles}>
                See All
              </Link>
            </div>

            <div style={userListStyles}>
              {onlineUsers.map(onlineUser => (
                <Link key={onlineUser.id} href={`/profile/${onlineUser.id}`} style={{ textDecoration: 'none' }}>
                  <div style={userItemStyles}>
                    {onlineUser.avatar ? (
                      <img
                        src={getImageUrl(onlineUser.avatar)}
                        alt={`${onlineUser.first_name} ${onlineUser.last_name}`}
                        style={{...userAvatarStyles, objectFit: 'cover'}}
                      />
                    ) : (
                      <div style={userAvatarStyles}>
                        {getInitials(onlineUser.first_name, onlineUser.last_name)}
                      </div>
                    )}
                    <div style={userInfoStyles}>
                      <p style={userNameStyles}>{onlineUser.first_name} {onlineUser.last_name}</p>
                      <p style={userMetaStyles}>
                        {onlineUser.nickname ? `@${onlineUser.nickname}` : 'Online now'}
                      </p>
                    </div>
                    <div style={onlineIndicatorStyles}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Communities */}
        {userGroups.length > 0 && (
          <div className={sectionClasses}>
            <div className={sectionHeaderClasses}>
              <h3 style={sectionTitleStyles}>Featured Communities</h3>
              <Link href="/communities" style={seeAllLinkStyles}>
                See All
              </Link>
            </div>

            <div>
              {userGroups.map(community => (
                <Link key={community.id} href={`/communities/${community.id}`} style={{ textDecoration: 'none' }}>
                  <div style={groupItemStyles}>
                    <div style={groupHeaderStyles}>
                      <div style={groupAvatarStyles}>
                        <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <div style={groupInfoStyles}>
                        <p style={groupNameStyles}>{community.name}</p>
                        <p style={groupMetaStyles}>{community.category} • {community.members.toLocaleString()} members</p>
                      </div>
                      {community.unread > 0 && (
                        <div style={unreadBadgeStyles}>
                          {community.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        
        {/* Suggested Communities */}
        {suggestedGroups.length > 0 && (
          <div className={sectionClasses}>
            <div className={sectionHeaderClasses}>
              <h3 style={sectionTitleStyles}>Suggested Communities</h3>
              <Link href="/communities?tab=discover" style={seeAllLinkStyles}>
                See All
              </Link>
            </div>

            <div>
              {suggestedGroups.map(community => (
                <div key={community.id} style={groupItemStyles}>
                  <div style={groupHeaderStyles}>
                    <div style={groupAvatarStyles}>
                      <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <div style={groupInfoStyles}>
                      <p style={groupNameStyles}>{community.name}</p>
                      <p style={groupMetaStyles}>{community.category} • {community.members.toLocaleString()} members</p>
                    </div>
                  </div>
                  <button style={joinButtonStyles} onClick={() => handleJoinCommunity(community.id)}>
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}