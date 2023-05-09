import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Navbar from 'components/Header/Navbar'
import Footer from 'components/Footer/Footer'
import ForgotPassword from './Forgot-Password'

export default function index() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
