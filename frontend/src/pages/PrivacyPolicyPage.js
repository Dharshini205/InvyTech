// src/pages/PrivacyPolicyPage.js
import React from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>

      <p className="update-date">
        Last updated: <strong>{new Date().toLocaleDateString()}</strong>
      </p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At InvyTech ERP, we value your privacy. This Privacy Policy explains how we collect,
          use, and protect your information when you use our platform.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Personal data (e.g., name, email, phone)</li>
          <li>Account credentials (for login and access)</li>
          <li>Usage data (browser, device, IP address)</li>
          <li>Cookies and tracking data</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Notify you about updates</li>
          <li>Improve user experience and analyze usage</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Protection</h2>
        <p>
          Your data is protected using secure technologies, including encryption,
          access controls, and secure storage.
        </p>
      </section>

      <section>
        <h2>5. Sharing Your Information</h2>
        <p>We never sell your data. We only share information with:</p>
        <ul>
          <li>Authorized third-party service providers</li>
          <li>Law enforcement agencies if legally required</li>
        </ul>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>As a user, you have the right to:</p>
        <ul>
          <li>Access or update your data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have questions about this policy, reach us at: <br />
          <strong>Email:</strong> support@invytech.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
