import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar,Footer } from '../../components/index'

function UserHomeLayout() {
  return (
    <>
    <NavBar/>
      <main className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-14 py-6 min-h-screen font-primary">
               <Outlet />
             </main>
             <Footer />
    </>
  )
}

export default UserHomeLayout
