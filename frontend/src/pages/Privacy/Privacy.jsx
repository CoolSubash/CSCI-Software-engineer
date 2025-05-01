import React from 'react';
import "./Privacy.css"
const Privacy = () => {
  return (
    <section className="privacy-page">
      <div className="privacy-header">
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      </div>

      <div className="privacy-content">
        <h3>Information We Collect</h3>
        <p>We collect personal information when you register on our site, make a purchase, or interact with our services. This includes your name, email address, and payment information.</p>

        <h3>How We Use Your Information</h3>
        <p>We use the information to process orders, communicate with you, and improve our services. We do not share or sell your personal information to third parties.</p>

        <h3>Data Protection</h3>
        <p>We take security seriously and implement reasonable measures to protect your data, including encryption and secure server protocols.</p>

        <h3>Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal information at any time by contacting us.</p>
      </div>
    </section>
  );
}

export default Privacy;
