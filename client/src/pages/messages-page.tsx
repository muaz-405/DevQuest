
import { Helmet } from 'react-helmet';

export default function MessagesPage() {
  return (
    <>
      <Helmet>
        <title>Messages | DevQuest</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Private Messages</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Your private messages will appear here.</p>
        </div>
      </div>
    </>
  );
}
