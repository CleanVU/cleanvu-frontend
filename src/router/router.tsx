import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import AuthPage from "../pages/AuthPage/AuthPage";
import StudentRequestsPage from "../pages/StudentPages/StudentRequestsPage";
import CustodianRequestsPage from "../pages/CustodianPages/CustodianRequestsPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import StudentDashboardPage from "../pages/StudentPages/StudentDashboardPage";

const protectedRouter = createBrowserRouter([
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

const Router = () => (
  <>
    <SignedIn>
      <RouterProvider router={protectedRouter} />
    </SignedIn>
    <SignedOut>
      <RouterProvider router={unprotectedRouter} />
    </SignedOut>
  </>
);

export default Router;
