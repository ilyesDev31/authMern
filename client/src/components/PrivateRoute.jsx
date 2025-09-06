import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.profile);
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
