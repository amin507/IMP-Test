'use client';

import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostList from './components/PostList';
import CreatePostModal from './components/CreatePostModal';
import EditPostModal from './components/EditPostModal';

interface Post {
  id: number;
  title: string;
  content: string;
  user: {
    name: string;
  };
}

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePostUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
        <div className="mt-4">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

  // ... rest of the code (logged in view) remains the same ...
  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">IMP Blog</a>
        </div>
        <div className="flex-none gap-2">
          <span>Hello, {user.name}</span>
          <button className="btn btn-outline btn-sm" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Post
          </button>
        </div>
        
        <PostList 
          key={refreshTrigger} 
          onRefresh={() => setRefreshTrigger(prev => prev + 1)}
          onEditPost={handleEditPost}
        />
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onPostUpdated={handlePostUpdated}
        post={selectedPost}
      />
    </div>
  );
}