'use client';

import { useState, useEffect } from 'react';
import ProfileDisplay from './ProfileDisplay';
import ProfileEditForm from './ProfileEditForm';
import { users } from '../../lib/api';
import { User, Settings, Shield } from 'lucide-react';

export default function ProfileComponent({ userId = null, isOwnProfile = false }) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, [userId, isOwnProfile]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isOwnProfile) {
        const [userResponse, profileResponse] = await Promise.all([
          users.getCurrentUser(),
          users.getProfile()
        ]);
        setUser(userResponse);
        setProfileData(profileResponse);
      } else if (userId) {
        const userResponse = await users.getProfile(userId);
        setUser(userResponse);
        setProfileData(userResponse);
      } else {
        throw new Error('No user ID provided for public profile');
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      setSaving(true);
      setError(null);
      
      const savedProfile = await users.updateProfile(formData);
      setProfileData(savedProfile);
      setIsEditing(false);
      
      // Refresh the profile data to ensure consistency
      await fetchUserProfile();
    } catch (error) {
      console.error('Failed to save profile:', error);
      setError(error.message || 'Failed to save profile');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'rgb(var(--color-background))'}}>
        <div className="rounded-lg p-8 shadow-xl text-center" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: 'rgb(var(--color-primary))'}}></div>
          <p className="font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'rgb(var(--color-background))'}}>
        <div className="rounded-lg p-8 shadow-xl text-center max-w-md" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-tertiary))'}}>
          <Shield size={48} className="mx-auto mb-4" style={{color: 'rgb(var(--color-tertiary))'}} />
          <h2 className="text-xl font-bold mb-2 font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Profile Error</h2>
          <p className="mb-4 font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>>{error}</p>
          <button
            onClick={fetchUserProfile}
            className="px-6 py-3 rounded-lg transition-all duration-250 hover:scale-105 font-medium"
            style={{
              background: `linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)`,
              color: 'rgb(var(--color-background))'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{backgroundColor: 'rgb(var(--color-background))'}}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User size={24} style={{color: 'rgb(var(--color-primary))'}} />
            <h1 className="text-3xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
              {isOwnProfile ? 'My Profile' : `${user?.first_name || 'User'}'s Profile`}
            </h1>
          </div>
          <p className="font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
            {isOwnProfile 
              ? 'Manage your profile information and privacy settings'
              : 'View profile information and connect with this user'
            }
          </p>
        </div>

        {/* Profile Content */}
        {isEditing ? (
          <ProfileEditForm
            user={profileData || user}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
            loading={saving}
          />
        ) : (
          <ProfileDisplay
            user={user}
            profileData={profileData}
            isOwnProfile={isOwnProfile}
            onEditClick={isOwnProfile ? handleEditClick : null}
          />
        )}

        {/* Error display */}
        {error && !loading && (
          <div className="mt-6 rounded-lg p-4" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-tertiary))'}}>
            <p className="font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
