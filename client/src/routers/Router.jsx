import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {Home} from "../pages/index"

// Define your routes here
const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <App />,
    children: [
      {
        index:true,
        element: <Home/>,
      },
      {
        path: "team",
        element: <h2>Team</h2>,
      },
      {
        path: "contact",
        element: <h2>Contact</h2>,
      },
    ],
  },
]);
export default router;
