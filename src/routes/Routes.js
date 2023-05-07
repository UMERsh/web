import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from 'pages/Frontend'
import Auth from 'pages/Auth'
import PrivateRoute from 'privateRoute/PrivateRoute'
import { useAuthContext } from 'context/AuthContext'

export default function Index() {
    const { isAuthenticated } = useAuthContext()

    return (
        <Routes>
            <Route path='/*' element={<Frontend /> } />
            <Route path='/auth/*' element={isAuthenticated ? <Navigate to='/' /> : <Auth />} />
        </Routes>
    )
}
