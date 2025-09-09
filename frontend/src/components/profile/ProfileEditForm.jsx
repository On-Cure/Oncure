'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Save, 
  X, 
  Upload,
  User,
  Mail,
  Calendar,
  FileText,
  AtSign,
  Globe,
  Lock,
  Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import VerificationBadge from '../ui/VerificationBadge';
import { getAvatarUrl, getInitials } from '../../utils/image';

// Validation schema
const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  last_name: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  nickname: z.string().max(30, 'Nickname too long').optional().or(z.literal('')),
  about_me: z.string().max(500, 'About me section too long').optional().or(z.literal('')),
  date_of_birth: z.string().min(1, 'Date of birth is required').refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const minAge = new Date();
    minAge.setFullYear(today.getFullYear() - 13);
    const maxAge = new Date();
    maxAge.setFullYear(today.getFullYear() - 120);

    if (birthDate > today) return false;
    if (birthDate > minAge) return false;
    if (birthDate < maxAge) return false;
    return true;
  }, {
    message: 'Please enter a valid date of birth (must be at least 13 years old and not in the future)'
  }),
  is_public: z.boolean()
});

export default function ProfileEditForm({ 
  user, 
  onSave, 
  onCancel, 
  loading = false 
}) {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  
  // Debug user data
  console.log('ProfileEditForm user data:', user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      nickname: user?.nickname || '',
      about_me: user?.about_me || '',
      date_of_birth: user?.date_of_birth ? user.date_of_birth.split('T')[0] : '',
      is_public: user?.is_public !== false // Default to public if not specified
    }
  });

  const isPublic = watch('is_public');

  // Handle avatar file selection
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      let avatarUrl = user?.avatar || '';
      
      // Handle avatar upload if a new file was selected
      if (avatarFile) {
        try {
          const { upload } = await import('../../lib/api');
          const uploadResponse = await upload.uploadFile(avatarFile);
          avatarUrl = uploadResponse.url;
        } catch (uploadError) {
          console.error('Avatar upload failed:', uploadError);
          throw new Error('Failed to upload avatar');
        }
      }
      
      const formData = {
        ...data,
        avatar: avatarUrl
      };
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };



  return (
    <div className="rounded-lg p-6 shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Edit Profile</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg transition-all duration-250 hover:scale-110"
          style={{
            color: 'rgb(var(--color-text-secondary))',
            ':hover': {
              color: 'rgb(var(--color-text-primary))',
              backgroundColor: 'rgb(var(--color-background))'
            }
          }}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar section */}
        <div className="flex items-center gap-6 p-4 rounded-lg" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-surface))', borderColor: 'rgb(var(--color-border))'}}>
              {avatarPreview ? (
                <img 
                  src={getAvatarUrl(avatarPreview)} 
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold font-outfit" style={{color: 'rgb(var(--color-text-secondary))'}}>
                  {getInitials(watch('first_name'), watch('last_name'))}
                </span>
              )}
            </div>
            <label 
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 p-2 rounded-full cursor-pointer transition-all duration-250 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
                color: 'rgb(var(--color-background))'
              }}
            >
              <Upload size={14} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Profile Picture</h3>
            <p className="text-sm font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>Click the upload button to change your avatar</p>
          </div>
        </div>

        {/* Privacy toggle */}
        <div className="p-4 rounded-lg transition-all duration-250" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPublic ? <Globe size={20} style={{color: 'rgb(var(--color-primary))'}} /> : <Lock size={20} style={{color: 'rgb(var(--color-secondary))'}} />}
              <div>
                <h4 className="font-semibold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>Profile Visibility</h4>
                <p className="text-sm font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
                  {isPublic ? 'Your profile is visible to everyone' : 'Your profile is private'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('is_public')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 peer-focus:outline-none rounded-full peer 
                           peer-checked:after:translate-x-full peer-checked:after:border-white 
                           after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                           after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all duration-250"
                   style={{
                     backgroundColor: 'rgb(var(--color-border))',
                     '--tw-peer-checked-bg': 'rgb(var(--color-primary))'
                   }}></div>
            </label>
          </div>
        </div>

        {/* Verification Section */}
        {user?.role !== 'user' && (
          <div className="p-4 rounded-lg" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={20} style={{color: 'rgb(var(--color-primary))'}} />
                <div>
                  <h4 className="font-semibold font-outfit flex items-center gap-2" style={{color: 'rgb(var(--color-text-primary))'}}>
                    Professional Verification
                    {user?.verification_status === 'verified' && (
                      <VerificationBadge 
                        role={user.role} 
                        verificationStatus={user.verification_status} 
                        size="sm" 
                      />
                    )}
                  </h4>
                  <p className="text-sm font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
                    {user?.verification_status === 'verified' 
                      ? `You are a verified ${user.role}`
                      : user?.verification_status === 'pending'
                      ? 'Your verification is under review'
                      : `Get verified as a ${user.role}`
                    }
                  </p>
                </div>
              </div>
              {user?.verification_status === 'unverified' && (
                <button
                  type="button"
                  onClick={() => router.push('/verification')}
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-250"
                  style={{
                    background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
                    color: 'rgb(var(--color-background))'
                  }}
                >
                  Get Verified
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block font-medium mb-2 font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
              <User size={16} className="inline mr-2" style={{color: 'rgb(var(--color-primary))'}} />
              First Name *
            </label>
            <input
              {...register('first_name')}
              className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-250 font-inter"
              style={{
                backgroundColor: 'rgb(var(--color-background))',
                border: '1px solid rgb(var(--color-border))',
                color: 'rgb(var(--color-text-primary))'
              }}
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium mb-2 font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
              <User size={16} className="inline mr-2" style={{color: 'rgb(var(--color-primary))'}} />
              Last Name *
            </label>
            <input
              {...register('last_name')}
              className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-250 font-inter"
              style={{
                backgroundColor: 'rgb(var(--color-background))',
                border: '1px solid rgb(var(--color-border))',
                color: 'rgb(var(--color-text-primary))'
              }}
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>{errors.last_name.message}</p>
            )}
          </div>
        </div>

        {/* Nickname */}
        <div>
          <label className="block font-medium mb-2 font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
            <AtSign size={16} className="inline mr-2" style={{color: 'rgb(var(--color-secondary))'}} />
            Nickname
          </label>
          <input
            {...register('nickname')}
            className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-250 font-inter"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              border: '1px solid rgb(var(--color-border))',
              color: 'rgb(var(--color-text-primary))'
            }}
            placeholder="Enter a nickname (optional)"
          />
          {errors.nickname && (
            <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>{errors.nickname.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-2 font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
            <Calendar size={16} className="inline mr-2" style={{color: 'rgb(var(--color-tertiary))'}} />
            Date of Birth *
          </label>
          <input
            type="date"
            {...register('date_of_birth')}
            max={new Date().toISOString().split('T')[0]}
            min={new Date(new Date().getFullYear() - 120, 0, 1).toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-250 font-inter"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              border: '1px solid rgb(var(--color-border))',
              color: 'rgb(var(--color-text-primary))'
            }}
          />
          {errors.date_of_birth && (
            <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>{errors.date_of_birth.message}</p>
          )}
        </div>

        {/* About Me */}
        <div>
          <label className="block font-medium mb-2 font-inter" style={{color: 'rgb(var(--color-text-primary))'}}>
            <FileText size={16} className="inline mr-2" style={{color: 'rgb(var(--color-primary))'}} />
            About Me
          </label>
          <textarea
            {...register('about_me')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-250 resize-vertical font-inter"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              border: '1px solid rgb(var(--color-border))',
              color: 'rgb(var(--color-text-primary))'
            }}
            placeholder="Tell us about yourself..."
          />
          {errors.about_me && (
            <p className="text-sm mt-1 font-inter" style={{color: 'rgb(var(--color-tertiary))'}}>{errors.about_me.message}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 pt-6 border-t" style={{borderColor: 'rgb(var(--color-border))'}}>
          <button
            type="submit"
            disabled={loading || !isDirty}
            className="px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-250 disabled:cursor-not-allowed hover:scale-105 font-medium"
            style={{
              background: loading || !isDirty ? 'rgb(var(--color-border))' : 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
              color: 'rgb(var(--color-background))'
            }}
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg transition-all duration-250 hover:scale-105 font-medium"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              color: 'rgb(var(--color-text-primary))',
              border: '1px solid rgb(var(--color-border))'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
