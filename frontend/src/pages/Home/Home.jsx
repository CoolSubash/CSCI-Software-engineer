import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "./Home.css";

const Home = () => {
  const [bestselling, setBestselling] = useState([]);
  const [recent, setRecent] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

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

  useEffect(() => {
   

    // Fetch bestselling products (price greater than 150)
    const fetchBestsellingProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/products/bestselling");
        const data = await response.json();
        console.log(data);
        setBestselling(data.products);

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching bestselling products:", error);
      }
    };

    // Fetch recent products (latest 10 products)
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/products/recent");
        const data = await response.json();
        setRecent(data.products);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    };

    // Call all fetch functions
    
    fetchBestsellingProducts();
    fetchRecentProducts();
  }, []);

  
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
              {recent && recent.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onViewDetails={handleViewDetails} />
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

      {/* Top Rated Products Section  */}
     
      <section className="products-section best-selling-section">
  <div className="section-header">
    <h2>Best Selling Products</h2>
    <p>Our most popular picks</p>
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
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {bestselling && bestselling.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} onViewDetails={handleViewDetails} />
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


      {/* /* Newsletter Subscription */ }
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
