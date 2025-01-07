import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProtectedRoute({children}) {
    const {currentUser,loading} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      if (!loading) {
        if (!currentUser) {
            navigate('/login')
            setTimeout(() => {
              
                toast.info("You need to login to access this page")
            }, 500)
            
        }
      }
    }, [currentUser,loading
    ])
    
    if (!loading && currentUser) {
       return children 
    }
  
}

export default ProtectedRoute
