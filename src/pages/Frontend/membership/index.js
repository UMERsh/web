import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './Form'
import TotalMembers from './Total-Members'
import MemberDetail from './Member-Detail'
import './_membership.scss'

export default function index() {
    return (
        <>
            <div className="alert alert-info mx-3" role="alert">Note! Only manager and staff can see this page.</div>
            <Routes>
                <Route path='form' element={<Form />} />
                <Route path='total-members' element={<TotalMembers />} />
                <Route path='member-details/:memberNumber?' element={<MemberDetail />} />
            </Routes>
        </>
    )
}
