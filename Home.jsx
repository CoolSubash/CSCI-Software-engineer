import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

const products = [
  {
    id: 1,
    name: 'Cozy Throw Pillow',
    price: 25.99,
    image: 'https://via.placeholder.com/150?text=Pillow',
  },
  {
    id: 2,
    name: 'Modern Floor Lamp',
    price: 89.99,
    image: 'https://via.placeholder.com/150?text=Lamp',
  },
  {
    id: 3,
    name: 'Soft Area Rug',
    price: 129.99,
    image: 'https://via.placeholder.com/150?text=Rug',
  },
  {
    id: 4,
    name: 'Comfy Couch',
    price: 499.99,
    image: 'https://via.placeholder.com/150?text=Couch',
  },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="home-container">
        <header className="banner">
          <h1>Welcome to CozyHome</h1>
          <p>Comfort starts here – everything you need for a cozy home.</p>
        </header>

        <section className="intro-text">
          <p><strong>Subahs Neupane</strong> is my name.</p>
          <p>
            Discover premium-quality home essentials — from plush pillows to modern lighting, stylish rugs, and luxurious couches. 
            Turn your living space into the cozy retreat you’ve always wanted with CozyHome.
          </p>
        </section>

        <section className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={`Image of ${product.name}`} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;