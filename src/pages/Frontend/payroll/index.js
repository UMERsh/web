import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeInfo from './Employe-Info'
import AdvanceSalery from './Advance-Salery'
import EmpSalery from './Emp-Salery'
export default function index() {
  return (
    <>
    <div className="alert alert-info mx-2" role="alert">Note! Only management can see this page.</div>
        <Routes>
            <Route path='employe-info' element={<EmployeInfo />} />
            <Route path='advance-salery' element={<AdvanceSalery />} />
            <Route path='emp-salery' element={<EmpSalery />} />
        </Routes>
    </>
  )
}
