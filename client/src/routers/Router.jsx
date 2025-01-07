import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Register,CartPage, CheckoutPage,SingleBook } from "../pages/index";
import {ProtectedRoute} from "../components/index.js"

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
        path: "cart",
        element: <ProtectedRoute><CartPage/></ProtectedRoute>,
      },
      {
        path: "checkout",
        element:<ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute> 
      },
      {
        path:"books/:bookId",
        element :<ProtectedRoute>
          <SingleBook />
        </ProtectedRoute>
      }
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
