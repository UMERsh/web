import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './Form'
import Expenses from './Expenses'
import FinalReport from './FinalReport'

export default function index() {
  return (
    <>
        <Routes>
            <Route path='form' element={<Form />} />
            <Route path='expenses' element={<Expenses />} />
            <Route path='finalreport' element={<FinalReport />} />
        </Routes>
    </>
    )
}
