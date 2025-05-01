import React, { useState } from 'react';
import "./Contact.css"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact-page">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>If you have any questions, concerns, or feedback, please don't hesitate to reach out to us.</p>
      </div>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Your message here..."
          ></textarea>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      <div className="contact-info">
        <h3>Our Location</h3>
        <p>123 CozyHome St, Orangeburg, SC 29115</p>

        <h3>Phone</h3>
        <p>(123) 456-7890</p>

        <h3>Email</h3>
        <p>support@cozyhome.com</p>
      </div>

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
  );
}

export default Contact;
