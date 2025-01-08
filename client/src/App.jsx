import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "./components/index";

import { ToastContainer, Zoom } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const {currentUser,loading} = useContext(AuthContext)

    if(loading && !currentUser){
      return <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    }

  return (
    <>
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
        <NavBar />
        <main className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-14 py-6 min-h-screen font-primary">
          <Outlet />
        </main>
        <Footer />
    </>
  );
}

export default App;
