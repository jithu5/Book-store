import React, { useEffect, useState } from 'react'

import { MdOutlineIncompleteCircle } from "react-icons/md";
import { useGetAdminBooksAndUsersQuery } from '../../redux/features/users/adminApi';

function SalesDetails() {
  const [totalSales, setTotalSales] = useState(0);

  const { data: fetchData, isLoading } = useGetAdminBooksAndUsersQuery();


  const data = fetchData?.data;

  console.log(data);
  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    if (data && !isLoading) {
      const sales = data.reduce((acc, item) => acc + item.users.length, 0);
      console.log(sales);
      setTotalSales(sales);
    }
  }, [data, isLoading]);

  // if (isLoading) {
  //   return (
  //     <div className="py-12 px-4 text-center">
  //       <h1 className="text-2xl font-bold">Loading...</h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
       
      
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdOutlineIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {/* {data?.totalOrders} */}
              {totalSales}
            </span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>
      </section>
    
     
    </>
  );
}

export default SalesDetails;
