import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFoodItem from './AddFoodItem'
import ViewRecord from './ViewRecord'


export default function index() {
    return (
        <Routes>
            <Route path='/' element={<AddFoodItem />} />
            <Route path='/records' element={<ViewRecord />} />
        </Routes>
    )
}
