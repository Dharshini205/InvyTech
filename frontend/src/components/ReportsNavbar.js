import MainNavbar from "../components/MainNavbar";

const ReportsNavbar = () => {
  const links = [
    { path: '/reports', label: 'Reports Dashboard' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/bills', label: 'Billing' },
    { path: '/hr', label: 'HR' },
    { path: '/user', label: 'User Panel' }  // Back to user panel
  ];

  return <MainNavbar title="Reports Panel" links={links} />;
};

export default ReportsNavbar;
