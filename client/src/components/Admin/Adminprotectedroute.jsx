import React, { Children, useContext, useEffect } from "react";
import { AdminAuthContext } from "../../Context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

function Adminprotectedroute({ children }) {
  const { currentAdmin, loading } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentAdmin) {
        navigate("/api/auth/admin/login");
      }
    }
  }, [loading, currentAdmin]);

  if (!loading && currentAdmin) {
    return children;
  }
}

export default Adminprotectedroute;
