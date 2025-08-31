import React from 'react'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const{isLoading,isAuthenticated}=useAuth()
    if(isLoading){
        return <Spinner/>
    }
    if(!isAuthenticated){
        return <Navigate to={'/'} replace/>
    }
  return children
}

export default ProtectedRoute
