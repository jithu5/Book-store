import React from 'react'
import "./App.css"
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/index'

function App() {
  return (
    <>
      <NavBar />
      <main className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-14 py-6 min-h-screen font-primary">
        <Outlet />
      </main>
      <h1>footer</h1>
    </>
  );
}

export default App
