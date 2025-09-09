'use client';

import { useState, useEffect } from 'react';
import { activity as activityAPI } from '../../lib/api';
import ActivityItem from './ActivityItem';
import ActivityFilters from './ActivityFilters';

export default function ActivityList({ 
  userID = null, 
  isOwnActivity = false,
  initialFilters = {} 
}) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    types: [],
    showHidden: false,
    ...initialFilters
  });

  const fetchActivities = async (pageNum = 1, currentFilters = filters, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pageNum,
        limit: 20,
        ...currentFilters
      };

      const data = await activityAPI.getUserActivities(userID, params);
      
      if (append) {
        setActivities(prev => [...prev, ...data.activities]);
      } else {
        setActivities(data.activities);
      }
      
      setHasMore(data.activities.length === params.limit);
    } catch (err) {
      setError(err.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(1, filters, false);
  }, [userID, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActivities(nextPage, filters, true);
  };

  const handleHideActivity = async (activityID) => {
    try {
      await activityAPI.hideActivity(activityID);
      // Update local state
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityID 
            ? { ...activity, is_hidden: true }
            : activity
        )
      );
    } catch (err) {
      console.error('Failed to hide activity:', err);
    }
  };

  const handleUnhideActivity = async (activityID) => {
    try {
      await activityAPI.unhideActivity(activityID);
      // Update local state
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityID 
            ? { ...activity, is_hidden: false }
            : activity
        )
      );
    } catch (err) {
      console.error('Failed to unhide activity:', err);
    }
  };

  if (loading && activities.length === 0) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-lg p-4 shadow-lg" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
            <div className="animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
                <div className="w-8 h-8 rounded-full" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
                  <div className="h-3 rounded w-1/2" style={{backgroundColor: 'rgb(var(--color-background))'}}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg p-6 text-center shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-tertiary))'}}>
        <div className="mb-2 font-semibold font-outfit" style={{color: 'rgb(var(--color-tertiary))'}}>Failed to load activities</div>
        <p className="text-sm mb-4 font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>{error}</p>
        <button 
          onClick={() => fetchActivities(1, filters, false)}
          className="px-6 py-3 rounded-lg transition-all duration-250 hover:scale-105 font-medium"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
            color: 'rgb(var(--color-background))'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {isOwnActivity && (
        <ActivityFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isOwnActivity={isOwnActivity}
                onHide={handleHideActivity}
                onUnhide={handleUnhideActivity}
              />
            ))}

            {/* Load More Button */}
            {hasMore && !loading && (
              <div className="text-center pt-4">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 rounded-lg transition-all duration-250 hover:scale-105 font-medium"
                  style={{
                    background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%)',
                    color: 'rgb(var(--color-background))'
                  }}
                >
                  Load More
                </button>
              </div>
            )}

            {/* Loading more indicator */}
            {loading && activities.length > 0 && (
              <div className="text-center py-4">
                <div className="font-inter" style={{color: 'rgb(var(--color-text-secondary))'}}>Loading more activities...</div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg p-8 text-center shadow-xl" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-border))'}}>
            <div className="mb-2 font-semibold font-outfit" style={{color: 'rgb(var(--color-text-secondary))'}}>No activities found</div>
            <p className="text-sm font-inter" style={{color: 'rgb(var(--color-text-disabled))'}}>
              {userID 
                ? "This user hasn't performed any visible activities yet."
                : "You haven't performed any activities yet. Start by creating posts or interacting with others!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
