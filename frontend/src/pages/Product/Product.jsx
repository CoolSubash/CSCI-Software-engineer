// ProductPage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import "./Product.css"
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 1000 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (search = '') => {
    let url = 'http://127.0.0.1:5000/api/v1/products';
    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
    setFilteredProducts(data.products);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <div className="left-sidebar">
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
         
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            
           
          />
          <button type="submit" onSubmit={handleSearchChange}>Search</button>
        </form>

        <div className="filter-bar">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
          />
          <button onClick={applyFilters}>Apply Price Filter</button>
        </div>
      </div>
      </div>


      <div className="right-sidebar">
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} onViewDetails={handleViewDetails} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

