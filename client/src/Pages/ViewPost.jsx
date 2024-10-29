import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      navigate('/'); // Redirect to home after delete
    } catch (error) {
      console.error('Failed to delete the post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={handleDelete}>Delete Post</button>
      <button onClick={() => navigate(`/edit-post/${postId}`)}>Edit Post</button> {/* Redirect to edit page */}
    </div>
  );
}

export default ViewPost;
