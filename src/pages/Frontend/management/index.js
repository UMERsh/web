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

                <nav class="navbar navbar-expand-md mb-5 bg-body-tertiary">
                    <button class="navbar-toggler border-info " type="button" data-bs-toggle="collapse" data-bs-target="#managementSupportedContent" aria-controls="managementSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse mt-4 mt-md-0" id="managementSupportedContent">
                        <ul className=" navbar-nav nav-tabs border-bottom border-info w-100 management-tabs">
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to="/management" end>Add Items</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/records'>View Record</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link text-primary border-0 " to='/management/re'>Link</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <a className="nav-link text-primary border-0 " href='#'>Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes />
            </div>



        </>
    )
}

