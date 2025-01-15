import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";

function App() {
  const {currentUser,loading} = useContext(AuthContext)

    if(loading && !currentUser){
      return <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    }

  return (
    <>
    <AuthContextProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Zoom} // Add zoom animation
        />
        <Outlet/>
       
    </AuthContextProvider>
    </>
  );
}

export default App;
