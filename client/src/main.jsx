import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routers/Router.jsx";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthContextProvider>

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthContextProvider>
  </StrictMode>
);
