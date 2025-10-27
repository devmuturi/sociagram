import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, Trash2, MoreHorizontal } from 'lucide-react';
import { formatDistance } from 'date-fns';

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
  liked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: number) => void;
  onDelete?: (postId: number) => void;
  currentUserId?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onDelete, currentUserId }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    if (onLike) onLike(post.id);
  };

  const isOwner = currentUserId === post.user.id;

  return (
    <Card className="card-hover animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt={post.user.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              {post.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{post.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })}
                </p>
              </div>
              
              {isOwner && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete?.(post.id)}
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-4">
              {post.content}
            </p>
            
            {/* Post Actions */}
            <div className="flex items-center space-x-6 pt-4 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${liked ? 'text-red-600' : 'text-muted-foreground hover:text-red-600'}`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-600">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments_count || 0}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-600">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
