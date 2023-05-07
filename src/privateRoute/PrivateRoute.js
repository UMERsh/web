import React from 'react'
import { useAuthContext } from 'context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ Component }) {
    const { isAuthenticated } = useAuthContext()
    
    if (isAuthenticated === true) {
        return <Component />
    }
    return (
        <Navigate to="/auth/login" />
    )
}
