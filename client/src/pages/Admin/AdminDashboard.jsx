import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAdminQuery } from "../../redux/features/users/adminApi";

import {SideBar, Header, Dashboard, AddBooks, BookList} from "../../components/index"
function AdminDashboard() {
    const [totalSales, setTotalSales] = useState(0)
    const [dashboard, setDashboard] = useState("dashboard")

    const {data:fetchData,isLoading} = useGetAdminQuery()

    const navigate = useNavigate()

    const data = fetchData?.data ;
    
    console.log(data)
    useEffect(() => {
        console.log(data)
        console.log(isLoading)
      if (!isLoading && !data) {
        navigate("/api/auth/admin/login")
      }
      if (data && !isLoading ) {
        const sales = data.reduce(
          (acc, item) => acc + item.users.length,
          0
        );
        console.log(sales)
        setTotalSales(sales)
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
       <SideBar setDashboard={setDashboard} />
        <div className="flex-grow text-gray-800">
          <Header data={data} />
          <main className="p-6 sm:p-10 space-y-6 ">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
              </div>
              <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                <button
                onClick={()=>setDashboard("manageBooks")}
                  className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Manage Books
                </button>
                <button
                onClick={() => setDashboard("addBook")}
                  className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New Book
                </button>
              </div>
            </div>

              {dashboard === "dashboard" && <Dashboard data={data} totalSales={totalSales}/>}
              {dashboard === "addBook" && <AddBooks/>}
              {dashboard === "manageBooks" && <BookList data={data} />}
          </main>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
