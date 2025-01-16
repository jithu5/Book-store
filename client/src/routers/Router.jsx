import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Register,CartPage, CheckoutPage,SingleBook,Adminlayout,AdminRegister, AdminLogin,AdminDashboard, UserHomeLayout } from "../pages/index";
import {ProtectedRoute,BookList, AddBooks, SalesDetails, EditBook} from "../components/index.js"

// Define your routes here
const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserHomeLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "cart",
            element: (
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "checkout",
            element: (
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "books/:bookId",
            element: (
              <ProtectedRoute>
                <SingleBook />
              </ProtectedRoute>
            ),
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },

  {
    path: "api/auth/admin",
    element: <Adminlayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <BookList />,
          },
          {
            path: "add-book",
            element: <AddBooks />,
          },
          {
            path: "sales",
            element: <SalesDetails />,
          },
          {
            path: "edit-book/:_id",
            element: <EditBook />,
          },
        ],
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
]);
export default router;
