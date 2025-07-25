import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportsNavbar from "../components/ReportsNavbar";
import ProductPieChart from "../components/ProductPieChart";
import './InventoryReportDetail.css';

const API_BASE = "http://localhost:5000/api";

const InventoryReportDetail = () => {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchInventoryData();
  }, []);

const fetchInventoryData = async () => {
  const res = await fetch(`${API_BASE}/reports/inventory`);
  const data = await res.json();
  setLowStockProducts(data.lowStockProducts);
  setAllProducts(data.productBreakdown); // 👈 All products with quantity
};


  return (
    <div className="erp-container">
      <ReportsNavbar />
      <header className="welcome-section">
        <h1>📦 Inventory Report - Detailed View</h1>
       
      </header>

      <section className="report-chart-section">
        <ProductPieChart data={allProducts} />
      </section>
    </div>
  );
};

export default InventoryReportDetail;
