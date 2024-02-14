import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import AuthPage from "../pages/AuthPage/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <div>Home</div> },
      { path: "/requests", element: <div>About</div> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
