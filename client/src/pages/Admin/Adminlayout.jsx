import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import { AdminAuthContextProvider } from '../../Context/AdminAuthContext';

function Adminlayout() {
  console.log("adminlayout")
  return (
    <>
    <AdminAuthContextProvider>

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
        transition={Zoom}
      />
      <Outlet />
    </AdminAuthContextProvider>
    </>
  );
}

export default Adminlayout
