import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFoodItem from './AddFoodItem'
import ViewUtilityBillsRecord from './ViewUtilityBillsRecord'
import ViewRestuarantRecord from './ViewRestuarantRecord'
import ViewSaleryRecord from './ViewSaleryRecord'
import ViewConstructionRecord from './ViewConstructionRecord'
import ViewInventoryRecord from './ViewInventoryRecord'
import ViewPayRoll from './ViewPayRoll'


export default function index() {
    return (
        <Routes>
            <Route path='/' element={<AddFoodItem />} />
            <Route path='/records' element={<ViewRestuarantRecord />} />
            <Route path='/utility-bills' element={<ViewUtilityBillsRecord />} />
            <Route path='/salaries' element={<ViewSaleryRecord />} />
            <Route path='/construction' element={<ViewConstructionRecord />} />
            <Route path='/inventory' element={<ViewInventoryRecord />} />
            <Route path='/payroll' element={<ViewPayRoll/>} />
        </Routes>
    )
}
