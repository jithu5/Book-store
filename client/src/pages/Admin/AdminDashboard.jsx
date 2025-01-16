import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetAdminBooksAndUsersQuery } from "../../redux/features/users/adminApi";

import {SideBar, Header} from "../../components/index"
function AdminDashboard() {
    const [openSideBar , setOpenSideBar ] = useState(false);

    const {data:fetchData,isLoading} = useGetAdminBooksAndUsersQuery()

    const navigate = useNavigate()

    const data = fetchData?.data ;
    
    console.log(data)
    useEffect(() => {
        console.log(data)
        console.log(isLoading)
      if (!isLoading && !data) {
        navigate("/api/auth/admin/login")
      }
    }, [data,isLoading,navigate]);
    
    if (isLoading) {
        return(
            <div className="py-12 px-4 text-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        )
    }
    
  return (
    <>
      <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
        <div className={`${openSideBar? 'block ': "hidden"} sm:block`}>
          <SideBar />
        </div>
        <div className="flex-grow text-gray-800">
          <Header data={data} setOpenSideBar={setOpenSideBar} />
          <main className="p-6 sm:p-10 space-y-6 ">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
              </div>
            </div>

            {/* {dashboard === "dashboard" && <Dashboard data={data} totalSales={totalSales}/>}
              {dashboard === "addBook" && <AddBooks/>}
              {dashboard === "manageBooks" && <BookList data={data} />} */}
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
