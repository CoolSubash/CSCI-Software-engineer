import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling
import logo from '../../assets/logo.png'; // Adjust the path as necessary
const About = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <img 
          src={logo}
         alt="CozyHome Logo" 
          className="hero-logo"
        />
        <h1>Welcome to CozyHome</h1>
        <p>Making Every House a Home.</p>
      </section>

      <section className="company-section">
        <h2>Our Story</h2>
        <p>
          CozyHome started as a dream in the heart of Orangeburg, South Carolina. 
          Five lifelong friends — Kamara, Caleb, Subash, Kameron, and Justin — shared one simple belief: 
          <strong> everyone deserves a place they feel proud to call home. </strong>
        </p>
        <p>
          Sitting around an old wooden table one warm evening, we talked about how difficult 
          it was to find affordable, stylish, and quality home products in smaller towns like ours. 
          That night, CozyHome was born — not just as a business, but as a mission to bring warmth, 
          joy, and beauty into everyday lives.
        </p>
        <p>
          Today, CozyHome is more than a store. It's a community of dreamers, homemakers, 
          and creators who believe that the little things — a cozy chair, a warm lamp, a colorful rug — 
          make a world of difference.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet Our Founders</h2>
        <div className="team-grid">
          {['Kamara', 'Caleb', 'Subash', 'Kameron', 'Justin'].map((member, index) => (
            <div key={index} className="team-member">
              <img src={`/images/team-${index + 1}.jpg`} alt={`${member}`} />
              <h4>{member}</h4>
              <p>Co-Founder</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          At CozyHome, we imagine a world where <strong>comfort and beauty</strong> are accessible to everyone. 
          Where no matter where you live, you can fill your space with warmth, love, and personality.
        </p>
        <p>
          We aim to:
        </p>
        <ul>
          <li>💖 Make homes a reflection of the people who live in them.</li>
          <li>🏡 Support small communities with high-quality, affordable products.</li>
          <li>🌍 Be environmentally responsible by choosing sustainable practices whenever possible.</li>
          <li>🤝 Build meaningful relationships with our customers and treat them like family.</li>
          <li>✨ Inspire people to find happiness in the everyday spaces they call home.</li>
        </ul>
        <p>
          Our journey is just beginning, and we are so excited to have you as part of our CozyHome family.
        </p>
      </section>

      <section className="location-section">
        <h2>Our Location</h2>
        <p>Visit us at: Orangeburg, South Carolina, USA</p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82836.08146235134!2d-80.9065!3d33.4918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fddf0d222d51f1%3A0x218fce6e6328b2c7!2sOrangeburg%2C%20SC%2029120%2C%20USA!5e0!3m2!1sen!2snp!4v1714262128310!5m2!1sen!2snp"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
