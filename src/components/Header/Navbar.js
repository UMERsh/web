import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/logo.jpeg'
import { signOut } from 'firebase/auth';
import { auth, firestore } from 'config/Firebase';
import { useAuthContext } from 'context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

export default function Navbar() {
    const { isAuthenticated, setIsAuthenticated, userRole } = useAuthContext()
    const navigate = useNavigate()

    // handle logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            setIsAuthenticated(false)
            console.log("Sign-out successful");
            navigate('/')
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark  bg-primary">
            <div class="container">
                <Link class="navbar-brand" to='/'> <img className='' src={logo} alt="" width={45} /></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <button class="btn btn-link nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Restuarant</button>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to='/restuarant/kot-information'>KOT Information</Link></li>
                                <li><Link class="dropdown-item" to='/restuarant/order-booking'>Order Booking</Link></li>
                                <li><Link class="dropdown-item" to='/restuarant/order-booking-information'>Order Booking Information</Link></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link me-3" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        {userRole === "manager"
                            ? <li class="nav-item">
                                <Link class="nav-link me-3" to='/management'>Management</Link>
                            </li>
                            : ""
                        }


                        {isAuthenticated
                            ? <li class="nav-item">
                                <button className='btn btn-info' onClick={handleLogout}>Logout</button>
                            </li>
                            : <li class="nav-item">
                                <Link className='btn btn-info' to='/auth/login'>Login</Link>
                            </li>
                        }

                    </ul>

                </div>
            </div>
        </nav>
    )
}
