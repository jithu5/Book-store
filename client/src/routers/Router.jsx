import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Register } from "../pages/index";

// Define your routes here
const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <h2>Contact</h2>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
export default router;
