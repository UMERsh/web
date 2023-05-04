import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from 'components/Header/Navbar'
import Footer from 'components/Footer/Footer'
import KotInformation from './restuarant/Kot-Information'
import OrderBooking from './restuarant/Order-Booking'
import OrderBookingInformation from './restuarant/Order-Booking-Information'

export default function index() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='restuarant/kot-information' element={<KotInformation />} />
                    <Route path='restuarant/order-booking' element={<OrderBooking />} />
                    <Route path='restuarant/order-booking-information' element={<OrderBookingInformation />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
