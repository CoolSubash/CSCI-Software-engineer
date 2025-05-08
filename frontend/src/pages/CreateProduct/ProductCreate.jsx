import React, { useState } from 'react';
import './ProductCreate.css';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    product_details: '',
    product_images: [
      { url: '', alt_text: '' },
      { url: '', alt_text: '' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...formData.product_images];
    updatedImages[index][field] = value;
    setFormData((prev) => ({ ...prev, product_images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const accessToken = sessionStorage.getItem('accessToken');
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // attach JWT token
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }
  
      const result = await response.json();
      console.log('Product created successfully:', result);
      alert('Product created successfully!');
  
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        product_details: '',
        product_images: [
          { url: '', alt_text: '' },
          { url: '', alt_text: '' },
        ],
      });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product: ' + error.message);
    }
  };
  

  return (
    <div className="product-create-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Price:
          <input type="number" name="price" min={1} value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Quantity:
          <input type="number" name="quantity" min={1} value={formData.quantity} onChange={handleChange} required />
        </label>

        <label>
          Product Details:
          <textarea name="product_details" value={formData.product_details} onChange={handleChange} required />
        </label>

        <h4>Product Images:</h4>
        {formData.product_images.map((image, index) => (
          <div key={index} className="image-fields">
            <input
              type="text"
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Alt Text"
              value={image.alt_text}
              onChange={(e) => handleImageChange(index, 'alt_text', e.target.value)}
              required
            />
          </div>
        ))}

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
