import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import AuthPage from "../pages/AuthPage/AuthPage";
import StudentRequestsPage from "../pages/StudentPages/StudentRequestsPage";
import CustodianRequestsPage from "../pages/CustodianPages/CustodianRequestsPage";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import StudentDashboardPage from "../pages/StudentPages/StudentDashboardPage";
import CustodianDashboard from "../pages/CustodianPages/CustodianDashboardPage";

const protectedAdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <StudentDashboardPage /> },
      { path: "/requests", element: <StudentRequestsPage /> },
      { path: "/custodian-requests", element: <CustodianRequestsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const unprotectedRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
]);

const protectedStudentRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <StudentDashboardPage /> },
      { path: "/requests", element: <StudentRequestsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const protectedCustodianRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <CustodianDashboard /> },
      { path: "/custodian-requests", element: <CustodianRequestsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const Router = () => {
  /************* HOOKS *************/
  const { user } = useUser();

  const roleFromLocalStorage = localStorage.getItem("role");

  console.log(roleFromLocalStorage);

  return (
    <>
      <SignedIn>
        {roleFromLocalStorage === "admin" ||
        user?.publicMetadata.role === "admin" ? (
          <RouterProvider router={protectedAdminRouter} />
        ) : roleFromLocalStorage === "student" ||
          user?.publicMetadata.role === "student" ? (
          <RouterProvider router={protectedStudentRouter} />
        ) : (
          <RouterProvider router={protectedCustodianRouter} />
        )}
      </SignedIn>
      <SignedOut>
        <RouterProvider router={unprotectedRouter} />
      </SignedOut>
    </>
  );
};

export default Router;
