import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import logo from 'Assets/images/logo1.png'
import { signOut } from 'firebase/auth';
import { auth } from 'config/Firebase';
import { useAuthContext } from 'context/AuthContext';

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
        <nav className="navbar navbar-expand-lg navbar-dark  bg-primary">
            <div className="container">
                <Link className="navbar-brand " to='/'> <img className='rounded-circle' src={logo} alt="" width={50} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <NavLink className="nav-link me-3" to='/'>Home</NavLink>
                        </li>
                        {userRole === "restuarant_manager" || userRole === "restuarant_staff"
                            ? <li className="nav-item dropdown">
                                <NavLink className="nav-link me-3" to='/restuarant/order-booking'>Restuarant</NavLink>
                            </li>
                            : ""
                        }
                        {userRole === "manager" || userRole === "restuarant_staff"
                            ? <li className="nav-item dropdown">
                                <a className="nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Inventory
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='inventory/goods-receive'>Goods Receiving Note(GRN)</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='inventory/goods-return'>Goods Return Note(GRN)</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='inventory/issuance'>Issuance</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='inventory/non-productive'>Non Productive</NavLink></li>
                                    <li><NavLink className="dropdown-item bg-success" to='inventory/cash-payment'>Cash Payment</NavLink></li>
                                    <li><NavLink className="dropdown-item bg-danger" to='inventory/cash-receive'>Cash Receive</NavLink></li>
                                </ul>
                            </li>
                            : ""
                        }
                        {userRole === "manager" || userRole === "restuarant_staff" 
                            ? <li className="nav-item dropdown">
                                <a className="nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    PayRoll
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='payroll/employe-info'>Employe Information</Link></li>
                                    <li><Link className="dropdown-item" to='payroll/advance-salery'>Advance Salery</Link></li>
                                    <li><Link className="dropdown-item" to='payroll/emp-salery'>Monthly Salery</Link></li>


                                </ul>
                            </li>
                            : ""
                        }
                        {userRole === "manager" 
                            ? <li className="nav-item dropdown">
                                <a className="nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Membership
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='membership/form'>Member Form</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='membership/total-members'>Total Members</NavLink></li>
                                </ul>
                            </li>
                            : ""
                        }

                        {userRole === "manager"
                            ? <li className="nav-item dropdown">
                                <a className="nav-link me-3 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Expenses
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='expenses/utility-bills'>Utility Bills</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='expenses/saleries'>Salaries</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='expenses/construction'>Construction</NavLink></li>
                                </ul>
                            </li>
                            : ""
                        }

                        {userRole === "manager" || userRole === "restuarant_manager" || userRole == 'restuarant_staff'
                            ? <li className="nav-item mb-3 mb-lg-0">
                                <NavLink className="nav-link me-3" to={userRole == "restuarant_staff" ? "/management/records" : "/management"}>Management</NavLink>
                            </li>
                            : ""
                        }
                        {isAuthenticated
                            ? <li className="nav-item">
                                <button className='btn btn-info px-5 py-2 rounded-pill text-white buttons' onClick={handleLogout}>Logout</button>
                            </li>
                            : <li className="nav-item">
                                <Link className='btn btn-info px-5 py-2 rounded-pill text-white buttons' to='/auth/login'>Login</Link>
                            </li>
                        }

                    </ul>

                </div>
            </div>
        </nav >
    )
}