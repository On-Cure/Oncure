'use client';

import { useState } from 'react';
import { 
  Activity as ActivityIcon, 
  FileText, 
  Settings,
  User as UserIcon
} from 'lucide-react';
import ActivityList from './ActivityList';
import ActivitySettings from './ActivitySettings';

export default function ActivityPage({ userID = null, isOwnProfile = false }) {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    {
      id: 'timeline',
      label: 'Activity Timeline',
      icon: <ActivityIcon size={16} />,
      description: 'All your activities in chronological order'
    },
    {
      id: 'posts',
      label: 'Posts Only',
      icon: <FileText size={16} />,
      description: 'Only posts you\'ve created'
    }
  ];

  // Add settings tab for own profile
  if (isOwnProfile) {
    tabs.push({
      id: 'settings',
      label: 'Privacy Settings',
      icon: <Settings size={16} />,
      description: 'Control what activities are visible to others'
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg p-6 shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)'}}>
            <ActivityIcon size={24} style={{color: 'rgb(var(--color-background))'}} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-outfit" style={{color: 'rgb(var(--color-text-primary))'}}>
              {isOwnProfile ? 'Your Activity' : 'User Activity'}
            </h1>
            <p className="font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
              {isOwnProfile 
                ? 'Track and manage your activity across the platform'
                : 'View this user\'s public activities'
              }
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-250 font-medium hover:scale-105"
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)' : 'rgb(var(--color-background))',
                color: activeTab === tab.id ? 'rgb(var(--color-background))' : 'rgb(var(--color-text-secondary))',
                border: activeTab === tab.id ? 'none' : '1px solid rgb(var(--color-border))'
              }}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Description */}
        <div className="mt-3 p-3 rounded-lg" style={{backgroundColor: 'rgb(var(--color-background))', border: '1px solid rgb(var(--color-border))'}}>
          <p className="text-sm font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'timeline' && (
          <ActivityList
            userID={userID}
            isOwnActivity={isOwnProfile}
            initialFilters={{}}
          />
        )}

        {activeTab === 'posts' && (
          <ActivityList
            userID={userID}
            isOwnActivity={isOwnProfile}
            initialFilters={{
              types: ['post_created']
            }}
          />
        )}

        {activeTab === 'settings' && isOwnProfile && (
          <ActivitySettings />
        )}
      </div>
    </div>
  );
}
