import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderBooking from './Order-Booking'
import KotInformation from './Kot-Information'
import OrderBookingInformation from './Order-Booking-Information'

export default function index() {

    return (
        <>
            <div className="alert alert-info mx-3" role="alert">Note! Only manager and staff can see this page.</div>
            <Routes>
                <Route path='order-booking' element={<OrderBooking />} />
                <Route path='kot-information' element={<KotInformation />} />
                <Route path='order-booking-information' element={<OrderBookingInformation />} />
            </Routes>
        </>
    )
}
