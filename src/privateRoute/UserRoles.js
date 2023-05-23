import React from 'react'
import { useAuthContext } from 'context/AuthContext'
import { Navigate } from 'react-router-dom'
import Login from 'pages/Auth/Login'
import Navbar from 'components/Header/Navbar'
import Manager from 'pages/Frontend/management/index'


export default function UserRoles({ Component }) {
    const { userRole } = useAuthContext()

    if (userRole !== "") {
        if (userRole == "manager") {
            <Manager />
        }
        if (userRole=="staff") {
            
        }
    }
    return (
        <>
            <Navbar />
            <Login />
        </>
    )
}
