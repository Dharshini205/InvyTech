import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import UserPage from './pages/UserPage';
import InventoryPage from './pages/InventoryPage';
import BillingPage from './pages/BillingPage';
import BillingHistoryPage from './pages/BillingHistoryPage';
import HRPage from './pages/HRPage';
import AttendancePage from './pages/AttendancePage';
import LeavePage from './pages/LeavePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ReportsPage from './pages/ReportPage';
import InventoryReportDetail from './pages/InventoryReportDetail';
import BillingReportPage from './pages/BillingReportPage';
import HRReportPage from './pages/HRReportPage';
import HRApprovalPage from './pages/HRApprovalPage';

function App() {
  const location = useLocation();

  // List of routes that should NOT have a Navbar or Footer
  const hideUiRoutes = [
    '/user',
    '/inventory',
    '/bills',
    '/billing-history',
    '/hr',
    '/attendance',
    '/leave',
    '/reports',
    '/reports/inventory',
    '/reports/billing',
    '/reports/hr',
    '/hr-approvals',
  ];

  const shouldHideUI = hideUiRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideUI && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/bills" element={<BillingPage />} />
        <Route path="/billing-history" element={<BillingHistoryPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/inventory" element={<InventoryReportDetail />} />
        <Route path="/reports/billing" element={<BillingReportPage />} />
        <Route path="/reports/hr" element={<HRReportPage />} />
        <Route path="/hr-approvals" element={<HRApprovalPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
<Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>

      {!shouldHideUI && <Footer />}
    </>
  );
}

export default App;
