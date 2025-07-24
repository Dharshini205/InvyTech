import React from "react";
import HRNavbar from "../components/HRNavbar";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <>
     
      <div className="about-container">
        <h2>About InvyTech</h2>
        <p>
          <strong>InvyTech</strong> is an integrated ERP platform designed to simplify and streamline core business processes such as inventory management, billing, human resources, and leave tracking. Our goal is to provide an intuitive, efficient, and scalable solution to support growing organizations.
        </p>

        <p>
          Built with modern web technologies, InvyTech bridges the gap between traditional manual workflows and intelligent digital automation. Whether you're managing employees, processing invoices, or analyzing data, the platform is designed to help teams work smarter and collaborate more effectively.
        </p>

        <h3>Our Mission</h3>
        <ul className="about-list">
          <li>To deliver a modular solution that adapts to the evolving needs of businesses</li>
          <li>To improve efficiency through automation and centralized data access</li>
          <li>To provide a secure and transparent system for leave and HR management</li>
          <li>To enhance decision-making through real-time reporting</li>
          <li>To offer a user experience that requires minimal training and support</li>
        </ul>

        <h3>Technology Stack</h3>
        <p>
          InvyTech is developed using a modern MERN stack — <strong>MongoDB, Express, React, and Node.js</strong>. The platform leverages RESTful APIs, role-based routing, and responsive design principles to ensure a seamless experience across devices.
        </p>

        <h3>Contact & Support</h3>
        <p>
          For support inquiries, feature requests, or partnership opportunities, please contact us at:
          <br />
          <a href="mailto:support@invytech.com">support@invytech.com</a>
        </p>
      </div>
    </>
  );
};

export default AboutPage;
