import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddFoodItem from './AddFoodItem'
import ViewUtilityBillsRecord from './ViewUtilityBillsRecord'
import ViewRestuarantRecord from './ViewRestuarantRecord'
import ViewSaleryRecord from './ViewSaleryRecord'
import ViewConstructionRecord from './ViewConstructionRecord'
import InventoryRecord from './InventoryRecord'
import ViewPayRoll from './ViewPayRoll'
import { useAuthContext } from 'context/AuthContext'
import Home from '../Home'


export default function Index() {
    const { userRole } = useAuthContext()

    return (
        <Routes>

            <Route path='/' element={userRole !== "" && userRole == 'restuarant_manager' ? <AddFoodItem /> : <Navigate to="/management/utility-bills" />} />
            <Route path='/records' element={userRole !== "" && userRole == 'restuarant_manager' ? <ViewRestuarantRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/utility-bills' element={userRole !== "" && userRole == 'manager' ? <ViewUtilityBillsRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/salaries' element={userRole !== "" && userRole == 'manager' ? <ViewSaleryRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/construction' element={userRole !== "" && userRole == 'manager' ? <ViewConstructionRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/inventory' element={userRole !== "" && userRole == 'manager' ? <InventoryRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/payroll' element={userRole !== "" && userRole == 'manager' ? <ViewPayRoll /> : <div className='text-danger'>This page is not for you</div>} />
        </Routes>
    )
}
