// src/config/navLinks.js

const navLinksByRoleOrPage = {
  admin: [
    { path: "/hr", label: "Employees" },
    { path: "/attendance", label: "Attendance" },
    { path: "/leave", label: "Leave Requests" },
    { path: "/hr-approvals", label: "Approvals" },
    { path: "/user", label: "User Panel" },
  ],
  inventory: [
    { path: "/inventory", label: "Dashboard" },
    { path: "/user", label: "User Panel" },
    { path: "/reports", label: "Reports" },
  ],
  reports: [
    { path: "/reports", label: "Reports Dashboard" },
    { path: "/inventory", label: "Inventory" },
    { path: "/bills", label: "Billing" },
    { path: "/hr", label: "HR" },
    { path: "/user", label: "User Panel" },
  ],
  default: [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ],
};

export default navLinksByRoleOrPage;
