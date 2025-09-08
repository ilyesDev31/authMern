import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./Pages/ProfilePage";
import { useEffect } from "react";
import { useGetMeQuery } from "./slices/userApiSlice";
import { setCredentials, logoutUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);
const App = () => {
  const { data, isLoading, error } = useGetMeQuery();
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data.user));
    } else if (error) {
      dispatch(logoutUser());
    }
  }, [data, error, isLoading, dispatch]);
  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
