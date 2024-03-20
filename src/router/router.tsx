import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import AuthPage from "../pages/AuthPage/AuthPage";
import StudentRequestsPage from "../pages/StudentPages/StudentRequestsPage";
import CustodianRequestsPage from "../pages/CustodianPages/CustodianRequestsPage";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react";
import StudentDashboardPage from "../pages/StudentPages/StudentDashboardPage";
import { useEffect } from "react";
import styles from "./router.module.css";
import Loading from "../components/Loading/Loading";

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
      { path: "/", element: <Navigate to="/custodian-requests" /> },
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
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  /************* SIDE EFFECTS *************/
  // If the user is loaded and doesn't have a role, sign out which will redirect them to the sign-in page
  useEffect(() => {
    if (isLoaded && !user?.publicMetadata.role) {
      signOut();
    }
  }, [isLoaded, user]);

  /************** RENDER **************/
  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        {user?.publicMetadata.role === "admin" && (
          <RouterProvider router={protectedAdminRouter} />
        )}
        {user?.publicMetadata.role === "student" && (
          <RouterProvider router={protectedStudentRouter} />
        )}
        {user?.publicMetadata.role === "custodian" && (
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
