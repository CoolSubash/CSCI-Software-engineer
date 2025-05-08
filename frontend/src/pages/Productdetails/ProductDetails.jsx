import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false); // 🔵

  const BASE_URL = 'http://127.0.0.1:5000/api/v1/products';

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
        
        // 🔵 Check if logged-in user is the seller
        const token = sessionStorage.getItem('accessToken');
        console.log('Token:', token); 
        if (token) {
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', typeof decoded.sub.id);
          if (Number(decoded.sub.id) === Number(data.product.seller_id)) {
            setIsSeller(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`);
      const data = await res.json();
      if (res.ok) setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
      await fetchComments();
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      alert('Please login first to comment.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      });

      if (res.ok) {
        setNewComment('');
        fetchComments();
        alert('Comment posted!');
      } else {
        const data = await res.json();
        alert(data.error || 'Error posting comment.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/product/update/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    const token = sessionStorage.getItem('access_token');
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Product deleted successfully!');
        navigate('/'); // or navigate to seller's dashboard
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found!</div>;

  const { name, price, product_details, product_image } = product;

  return (
    <div className="product-details-container">
      <div className="top-section">
        {Array.isArray(product_image) && product_image.length > 0 && (
          <div className="product-images">
            {product_image.map((img) => (
              <img
                key={img.image_id}
                src={img.image_url}
                alt={img.image_alt_text}
                className="product-image"
              />
            ))}
          </div>
        )}

        <div className="product-info">
          <h2>{name}</h2>
          <p><strong>Price:</strong> ${price}</p>

          {product_details && (
            <div className="product-details-box">
              <p><strong>Description:</strong> {product_details.detailed_description}</p>
              <p><strong>Quantity:</strong> {product_details.quantity}</p>
            </div>
          )}

          {/* 🔵 Seller actions */}
          {isSeller && (
            <div className="seller-actions">
              <button onClick={handleUpdate}>Update Product</button>
              <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white',marginLeft:"10px" }}>
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />
      <h3>Comments:</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment-box">
            <strong>{comment.user?.username || 'Unknown User'}</strong>
            <p>{comment.content}</p>
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))
      )}

      <hr />
      <h3>Add a Comment:</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          placeholder="Write your comment..."
          required
        />
        <br />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default ProductDetails;
