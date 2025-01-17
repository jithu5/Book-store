import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { SideBar, Header, Adminprotectedroute } from "../../components/index";
import { AdminAuthContext } from "../../Context/AdminAuthContext";

function AdminDashboard() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const {loading} = useContext(AdminAuthContext)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Adminprotectedroute>
      <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
        <div className={`${openSideBar ? "block" : "hidden"} sm:block`}>
          <SideBar />
        </div>
        <div className="flex-grow text-gray-800">
          <Header setOpenSideBar={setOpenSideBar} />
          <main className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </section>
    </Adminprotectedroute>
  );
}

export default AdminDashboard;
