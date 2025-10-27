import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/v1/posts', {
        post: { content }
      });
      setContent('');
      onPostCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 card-hover">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} alt={user?.name || ''} />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="resize-none border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4">
              <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-600">
                <Image className="h-5 w-5" />
                <span>Photo</span>
              </Button>
              <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-yellow-600">
                <Smile className="h-5 w-5" />
                <span>Feeling</span>
              </Button>
              <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-600">
                <MapPin className="h-5 w-5" />
                <span>Location</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setContent('')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !content.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
