import React from 'react';
import './Term.css'; // Assuming you have a CSS file for styling

const Terms = () => {
  return (
    <section className="terms-page">
      <div className="terms-header">
        <h2>Terms of Service</h2>
        <p>By using our website, you agree to the following terms and conditions.</p>
      </div>

      <div className="terms-content">
        <h3>Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to be bound by these terms of service. If you disagree with any part of these terms, you must not use our services.</p>

        <h3>User Responsibilities</h3>
        <p>Users are responsible for maintaining the confidentiality of their accounts and passwords. You agree to notify us immediately if any unauthorized use occurs.</p>

        <h3>Limitations of Liability</h3>
        <p>We are not liable for any damages or losses incurred due to the use or inability to use our services. This includes indirect or consequential damages.</p>

        <h3>Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. Any changes will be posted on this page, and your continued use of our services will signify acceptance of those changes.</p>
      </div>
    </section>
  );
}

export default Terms;
