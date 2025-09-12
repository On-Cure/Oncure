// export default function NotificationComponent() {
//   return (
//     <div className="border p-4 rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold mb-2">Notification Component</h2>
//       <p>This is a placeholder for the notification component.</p>
//     </div>
//   );
// }

// src/components/notifications/NotificationComponent.js

import { groups } from '../../lib/api';

const renderGroupNotification = (notification) => {
  const handleGroupAction = async (action) => {
    if (notification.type === 'group_join_request') {
      await groups.updateMember(notification.related_id, notification.user_id, { action });

      // Mark notification as read and refresh
      markAsRead(notification.id);
    } else if (notification.type === 'group_invitation') {
      await groups.updateMember(notification.related_id, user.id, { action });

      markAsRead(notification.id);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <p>{notification.message}</p>
      {(notification.type === 'group_join_request' || notification.type === 'group_invitation') && (
        <div className="flex gap-2">
          <button 
          className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-sm transition-colors"
            onClick={() => handleGroupAction('accept')}
          >
          Accept
          </button>
          <button 
            className="px-3 py-1 bg-background hover:bg-border text-text-primary border border-border rounded text-sm transition-colors"
            onClick={() => handleGroupAction('decline')}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};