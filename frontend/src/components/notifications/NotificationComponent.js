'use client';

import { useState, useEffect } from 'react';
import { notifications as notificationsAPI, groups } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Check, X, Users, MessageSquare, Heart, UserPlus } from 'lucide-react';
import { getImageUrl } from '../../utils/image';

export default function NotificationComponent() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsAPI.getNotifications();
      setNotifications(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, is_read: true }
            : notif
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleGroupAction = async (notification, action) => {
    try {
      if (notification.type === 'group_join_request') {
        await groups.updateMember(notification.related_id, notification.user_id, { action });
      } else if (notification.type === 'group_invitation') {
        await groups.updateMember(notification.related_id, user.id, { action });
      }
      await markAsRead(notification.id);
    } catch (err) {
      console.error('Failed to handle group action:', err);
    }
  };

  const getNotificationIcon = (type) => {
    const iconStyle = { width: '1.25rem', height: '1.25rem' };
    switch (type) {
      case 'group_join_request':
      case 'group_invitation':
        return <Users style={{...iconStyle, color: 'rgb(var(--color-primary))'}} />;
      case 'message':
        return <MessageSquare style={{...iconStyle, color: 'rgb(var(--color-secondary))'}} />;
      case 'like':
        return <Heart style={{...iconStyle, color: 'rgb(var(--color-tertiary))'}} />;
      case 'follow':
        return <UserPlus style={{...iconStyle, color: 'rgb(var(--color-primary))'}} />;
      default:
        return <Bell style={{...iconStyle, color: 'rgb(var(--color-text-secondary))'}} />;
    }
  };

  const renderNotification = (notification) => {
    return (
      <div 
        key={notification.id}
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgb(var(--color-border))',
          backgroundColor: notification.is_read 
            ? 'rgb(var(--color-surface))' 
            : 'rgb(var(--color-background-light))',
          borderColor: notification.is_read 
            ? 'rgb(var(--color-border))' 
            : 'rgba(var(--color-primary), 0.2)',
          transition: 'all 0.25s',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
            {getNotificationIcon(notification.type)}
          </div>
          
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <p style={{ 
                color: 'rgb(var(--color-text-primary))', 
                fontWeight: '500', 
                fontSize: '0.875rem', 
                lineHeight: '1.5' 
              }}>
                {notification.message}
              </p>
              {!notification.is_read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(var(--color-border), 0.5)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  title="Mark as read"
                >
                  <Check style={{ width: '1rem', height: '1rem', color: 'rgb(var(--color-text-secondary))' }} />
                </button>
              )}
            </div>
            
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgb(var(--color-text-secondary))', 
              marginBottom: '0.75rem' 
            }}>
              {new Date(notification.created_at).toLocaleString()}
            </div>

            {/* Action buttons for group notifications */}
            {(notification.type === 'group_join_request' || notification.type === 'group_invitation') && !notification.is_read && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgb(var(--color-primary))',
                    color: 'rgb(var(--color-background))',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(var(--color-primary-hover))'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(var(--color-primary))'}
                  onClick={() => handleGroupAction(notification, 'accept')}
                >
                  Accept
                </button>
                <button 
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgb(var(--color-surface))',
                    color: 'rgb(var(--color-text-primary))',
                    border: '1px solid rgb(var(--color-border))',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(var(--color-border))'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(var(--color-surface))'}
                  onClick={() => handleGroupAction(notification, 'decline')}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'rgb(var(--color-background))', padding: '2rem 0' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            backgroundColor: 'rgb(var(--color-surface))', 
            borderRadius: '0.5rem', 
            padding: '2rem', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
            textAlign: 'center',
            border: '1px solid rgb(var(--color-border))'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              border: '2px solid rgb(var(--color-border))',
              borderTop: '2px solid rgb(var(--color-primary))',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: 'rgb(var(--color-text-secondary))', fontFamily: 'Inter, sans-serif' }}>
              Loading notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'rgb(var(--color-background))', padding: '2rem 0' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            backgroundColor: 'rgb(var(--color-surface))', 
            borderRadius: '0.5rem', 
            padding: '2rem', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
            textAlign: 'center',
            border: '1px solid rgb(var(--color-tertiary))'
          }}>
            <Bell style={{ width: '3rem', height: '3rem', color: 'rgb(var(--color-tertiary))', margin: '0 auto 1rem' }} />
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem', 
              color: 'rgb(var(--color-text-primary))', 
              fontFamily: 'Outfit, sans-serif' 
            }}>
              Error Loading Notifications
            </h2>
            <p style={{ 
              marginBottom: '1rem', 
              color: 'rgb(var(--color-text-secondary))', 
              fontFamily: 'Inter, sans-serif' 
            }}>
              {error}
            </p>
            <button
              onClick={fetchNotifications}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgb(var(--color-primary))',
                color: 'rgb(var(--color-background))',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.25s',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgb(var(--color-primary-hover))';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgb(var(--color-primary))';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgb(var(--color-background))', padding: '2rem 0' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Bell style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(var(--color-primary))' }} />
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: 'rgb(var(--color-text-primary))', 
              fontFamily: 'Outfit, sans-serif' 
            }}>
              Notifications
            </h1>
          </div>
          <p style={{ 
            color: 'rgb(var(--color-text-secondary))', 
            fontFamily: 'Inter, sans-serif' 
          }}>
            Stay updated with your latest activities and interactions
          </p>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.length > 0 ? (
            notifications.map(renderNotification)
          ) : (
            <div style={{ 
              backgroundColor: 'rgb(var(--color-surface))', 
              borderRadius: '0.5rem', 
              padding: '2rem', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
              textAlign: 'center',
              border: '1px solid rgb(var(--color-border))'
            }}>
              <Bell style={{ 
                width: '4rem', 
                height: '4rem', 
                color: 'rgb(var(--color-text-disabled))', 
                margin: '0 auto 1rem', 
                opacity: 0.5 
              }} />
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem', 
                color: 'rgb(var(--color-text-primary))', 
                fontFamily: 'Outfit, sans-serif' 
              }}>
                No Notifications
              </h3>
              <p style={{ 
                color: 'rgb(var(--color-text-secondary))', 
                fontFamily: 'Inter, sans-serif' 
              }}>
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}