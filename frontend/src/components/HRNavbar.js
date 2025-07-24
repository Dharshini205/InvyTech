import MainNavbar from "../components/MainNavbar";

const HRNavbar = () => {
  const links = [
    { path: '/hr', label: 'Employees' },
    { path: '/attendance', label: 'Attendance' },
    { path: '/leave', label: 'Leave Requests' },
    { path: '/hr-approvals', label: 'Approvals' },
    { path: '/user', label: 'User Panel' }  // Now you can navigate back to user
  ];

  return <MainNavbar title="HR Panel" links={links} />;
};

export default HRNavbar;
