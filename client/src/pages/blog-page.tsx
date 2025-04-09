import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogPage() {
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with TypeScript',
      excerpt: 'Learn the fundamentals of TypeScript and how it can improve your JavaScript development.',
      content: 'TypeScript is a powerful superset of JavaScript that adds static typing and other features. It helps catch errors early in development and improves code maintainability.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
      tags: ['TypeScript', 'JavaScript', 'Web Development']
    },
    {
      id: 2,
      title: 'Mastering React Performance',
      excerpt: 'Discover advanced techniques to optimize your React applications.',
      content: 'Performance optimization is crucial for React applications. Learn about useMemo, useCallback, React.memo, and other performance optimization techniques.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      tags: ['React', 'Performance', 'Frontend']
    },
    {
      id: 3,
      title: 'Modern Backend Development',
      excerpt: 'Explore the latest trends and best practices in backend development.',
      content: 'Backend development has evolved significantly. Discover modern approaches to API design, database management, and server architecture.',
      image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2070&auto=format&fit=crop',
      tags: ['Backend', 'Node.js', 'API']
    }
  ];

  const togglePost = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Blog - DevQuest</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
        DevQuest Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {expandedPosts.includes(post.id) && (
                <p className="text-gray-700 mt-4">{post.content}</p>
              )}

              <Button
                variant="outline"
                onClick={() => togglePost(post.id)}
                className="mt-4"
              >
                {expandedPosts.includes(post.id) ? 'Show Less' : 'Read More'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}