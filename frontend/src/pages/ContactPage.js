// ContactPage.js
import React from "react";
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="subtext">
        We'd love to hear from you! Fill out the form below or reach out via email.
      </p>
      <form className="contact-form">
        <label>
          Name
          <input type="text" placeholder="Your Name" required />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Message
          <textarea placeholder="Your message..." rows="5" required></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
