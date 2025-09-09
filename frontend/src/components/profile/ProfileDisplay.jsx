'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Globe, 
  Lock,
  Edit2,
  Mail,
  UserCheck,
  Users
} from 'lucide-react';
import FollowButton from '../connections/FollowButton';
import { users } from '../../lib/api';
import { getAvatarUrl, getInitials } from '../../utils/image';
import VerificationBadge from '../ui/VerificationBadge';

export default function ProfileDisplay({ 
  user, 
  isOwnProfile = false, 
  onEditClick = null,
  profileData = null 
}) {
  // Use profileData if available, otherwise fall back to user
  const profile = profileData || user;
  const [followCounts, setFollowCounts] = useState({ followers: 0, following: 0, posts: 0 });
  const [countsLoading, setCountsLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchFollowCounts();
    }
  }, [profile?.id]);

  const fetchFollowCounts = async () => {
    try {
      setCountsLoading(true);
      const counts = await users.getFollowCounts(isOwnProfile ? null : profile.id);
      setFollowCounts(counts);
    } catch (error) {
      console.error('Failed to fetch follow counts:', error);
    } finally {
      setCountsLoading(false);
    }
  };
  
  if (!profile) {
    return (
      <div className="rounded-lg p-6 shadow-lg" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
        <div className="text-center" style={{color: 'rgb(var(--color-text-secondary))'}}>
          Loading profile...
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };



  return (
    <div className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-350 hover:scale-[1.02]" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
      {/* Header with privacy indicator */}
      <div className="p-6 relative" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)'}}>
        {isOwnProfile && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {profile.is_public ? (
              <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                <Globe size={12} />
                Public
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                <Lock size={12} />
                Private
              </div>
            )}
          </div>
        )}
        
        {/* Avatar and basic info */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-black/20 rounded-full flex items-center justify-center text-2xl font-semibold border-2 border-white/20 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-350">
            {profile.avatar ? (
              <img 
                src={getAvatarUrl(profile.avatar)} 
                alt={`${profile.first_name} ${profile.last_name}`}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-outfit">
                {getInitials(profile.first_name, profile.last_name)}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white font-outfit">
                {profile.first_name} {profile.last_name}
              </h1>
              <VerificationBadge 
                role={profile.role} 
                verificationStatus={profile.verification_status} 
                size="md" 
                showText={false}
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              {profile.role && profile.role !== 'user' && (
                <span className="text-sm px-3 py-1 bg-white/20 text-white rounded-full capitalize font-medium backdrop-blur-sm border border-white/10">
                  {profile.role === 'coach' ? '🏥 Health Coach' : profile.role === 'mentor' ? '🌟 Mentor' : profile.role}
                </span>
              )}
              {profile.verification_status === 'verified' && (
                <span className="text-sm px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-medium backdrop-blur-sm border border-green-400/20">
                  ✓ Verified Professional
                </span>
              )}
            </div>
            {profile.nickname && (
              <p className="text-white/80 mb-2 font-medium">
                "@{profile.nickname}"
              </p>
            )}
            <div className="flex items-center gap-2 text-white/70">
              <Mail size={16} />
              <span className="font-inter">{profile.email}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            {!isOwnProfile && (
              <FollowButton 
                targetUserID={profile.id} 
                onStatusChange={fetchFollowCounts}
              />
            )}
            
            {isOwnProfile && onEditClick && (
              <button
                onClick={onEditClick}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg 
                         flex items-center gap-2 transition-all duration-250 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                         hover:scale-105 font-medium backdrop-blur-sm border border-white/10"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="p-6 space-y-6">
        {/* About section */}
        {profile.about_me && (
          <div className="p-4 rounded-lg" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
              <User size={18} style={{color: 'rgb(var(--color-primary))'}} />
              About Me
            </h3>
            <p className="leading-relaxed font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
              {profile.about_me}
            </p>
          </div>
        )}

        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of birth */}
          {profile.date_of_birth && (
            <div className="flex items-center gap-3 p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
              <Calendar size={18} style={{color: 'rgb(var(--color-primary))'}} />
              <div>
                <span className="text-sm font-medium" style={{color: 'rgb(var(--color-text-secondary))'}}>Date of Birth</span>
                <p className="font-semibold font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
                  {formatDate(profile.date_of_birth)}
                </p>
              </div>
            </div>
          )}

          {/* Member since */}
          {profile.created_at && (
            <div className="flex items-center gap-3 p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
              <UserCheck size={18} style={{color: 'rgb(var(--color-secondary))'}} />
              <div>
                <span className="text-sm font-medium" style={{color: 'rgb(var(--color-text-secondary))'}}>Member Since</span>
                <p className="font-semibold font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
                  {formatDate(profile.created_at)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Social stats */}
        <div className="border-t pt-6" style={{borderColor: 'rgb(var(--color-border))'}}>
          <div className="flex flex-wrap items-stretch justify-between gap-8">
            {/* Activity: Posts */}
            <div className="flex-1 min-w-[120px] text-center p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
              <div className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
                {countsLoading ? '...' : followCounts.posts}
              </div>
              <div className="text-sm font-medium" style={{color: 'rgb(var(--color-text-secondary))'}}>Posts</div>
            </div>
            {/* Connections: Followers */}
            <div className="flex-1 min-w-[120px] text-center p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
              <div className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
                {countsLoading ? '...' : followCounts.followers}
              </div>
              <div className="text-sm font-medium" style={{color: 'rgb(var(--color-text-secondary))'}}>Followers</div>
            </div>
            {/* Connections: Following */}
            <div className="flex-1 min-w-[120px] text-center p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
              <div className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
                {countsLoading ? '...' : followCounts.following}
              </div>
              <div className="text-sm font-medium" style={{color: 'rgb(var(--color-text-secondary))'}}>Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
