import React, { useState } from 'react'
import './_management.scss'
import Routes from 'pages/Frontend/management/Routes'
import { NavLink } from 'react-router-dom'

export default function index() {
    return (
        <>
            <div className="alert alert-info mx-2" role="alert">Note! Only management can see this page.</div>
            <div className="container">
                <h1 className="text-center mt-5 fw-bold">MANAGEMENT</h1>
                <nav className="navbar navbar-expand-lg mb-5 bg-body-tertiary">
                    <button className="navbar-toggler border-info " type="button" data-bs-toggle="collapse" data-bs-target="#managementSupportedContent" aria-controls="managementSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mt-4 mt-md-0" id="managementSupportedContent">
                        <ul className=" navbar-nav nav-tabs border-bottom border-info w-100 management-tabs">
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to="/management" end>Add Food Items</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/records'>Restuarant Record</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/utility-bills'>Utility Bills Record</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/salaries'>Salary Record</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/construction'>Construction Record</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/inventory'>Inventory</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/payroll'>PayRoll</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes />
            </div>
        </>
    )
}

