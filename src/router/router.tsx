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
import { useUserContext } from "../context/user.context";

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
      { path: "/", element: <Navigate to="/custodian-requests" /> },
      { path: "/custodian-requests", element: <CustodianRequestsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const getRoutes = (role: string) => {
  switch (role) {
    case "student":
      return protectedStudentRouter;
    case "custodian":
      return protectedCustodianRouter;
    default:
      return protectedRouter;
  }
};

const Router = () => {
  const { currentUser } = useUserContext();
  const role = currentUser?.role || null;

  console.log("role", role);

  return (
    <>
      <SignedIn>
        <RouterProvider router={getRoutes(role || "")} />
      </SignedIn>
      <SignedOut>
        <RouterProvider router={unprotectedRouter} />
      </SignedOut>
    </>
  );
};

export default Router;
