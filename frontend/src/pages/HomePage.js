import React from 'react';
import './HomePage.css';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const HomePage = () => {
 const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};



  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome to InvyTech</h1>
          <p>The next-gen ERP system tailored for modern businesses.</p>
          <Link to="/signup" className="cta-button">Get Started</Link>

        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
  <h2>What You Can Do</h2>
  <motion.div
    className="feature-grid"
    variants={listVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {[
      { title: "Inventory", desc: "Real-time stock tracking and warehouse management." },
      { title: "Billing", desc: "Generate professional invoices and track payments." },
      { title: "HR & Payroll", desc: "Manage employee data, leave, and payroll in one place." },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        className="feature-card"
        variants={itemVariants}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </motion.div>
    ))}
  </motion.div>
</section>
    <section className="about">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    Why Choose InvyTech?
  </motion.h2>

  <motion.ul
    className="about-list"
    variants={listVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {[
      "InvyTech is modular — choose the tools your business needs and scale easily.",
      "Automate tasks like billing, payroll, and reporting to save time and reduce errors.",
      "Centralized dashboard improves collaboration between departments in real-time.",
      "Role-based access and audit logging ensure data integrity and compliance.",
      "Clean UI design means your team can get started with minimal training."
    ].map((item, index) => (
      <motion.li
        key={index}
        className="about-item"
        variants={itemVariants}
        whileHover={{
          y: -3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <FaCheckCircle className="icon" />
        {item}
      </motion.li>
    ))}
  </motion.ul>
</section>


   


    
    </div>
  );
};

export default HomePage;
