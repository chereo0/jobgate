import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import AdminApp from "../admin/AdminApp";
import CompanyApp from "../company/CompanyApp";
import CompanyProfilePage from "../pages/CompanyProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
  {
    path: "/company-profile/:id",
    element: <CompanyProfilePage />,
  },
  {
    path: "/admin/*",
    element: <AdminApp />,
  },
  {
    path: "/company/*",
    element: <CompanyApp />,
  },
]);
