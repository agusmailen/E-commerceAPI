import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage?.getItem('usuario'));
  if (user?.rol !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
