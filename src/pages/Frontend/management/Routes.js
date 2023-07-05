import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFoodItem from './AddFoodItem'
import ViewUtilityBillsRecord from './ViewUtilityBillsRecord'
import ViewRestuarantRecord from './ViewRestuarantRecord'
import ViewSaleryRecord from './ViewSaleryRecord'
import ViewConstructionRecord from './ViewConstructionRecord'
<<<<<<< HEAD
import InventoryRecord from './InventoryRecord'
=======
import ViewInventoryRecord from './ViewInventoryRecord'
import ViewPayRoll from './ViewPayRoll'
>>>>>>> c7612651b40caed4e5eb60652a762f5b1f9751d2


export default function index() {
    return (
        <Routes>
            <Route path='/' element={<AddFoodItem />} />
            <Route path='/records' element={<ViewRestuarantRecord />} />
            <Route path='/utility-bills' element={<ViewUtilityBillsRecord />} />
            <Route path='/salaries' element={<ViewSaleryRecord />} />
            <Route path='/construction' element={<ViewConstructionRecord />} />
<<<<<<< HEAD
            <Route path='/inventory' element={<InventoryRecord />} />
=======
            <Route path='/inventory' element={<ViewInventoryRecord />} />
            <Route path='/payroll' element={<ViewPayRoll/>} />
>>>>>>> c7612651b40caed4e5eb60652a762f5b1f9751d2
        </Routes>
    )
}
