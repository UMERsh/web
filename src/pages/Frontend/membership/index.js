import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './Form'
import Expenses from './Expenses'
import TotalMembers from './Total-Members'
import MemberDetail from './Member-Detail'

export default function index() {
    return (
        <>
            <Routes>
                <Route path='form' element={<Form />} />
                <Route path='expenses' element={<Expenses />} />
                <Route path='total-members' element={<TotalMembers />} />
                <Route path='member-details/:memberNumber?' element={<MemberDetail />} />
            </Routes>
        </>
    )
}
