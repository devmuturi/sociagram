import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20"></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Desire</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center p-6 text-muted-foreground">
        <p className="text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
