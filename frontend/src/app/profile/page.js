'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import ProfileDisplay from '../../components/profile/ProfileDisplay';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import ActivityPage from '../../components/activity/ActivityPage';
import ConnectionsPage from '../../components/connections/ConnectionsPage';
import { User, Activity, Users } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize active tab from URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'activity', 'connections'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`/profile?${params.toString()}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (profileData) => {
    try {
      setUpdateLoading(true);
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Error is already handled by the hook
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="w-full py-4 sm:py-6 lg:py-8">
        <div className="rounded-lg p-8 shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
          <div className="animate-pulse">
            <div className="h-32 rounded-lg mb-6" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
            <div className="space-y-4">
              <div className="h-4 rounded w-3/4" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
              <div className="h-4 rounded w-1/2" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
              <div className="h-4 rounded w-2/3" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-4 sm:py-6 lg:py-8">
        <div className="rounded-lg p-8 text-center shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-tertiary))'}}>
          <div className="mb-4" style={{color: 'rgb(var(--color-tertiary))'}}>
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Error Loading Profile</h2>
          <p className="mb-4 font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg transition-all duration-250 hover:scale-105 font-medium"
            style={{
              background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
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
    <div className="w-full py-4 sm:py-6 lg:py-8">
      <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="rounded-lg p-6 shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
        <div className="flex gap-3 overflow-x-auto">
          <button
            onClick={() => handleTabChange('profile')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-250 whitespace-nowrap hover:scale-105"
            style={{
              background: activeTab === 'profile' ? 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)' : 'rgb(var(--color-background))',
              color: activeTab === 'profile' ? 'rgb(var(--color-background))' : 'rgb(var(--color-text-secondary))',
              border: activeTab === 'profile' ? 'none' : '1px solid rgb(var(--color-border))'
            }}
          >
            <User size={18} style={{color: activeTab === 'profile' ? 'rgb(var(--color-background))' : 'rgb(var(--color-primary))'}} />
            Profile
          </button>
          <button
            onClick={() => handleTabChange('activity')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-250 whitespace-nowrap hover:scale-105"
            style={{
              background: activeTab === 'activity' ? 'linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-tertiary)) 100%)' : 'rgb(var(--color-background))',
              color: activeTab === 'activity' ? 'rgb(var(--color-background))' : 'rgb(var(--color-text-secondary))',
              border: activeTab === 'activity' ? 'none' : '1px solid rgb(var(--color-border))'
            }}
          >
            <Activity size={18} style={{color: activeTab === 'activity' ? 'rgb(var(--color-background))' : 'rgb(var(--color-secondary))'}} />
            Activity
          </button>
          <button
            onClick={() => handleTabChange('connections')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-250 whitespace-nowrap hover:scale-105"
            style={{
              background: activeTab === 'connections' ? 'linear-gradient(135deg, rgb(var(--color-tertiary)) 0%, rgb(var(--color-primary)) 100%)' : 'rgb(var(--color-background))',
              color: activeTab === 'connections' ? 'rgb(var(--color-background))' : 'rgb(var(--color-text-secondary))',
              border: activeTab === 'connections' ? 'none' : '1px solid rgb(var(--color-border))'
            }}
          >
            <Users size={18} style={{color: activeTab === 'connections' ? 'rgb(var(--color-background))' : 'rgb(var(--color-tertiary))'}} />
            Connections
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <>
          {isEditing ? (
            <ProfileEditForm
              user={profile || user}
              onSave={handleSave}
              onCancel={handleCancel}
              loading={updateLoading}
            />
          ) : (
            <ProfileDisplay
              user={user}
              profileData={profile}
              isOwnProfile={true}
              onEditClick={handleEditClick}
            />
          )}
        </>
      )}

      {activeTab === 'activity' && (
        <ActivityPage
          userID={null}
          isOwnProfile={true}
        />
      )}

      {activeTab === 'connections' && (
        <ConnectionsPage
          userID={null}
          isOwnProfile={true}
        />
      )}
      </div>
    </div>
  );
}
