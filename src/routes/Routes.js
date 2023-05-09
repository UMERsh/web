import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from 'pages/Frontend'
import Auth from 'pages/Auth'
import { useAuthContext } from 'context/AuthContext'

export default function Index() {
    const { isAuthenticated } = useAuthContext()

    return (
        <Routes>
            <Route path='/*' element={isAuthenticated?<Frontend />:<Navigate to='/auth/login'/> } />
            <Route path='/auth/*' element={isAuthenticated ? <Navigate to='/' /> : <Auth />} />
        </Routes>
    )
}
