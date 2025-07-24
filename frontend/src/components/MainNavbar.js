// src/components/MainNavbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MainNavbar.css";

const MainNavbar = ({ title, links }) => {
  const location = useLocation();

  return (
    <nav className="main-navbar">
      <div className="logo">{title}</div>
      <ul className="nav-links">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavbar;
