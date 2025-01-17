import React, { createContext, useEffect, useState } from "react";
import { useGetAdminQuery } from "../redux/features/users/adminApi";

const AdminAuthContext = createContext({
  currentAdmin: null,
  setCurrentAdmin: () => {}, // Placeholder function
  loading: true,
});

function AdminAuthContextProvider({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useGetAdminQuery();

useEffect(() => {
  if (!isLoading) {
    if (data) {
      setCurrentAdmin(data.data); // Ensure this is correct
    } else {
      setCurrentAdmin(null);
    }
    setLoading(false);
  }
}, [data, isLoading]);


  return (
    <AdminAuthContext.Provider
      value={{ currentAdmin, setCurrentAdmin, loading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export { AdminAuthContextProvider, AdminAuthContext };
