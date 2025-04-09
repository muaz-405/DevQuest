
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

export default function NotificationsPage() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await fetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return response.json();
    }
  });

  return (
    <>
      <Helmet>
        <title>Notifications | DevQuest</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications?.map((notification: any) => (
            <div key={notification.id} className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-800">{notification.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
