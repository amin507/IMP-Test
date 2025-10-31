'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  user: {
    name: string;
  };
}

interface PaginationData {
  data: Post[];
  current_page: number;
  last_page: number;
  total: number;
}

interface PostListProps {
  onRefresh?: () => void;
  onEditPost?: (post: Post) => void;
}

export default function PostList({ onRefresh, onEditPost }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<PaginationData>(
        `http://localhost:8000/api/posts?page=${currentPage}`
      );
      setPosts(response.data.data);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      fetchPosts();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  const handleEdit = (post: Post) => {
    if (onEditPost) {
      onEditPost(post);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
        <button 
          className="btn btn-sm btn-ghost" 
          onClick={fetchPosts}
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="alert alert-info">
          <span>No posts found. Create your first post!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-lg border">
            <div className="card-body">
              <h3 className="card-title text-lg">{post.title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  By {post.user.name}
                </span>
                <div className="space-x-2">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {lastPage > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              «
            </button>
            
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item btn ${
                  currentPage === page ? 'btn-active' : ''
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button
              className="join-item btn"
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}