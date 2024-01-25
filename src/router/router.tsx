import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import StudentRequestsPage from "../pages/StudentPages/StudentRequestsPage/StudentRequestsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <div>Home</div> },
      { path: "/requests", element: <StudentRequestsPage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
