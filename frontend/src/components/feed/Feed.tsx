import React, { useEffect, useState } from 'react';
import { CreatePost } from '@/components/posts/CreatePost';
import { PostCard } from '@/components/posts/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
  id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  likes_count?: number;
  comments_count?: number;
}

export const Feed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/v1/posts');
      setPosts(response.data);
    } catch (err: any) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handleLike = async (postId: number) => {
    try {
      await api.post(`/api/v1/posts/${postId}/like`);
    } catch (err) {
      console.error('Failed to like post');
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await api.delete(`/api/v1/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      console.error('Failed to delete post');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-muted-foreground">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <CreatePost onPostCreated={handlePostCreated} />
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share something with the community!</p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Create First Post
            </Button>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onDelete={handleDelete}
              currentUserId={user?.id}
            />
          ))
        )}
      </div>
      
      {posts.length > 0 && (
        <div className="text-center py-8">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Feed'}
          </Button>
        </div>
      )}
    </div>
  );
};
