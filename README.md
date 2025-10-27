# Desire - Social Networking App

A modern, beautiful social networking application built with React, TypeScript, Tailwind CSS, shadcn/ui, and Rails API. Experience the future of social media with Desire's iconic design and smooth interactions.

## ✨ Features

### 🔐 Authentication
- **JWT-based authentication** with secure token management
- **Beautiful login/signup forms** with gradient designs
- **Persistent sessions** with localStorage
- **Automatic token refresh** and error handling

### 📱 Core Social Features
- **Create and share posts** with rich text content
- **Like and unlike posts** with real-time updates
- **Comment system** for engaging discussions
- **Follow/unfollow users** to build your network
- **User profiles** with posts and follower counts
- **User suggestions** to discover new people

### 🎨 Modern UI/UX
- **Gradient-based design** with purple and pink themes
- **Glass morphism effects** for modern aesthetics
- **Smooth animations** and hover effects
- **Responsive design** for all devices
- **Dark/light mode ready** with CSS variables
- **Iconic branding** with heart logo and "Desire" name

### 🚀 Performance
- **Fast Vite development** with hot module replacement
- **Optimized bundle** with tree shaking
- **Lazy loading** and code splitting ready
- **TypeScript** for type safety and better DX

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Radix UI** primitives for complex components
- **Lucide React** for consistent iconography
- **Axios** for API communication
- **date-fns** for date formatting
- **clsx & tailwind-merge** for conditional styling

### Backend (Rails API)
- **Rails 8** API-only application
- **PostgreSQL** database
- **Devise** for authentication
- **Devise JWT** for token-based auth
- **Active Storage** for file uploads
- **Rack CORS** for cross-origin requests
- **JSON API** serialization

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Ruby >= 3.0
- Rails >= 8.0
- PostgreSQL

### Backend Setup

1. **Install dependencies:**
```bash
bundle install
```

2. **Setup database:**
```bash
rails db:create
rails db:migrate
```

3. **Start the Rails server:**
```bash
rails server
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
desire/
├── app/                          # Rails backend
│   ├── controllers/
│   │   ├── api/v1/              # API controllers
│   │   └── users/               # Devise controllers
│   ├── models/                  # ActiveRecord models
│   └── serializers/             # JSON serializers
├── frontend/                     # React frontend
│   └── src/
│       ├── components/          # React components
│       │   ├── auth/           # Authentication components
│       │   ├── feed/           # Feed components
│       │   ├── layout/         # Layout components
│       │   ├── posts/          # Post components
│       │   ├── profile/        # Profile components
│       │   ├── suggestions/    # Suggestions components
│       │   └── ui/             # shadcn UI components
│       ├── contexts/           # React contexts
│       ├── lib/                # Utility functions
│       └── services/           # API services
└── config/                      # Rails configuration
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`from-purple-600 to-pink-600`)
- **Background**: Light gradient (`from-purple-50 via-pink-50 to-blue-50`)
- **Cards**: White with backdrop blur
- **Text**: Dark gray with proper contrast

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Avatars**: Circular with gradient fallbacks
- **Forms**: Clean inputs with icons
- **Navigation**: Sticky header with backdrop blur

### Animations
- **Fade in**: Smooth entrance animations
- **Hover effects**: Scale and shadow changes
- **Loading states**: Spinner animations
- **Transitions**: Smooth color and size changes

## 🔌 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout  
- `POST /signup` - User registration

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user details
- `GET /api/v1/users/suggestions` - Get user suggestions
- `GET /api/v1/users/:id/posts` - Get user's posts
- `POST /api/v1/users/:id/follow` - Follow a user
- `DELETE /api/v1/users/:id/unfollow` - Unfollow a user

### Posts
- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get post details
- `POST /api/v1/posts` - Create a post
- `PUT /api/v1/posts/:id` - Update a post
- `DELETE /api/v1/posts/:id` - Delete a post
- `GET /api/v1/posts/newsfeed` - Get newsfeed posts
- `POST /api/v1/posts/:id/like` - Like a post
- `DELETE /api/v1/posts/:id/unlike` - Unlike a post

### Comments
- `POST /api/v1/posts/:post_id/comments` - Create a comment
- `PUT /api/v1/posts/:post_id/comments/:id` - Update a comment
- `DELETE /api/v1/posts/:post_id/comments/:id` - Delete a comment

## 🎯 Key Features Explained

### Authentication Flow
1. User signs up or logs in through beautiful forms
2. Rails generates JWT token
3. Token stored in localStorage with user data
4. All API requests include token in Authorization header
5. Automatic logout on token expiration

### Post System
- **Create posts** with rich text content
- **Real-time like/unlike** with optimistic updates
- **Comment system** for discussions
- **User attribution** with avatars and names
- **Time stamps** with relative formatting

### User Interactions
- **Follow system** to build your network
- **User suggestions** based on activity
- **Profile pages** with user's posts
- **Follower counts** and statistics

### UI/UX Highlights
- **Gradient backgrounds** for visual appeal
- **Glass morphism** effects for modern look
- **Smooth animations** for better UX
- **Responsive design** for all devices
- **Loading states** for better feedback
- **Error handling** with user-friendly messages

## 🚀 Development

### Available Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
rails server         # Start Rails server
rails console        # Open Rails console
rails db:migrate     # Run database migrations
```

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for consistent styling
- **Component-based architecture** for maintainability

## 🌟 What Makes Desire Special

1. **Iconic Design**: Beautiful gradient-based UI with glass morphism effects
2. **Smooth Interactions**: Carefully crafted animations and transitions
3. **Modern Architecture**: Clean separation of concerns with React and Rails
4. **Type Safety**: Full TypeScript implementation for better development experience
5. **Responsive**: Works perfectly on all devices
6. **Accessible**: Built with accessibility in mind using Radix UI primitives
7. **Performance**: Optimized for speed with Vite and modern React patterns

## 📱 Screenshots

The app features:
- **Beautiful login/signup forms** with gradient backgrounds
- **Modern feed interface** with card-based post layout
- **Elegant user profiles** with follow functionality
- **Smooth navigation** with sticky header
- **Responsive design** that works on all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🎉 Conclusion

Desire represents the future of social networking with its beautiful design, smooth interactions, and modern architecture. Built with the latest technologies and best practices, it provides an excellent foundation for building social applications.

**Start building your social network today with Desire!** 🚀