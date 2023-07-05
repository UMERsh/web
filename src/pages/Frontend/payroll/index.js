import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeInfo from './Employe-Info'
import AdvanceSalery from './Advance-Salery'
export default function index() {
  return (
    <>
        <Routes>
            <Route path='employe-info' element={<EmployeInfo />} />
            <Route path='advance-salery' element={<AdvanceSalery />} />
        </Routes>
    </>
  )
}
