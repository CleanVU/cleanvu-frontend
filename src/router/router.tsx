import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
