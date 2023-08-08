import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddFoodItem from './restuarant/AddFoodItem'
import ViewUtilityBillsRecord from './ViewUtilityBillsRecord'
import ViewRestuarantRecord from './restuarant/ViewRestuarantRecord'
import ViewSaleryRecord from './ViewSaleryRecord'
import ViewConstructionRecord from './ViewConstructionRecord'
import InventoryGoodsRecord from './inventory/InventoryGoodsRecord'
import InventoryRecord from './inventory/InventoryRecord'
import ViewPayRoll from './ViewPayRoll'
import { useAuthContext } from 'context/AuthContext'


export default function Index() {
    const { userRole } = useAuthContext()

    return (
        <Routes>

            <Route path='/' element={userRole !== "" && userRole == 'restuarant_manager' ? <AddFoodItem /> : <Navigate to="/management/utility-bills" />} />
            <Route path='/records' element={userRole !== "" && userRole == 'restuarant_manager' || userRole == 'restuarant_staff' ? <ViewRestuarantRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/utility-bills' element={userRole !== "" && userRole == 'manager' ? <ViewUtilityBillsRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/salaries' element={userRole !== "" && userRole == 'manager' ? <ViewSaleryRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/construction' element={userRole !== "" && userRole == 'manager' ? <ViewConstructionRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/inventory-goods' element={userRole !== "" && userRole == 'manager' || userRole == 'restuarant_staff' ? <InventoryGoodsRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/inventory' element={userRole !== "" && userRole == 'manager' || userRole == 'restuarant_staff' ? <InventoryRecord /> : <div className='text-danger'>This page is not for you</div>} />
            <Route path='/payroll' element={userRole !== "" && userRole == 'manager' || userRole=='restuarant_staff' ?  <ViewPayRoll /> : <div className='text-danger'>This page is not for you</div>} />
        </Routes>
    )
}
