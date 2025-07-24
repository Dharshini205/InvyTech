import MainNavbar from "../components/MainNavbar";

const InventoryNavbar = () => {
  const links = [
    { path: '/inventory', label: 'Dashboard' },
    { path: '/user', label: 'User Panel' },
    { path: '/reports', label: 'Reports' }
  ];

  return <MainNavbar title="InvyTech" links={links} />;
};

export default InventoryNavbar;
