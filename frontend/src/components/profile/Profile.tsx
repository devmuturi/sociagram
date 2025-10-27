import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCard } from '@/components/posts/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { UserPlus, UserMinus, Users, Calendar } from 'lucide-react';

interface ProfileProps {
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  created_at: string;
}

interface Post {
  id: number;
  content: string;
  created_at: string;
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get(`/api/v1/users/${userId}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (following) {
        await api.delete(`/api/v1/users/${userId}/unfollow`);
        setFollowersCount(followersCount - 1);
      } else {
        await api.post(`/api/v1/users/${userId}/follow`);
        setFollowersCount(followersCount + 1);
      }
      setFollowing(!following);
    } catch (error) {
      console.error('Failed to toggle follow');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                {user.bio && <p className="text-gray-700">{user.bio}</p>}
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{followersCount} followers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {currentUser?.id !== userId && (
              <Button 
                onClick={handleFollow} 
                variant={following ? 'outline' : 'default'}
                className={following ? '' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}
              >
                {following ? (
                  <>
                    <UserMinus className="mr-2 h-4 w-4" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Posts</h2>
        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">This user hasn't shared anything yet.</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={currentUser?.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
