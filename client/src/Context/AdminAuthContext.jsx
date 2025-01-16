import React, { createContext, useEffect, useState } from "react";
import { useGetAdminQuery } from "../redux/features/users/adminApi";

const AdminAuthContext = createContext({
  currentAdmin: null,
  setCurrentAdmin: () => {},
  loading: true,
});

function AdminAuthContextProvider({ children }) {
    const [currentAdmin, setCurrentAdmin] =useState(null);
    const [loading, setLoading] = useState(true);

    const {data,isLoading} = useGetAdminQuery();

    useEffect(() => {
      if (!isLoading && data) {
        setLoading(false);
        setCurrentAdmin(data.data);
      }
    }, [data,isLoading]);
    

    

    return (
        <AdminAuthContext.Provider value={{ currentAdmin, setCurrentAdmin, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export { AdminAuthContextProvider, AdminAuthContext };
