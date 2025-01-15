import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'

function Adminlayout() {
  console.log("adminlayout")
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
        transition={Zoom}
      />
      <Outlet />
    </>
  );
}

export default Adminlayout
