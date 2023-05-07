import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from 'components/Header/Navbar'
import Footer from 'components/Footer/Footer'
import KotInformation from './restuarant/Kot-Information'
import OrderBooking from './restuarant/Order-Booking'
import OrderBookingInformation from './restuarant/Order-Booking-Information'
import Management from './management'
import { useAuthContext } from 'context/AuthContext'

export default function index() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='management' element={<Management />} />
                    <Route path='restuarant/kot-information' element={<KotInformation />} />
                    <Route path='restuarant/order-booking' element={<OrderBooking />} />
                    <Route path='restuarant/order-booking-information' element={<OrderBookingInformation />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
