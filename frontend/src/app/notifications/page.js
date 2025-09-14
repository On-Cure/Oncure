"use client";

import { useState, useEffect } from 'react';
import { notifications } from '../../lib/api';
import Navbar from '../../components/layout/Navbar';
import { Bell, User, Users, Heart, MessageSquare } from 'lucide-react';

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notifications.getNotifications();
      setNotificationsList(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notifications.markAsRead(notificationId);
      setNotificationsList(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notifications.markAllAsRead();
      setNotificationsList(prev => 
        prev.map(notif => ({ ...notif, is_read: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleAcceptFollowRequest = async (userId, notificationId) => {
    try {
      const { users } = await import('../../lib/api');
      await users.acceptFollowRequest(userId);
      await handleMarkAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to accept follow request:', error);
    }
  };

  const handleDeclineFollowRequest = async (userId, notificationId) => {
    try {
      const { users } = await import('../../lib/api');
      await users.cancelFollowRequest(userId);
      await handleMarkAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to decline follow request:', error);
    }
  };

  const handleGroupInvitation = async (groupId, action, notificationId) => {
    try {
      const { groups, auth } = await import('../../lib/api');
      const session = await auth.getSession();
      await groups.updateMember(groupId, session.id, action === 'accept' ? 'accepted' : 'declined');
      await handleMarkAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to handle group invitation:', error);
    }
  };

  const handleGroupJoinRequest = async (groupId, userId, action, notificationId) => {
    try {
      const { groups } = await import('../../lib/api');
      await groups.updateMember(groupId, userId, action === 'accept' ? 'accepted' : 'declined');
      await handleMarkAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to handle group join request:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow':
      case 'follow_request':
        return <Users size={20} style={{color: 'rgb(var(--color-primary))'}} />;
      case 'group_invitation':
      case 'group_join_request':
        return <Users size={20} style={{color: 'rgb(var(--color-success))'}} />;
      case 'like':
        return <Heart size={20} style={{color: 'rgb(var(--color-tertiary))'}} />;
      case 'comment':
        return <MessageSquare size={20} style={{color: 'rgb(var(--color-secondary))'}} />;
      default:
        return <Bell size={20} style={{color: 'rgb(var(--color-text-secondary))'}} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8 lg:pl-8 py-4 space-y-6" style={{ paddingTop: '5rem' }}>
        <div className="rounded-lg p-6 shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)', boxShadow: '0 0 15px rgba(var(--color-primary), 0.3)'}}>
                <Bell size={24} style={{color: 'rgb(var(--color-background))'}} />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Notifications</h1>
                <p className="font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>Stay updated with your latest activities</p>
              </div>
            </div>
            
            {notificationsList.some(notif => !notif.is_read) && (
              <button
                onClick={handleMarkAllAsRead}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                Mark All Read
              </button>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-4">
                  <div className="animate-pulse flex items-center gap-4">
                    <div className="w-12 h-12 bg-border rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-border rounded w-3/4"></div>
                      <div className="h-3 bg-border rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-error mb-4">
                <Bell size={48} className="mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Error Loading Notifications</h2>
              <p className="text-text-secondary mb-4">{error}</p>
              <button 
                onClick={fetchNotifications}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : notificationsList.length === 0 ? (
            <div className="text-center py-8">
              <Bell size={48} className="mx-auto text-text-disabled mb-4" />
              <h2 className="text-xl font-semibold text-text-primary mb-2">No Notifications</h2>
              <p className="text-text-secondary">You&apos;re all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notificationsList.map((notification) => (
                <div 
                  key={notification.id}
                  className="rounded-lg p-4 cursor-pointer transition-all duration-250 hover:scale-[1.01]"
                  style={{
                    backgroundColor: notification.is_read ? 'rgb(var(--color-background))' : 'rgba(var(--color-primary), 0.1)',
                    border: notification.is_read ? '1px solid rgb(var(--color-border))' : '1px solid rgba(var(--color-primary), 0.3)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'rgb(var(--color-primary))'}
                  onMouseLeave={(e) => e.target.style.borderColor = notification.is_read ? 'rgb(var(--color-border))' : 'rgba(var(--color-primary), 0.3)'}
                  onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter break-words" style={{
                        color: notification.is_read ? 'rgb(var(--color-text-secondary))' : 'rgb(var(--color-text-primary))',
                        fontWeight: notification.is_read ? '400' : '500'
                      }}>
                        {notification.message}
                      </p>
                      <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-text-disabled))'}}>
                        {formatDate(notification.created_at)}
                      </p>
                      {notification.type === 'follow_request' && !notification.is_read && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptFollowRequest(notification.related_id, notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, rgb(var(--color-success)) 0%, rgb(var(--color-primary)) 100%)',
                              color: 'rgb(var(--color-background))',
                              border: 'none'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeclineFollowRequest(notification.related_id, notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              backgroundColor: 'rgb(var(--color-background))',
                              color: 'rgb(var(--color-text-secondary))',
                              border: '1px solid rgb(var(--color-border))'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-border))';
                              e.target.style.color = 'rgb(var(--color-text-primary))';
                              e.target.style.borderColor = 'rgb(var(--color-tertiary))';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-background))';
                              e.target.style.color = 'rgb(var(--color-text-secondary))';
                              e.target.style.borderColor = 'rgb(var(--color-border))';
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {notification.type === 'group_invitation' && !notification.is_read && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGroupInvitation(notification.related_id, 'accept', notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, rgb(var(--color-success)) 0%, rgb(var(--color-primary)) 100%)',
                              color: 'rgb(var(--color-background))',
                              border: 'none'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGroupInvitation(notification.related_id, 'decline', notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              backgroundColor: 'rgb(var(--color-background))',
                              color: 'rgb(var(--color-text-secondary))',
                              border: '1px solid rgb(var(--color-border))'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-border))';
                              e.target.style.color = 'rgb(var(--color-text-primary))';
                              e.target.style.borderColor = 'rgb(var(--color-tertiary))';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-background))';
                              e.target.style.color = 'rgb(var(--color-text-secondary))';
                              e.target.style.borderColor = 'rgb(var(--color-border))';
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {notification.type === 'group_join_request' && !notification.is_read && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGroupJoinRequest(notification.related_id, notification.user_id, 'accept', notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, rgb(var(--color-success)) 0%, rgb(var(--color-primary)) 100%)',
                              color: 'rgb(var(--color-background))',
                              border: 'none'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGroupJoinRequest(notification.related_id, notification.user_id, 'decline', notification.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:scale-105"
                            style={{
                              backgroundColor: 'rgb(var(--color-background))',
                              color: 'rgb(var(--color-text-secondary))',
                              border: '1px solid rgb(var(--color-border))'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-border))';
                              e.target.style.color = 'rgb(var(--color-text-primary))';
                              e.target.style.borderColor = 'rgb(var(--color-tertiary))';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgb(var(--color-background))';
                              e.target.style.color = 'rgb(var(--color-text-secondary))';
                              e.target.style.borderColor = 'rgb(var(--color-border))';
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                    {!notification.is_read && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{backgroundColor: 'rgb(var(--color-primary))'}}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
