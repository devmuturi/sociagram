import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { UserPlus, Users } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SuggestionsProps {
  onUserClick: (userId: number) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ onUserClick }) => {
  const { user: currentUser } = useAuth();
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await api.get('/api/v1/users/suggestions');
      setSuggestions(response.data);
    } catch (error) {
      console.error('Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.post(`/api/v1/users/${userId}/follow`);
      // Remove from suggestions after following
      setSuggestions(suggestions.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Failed to follow user');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suggestions for you</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="sticky top-20 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Suggestions for you
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No suggestions available</p>
              </div>
            ) : (
              suggestions.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between hover:bg-accent p-3 rounded-lg cursor-pointer transition-colors"
                  onClick={() => onUserClick(user.id)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => handleFollow(user.id, e)}
                    className="ml-2 h-8 px-3"
                  >
                    <UserPlus className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['#webdev', '#react', '#rails', '#coding', '#tech', '#design', '#ai', '#startup'].map((topic) => (
              <div
                key={topic}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors"
              >
                <span className="text-sm font-medium">{topic}</span>
                <span className="text-xs text-muted-foreground">trending</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
