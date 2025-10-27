import './index.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Header } from './components/layout/Header'
import { Feed } from './components/feed/Feed'
import { AuthPage } from './components/auth/AuthPage'
import { Profile } from './components/profile/Profile'
import { Suggestions } from './components/suggestions/Suggestions'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const AppContent = () => {
  const { user, loading, token } = useAuth()
  const [currentPage, setCurrentPage] = useState('feed')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Desire</h2>
          <p className="text-muted-foreground">Loading your experience...</p>
        </div>
      </div>
    )
  }

  if (!user || !token) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-8">
          {/* Left Sidebar - Suggestions */}
          <aside className="hidden lg:block">
            <Suggestions onUserClick={setSelectedUserId} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">
            {currentPage === 'feed' && <Feed />}
            {currentPage === 'profile' && selectedUserId && (
              <Profile userId={selectedUserId} />
            )}
          </main>

          {/* Right Sidebar - Placeholder for future features */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-lg">Welcome to Desire!</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✨ Share your thoughts and connect with others</p>
                  <p>❤️ Like and comment on posts</p>
                  <p>👥 Follow interesting people</p>
                  <p>📱 Discover trending topics</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App