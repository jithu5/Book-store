import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Register,CartPage, CheckoutPage,SingleBook } from "../pages/index";

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
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path:"books/:bookId",
        element :<SingleBook />
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
