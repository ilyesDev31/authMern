import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useGetMeQuery } from "../slices/userApiSlice";
const PrivateRoute = () => {
  const { data, isLoading, isFetching, error } = useGetMeQuery();
  if (isLoading || isFetching) return <h1>Loading...</h1>;
  if (error || !data.user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
