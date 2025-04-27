import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "./Home.css";

const Home = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel images - replace with your actual product images
  const carouselImages = [
    {
      id: 1,
      image:
        "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/WS21L-4x5-women-startpage-wk17.jpg?imwidth=1870",
      title: "New Spring Collection",
      description: "Discover amazing deals up to 50% off",
    },
    {
      id: 2,
      image:
        "https://c.media-amazon.com/images/I/81hLTHZw26L._AC_UL640_FMwebp_QL65_.jpg",
      title: "Tech Gadgets Sale",
      description: "Latest electronics and smart devices",
    },
    {
      id: 3,
      image: "https://c.media-amazon.com/images/I/71I+uNdsN+L._AC_SY879_.jpg",
      title: "Fashion Trends",
      description: "Exclusive styles for the season",
    },
  ];

  // Auto slide effect can be implemented using setInterval, but it's commented out for now
  // useEffect(() => {
  //   // Carousel auto-slide effect

  //   const timer=setInterval(()=>{
  //     setCurrentSlide((prevSlide)=>{
  //       return prevSlide === carouselImages.length - 1 ? 0 : prevSlide + 1;
  //     })
  //   },5000)

  //   return () => clearInterval(timer);
  // }, [carouselImages.length]);

  // useEffect(() => {
  //   // Fetch recent products
  //   const fetchRecentProducts = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000/api/v1/products/recent');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch recent products');
  //       }
  //       const data = await response.json();
  //       setRecentProducts(data.products || []);
  //     } catch (err) {
  //       console.error('Error fetching recent products:', err);
  //       setError('Failed to load recent products');
  //       // Fallback to sample data for demo purposes
  //       setRecentProducts(sampleProducts.slice(0, 4));
  //     }
  //   };

  //   // Fetch top-rated products
  //   const fetchTopRatedProducts = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000/api/v1/products/top-rated');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch top-rated products');
  //       }
  //       const data = await response.json();
  //       setTopRatedProducts(data.products || []);
  //     } catch (err) {
  //       console.error('Error fetching top rated products:', err);
  //       // Fallback to sample data for demo purposes
  //       setTopRatedProducts(sampleProducts.slice(4, 8));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchRecentProducts();
  //   fetchTopRatedProducts();
  // }, []);

  // Function to handle manual slide navigation
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carouselImages.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carouselImages.length - 1 : prevSlide - 1
    );
  };

  // Sample products for fallback/demo
  // const sampleProducts = [
  //   {
  //     id: 1,
  //     name: 'Wireless Headphones',
  //     price: 99.99,
  //     image: '/images/products/headphones.jpg',
  //     rating: 4.5,
  //     description: 'High quality wireless headphones with noise cancellation'
  //   },
  //   {
  //     id: 2,
  //     name: 'Smartphone X11',
  //     price: 799.99,
  //     image: '/images/products/smartphone.jpg',
  //     rating: 4.7,
  //     description: 'Latest flagship smartphone with amazing camera'
  //   },
  //   {
  //     id: 3,
  //     name: 'Laptop Pro',
  //     price: 1299.99,
  //     image: '/images/products/laptop.jpg',
  //     rating: 4.8,
  //     description: 'Ultra-thin professional laptop with high performance'
  //   },
  //   {
  //     id: 4,
  //     name: 'Smart Watch',
  //     price: 199.99,
  //     image: '/images/products/smartwatch.jpg',
  //     rating: 4.3,
  //     description: 'Fitness tracker with heart rate monitor'
  //   },
  //   {
  //     id: 5,
  //     name: 'Bluetooth Speaker',
  //     price: 79.99,
  //     image: '/images/products/speaker.jpg',
  //     rating: 4.9,
  //     description: 'Portable speaker with deep bass and waterproof design'
  //   },
  //   {
  //     id: 6,
  //     name: 'Digital Camera',
  //     price: 549.99,
  //     image: '/images/products/camera.jpg',
  //     rating: 4.6,
  //     description: 'Professional DSLR camera with 4K video recording'
  //   },
  //   {
  //     id: 7,
  //     name: 'Gaming Console',
  //     price: 399.99,
  //     image: '/images/products/console.jpg',
  //     rating: 4.8,
  //     description: 'Next-gen gaming console with amazing graphics'
  //   },
  //   {
  //     id: 8,
  //     name: 'Wireless Earbuds',
  //     price: 129.99,
  //     image: '/images/products/earbuds.jpg',
  //     rating: 4.7,
  //     description: 'True wireless earbuds with premium sound quality'
  //   }
  // ];

  // Dummy data for testing
  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        name: "Product 1",
        description: "This is a great product.",
        price: 29.99,
        image:
          "https://image.hm.com/assets/hm/2d/4b/2d4b779f6998dd3a8637e87f177bf7abd1df52da.jpg?imwidth=768",
      },
      {
        id: 2,
        name: "Product 2",
        description: "Another amazing product.",
        price: 39.99,
        image:
          "https://image.hm.com/assets/hm/10/1a/101ac1155e90893f8791f11834cc3144096b6f16.jpg?imwidth=2160",
      },
      {
        id: 3,
        name: "Product 3",
        description: "The best product in the market.",
        price: 49.99,
        image:
          "https://image.hm.com/assets/hm/98/77/9877bdf3133aa386083b2427d63b2eef393dc447.jpg?imwidth=2160",
      },
      {
        id: 4,
        name: "Product 4",
        description: "A must-have for everyone.",
        price: 59.99,
        image:
          "https://image.hm.com/assets/hm/89/85/89857df55ca719607cbe97789480000452725007.jpg?imwidth=2160",
      },
      {
        id: 5,
        name: "Product 5",
        description: "This product will change your life.",
        price: 69.99,
        image:
          "https://image.hm.com/assets/hm/bf/61/bf617a8c06fb76c163e9ef118e467891f3420066.jpg?imwidth=1536",
      },
      {
        id: 6,
        name: "Product 6",
        description: "This is a great product.",
        price: 29.99,
        image:
          "https://image.hm.com/assets/hm/2d/4b/2d4b779f6998dd3a8637e87f177bf7abd1df52da.jpg?imwidth=768",
      },
      {
        id: 7,
        name: "Product 7",
        description: "Another amazing product.",
        price: 39.99,
        image:
          "https://image.hm.com/assets/hm/10/1a/101ac1155e90893f8791f11834cc3144096b6f16.jpg?imwidth=2160",
      },
      {
        id: 8,
        name: "Product 8",
        description: "The best product in the market.",
        price: 49.99,
        image:
          "https://image.hm.com/assets/hm/98/77/9877bdf3133aa386083b2427d63b2eef393dc447.jpg?imwidth=2160",
      },
      {
        id: 9,
        name: "Product 9",
        description: "A must-have for everyone.",
        price: 59.99,
        image:
          "https://image.hm.com/assets/hm/89/85/89857df55ca719607cbe97789480000452725007.jpg?imwidth=2160",
      },
      {
        id: 10,
        name: "Product 10",
        description: "This product will change your life.",
        price: 69.99,
        image:
          "https://image.hm.com/assets/hm/bf/61/bf617a8c06fb76c163e9ef118e467891f3420066.jpg?imwidth=1536",
      },
    ];

    setRecentProducts(dummyProducts);
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Hero Carousel Section */}
      <div className="carousel-container">
        <div className="carousel">
          {carouselImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${
                index === currentSlide ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button className="shop-now-btn">Shop Now</button>
              </div>
            </div>
          ))}

          <button className="carousel-btn prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index == currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Recently Added Products</h2>
          <p>Check out our latest arrivals</p>
        </div>

        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="products-slider">
            <Swiper
              spaceBetween={30}
              slidesPerView={4}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
             
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {recentProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="view-more-container">
          <a href="/product" className="view-more-btn">
            View All Products
          </a>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="banner-content">
          <h2>Special Offers</h2>
          <p>Get up to 30% off on selected items</p>
          <a href="/product" className="banner-btn">View Offers</a>
        </div>
      </section>

      {/* Top Rated Products Section */}
      {/* <section className="products-section top-rated-section">
        <div className="section-header">
          <h2>Top Rated Products</h2>
          <p>Our customers' favorites</p>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {topRatedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </section> */}

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates on new products and special promotions</p>
          
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
