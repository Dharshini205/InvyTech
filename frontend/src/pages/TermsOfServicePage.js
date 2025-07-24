// src/pages/TermsOfServicePage.js
import React from 'react';
import './TermsOfServicePage.css';

const TermsOfServicePage = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>

      <p className="update-date">
        Last updated: <strong>{new Date().toLocaleDateString()}</strong>
      </p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using InvyTech ERP, you agree to be bound by these Terms of Service. If you disagree
          with any part of the terms, please do not access or use the service.
        </p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <ul>
          <li>Provide accurate registration information.</li>
          <li>Keep your account credentials secure.</li>
          <li>Do not use the platform for any unlawful activities.</li>
        </ul>
      </section>

      <section>
        <h2>3. Intellectual Property</h2>
        <p>
          All content, trademarks, and data on this platform are the property of InvyTech ERP unless
          otherwise noted. You may not copy, distribute, or reuse content without permission.
        </p>
      </section>

      <section>
        <h2>4. Account Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the service at any time for
          behavior that violates these terms or is deemed harmful to the system or other users.
        </p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          InvyTech ERP shall not be held liable for any direct, indirect, incidental, or
          consequential damages arising from the use or inability to use our platform.
        </p>
      </section>

      <section>
        <h2>6. Modifications to Terms</h2>
        <p>
          We reserve the right to update or revise these terms at any time. Continued use after
          changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at: <br />
          <strong>Email:</strong> support@invytech.com
        </p>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
