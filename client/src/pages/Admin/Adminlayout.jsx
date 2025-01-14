import React from 'react'
import { Outlet } from 'react-router-dom'

function Adminlayout() {
  console.log("adminlayout")
  return (
    <>
      <Outlet/>
    </>
  )
}

export default Adminlayout
