import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
            window.toastify("Log out successful","success")
            navigate('/')
        }).catch((error) => {            
            window.toastify(error.message,"error")
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
                            <Link className="nav-link active me-3" to='/'>Home</Link>
                        </li>

                        {userRole === "manager" || userRole === "staff"
                            ? <li className="nav-item ">
                                <Link className="nav-link me-3" to='/restuarant/order-booking'>Restuarant</Link>
                            </li>
                            : ""
                        }

                        <li className="nav-item dropdown">
                            <a className="nav-link me-3 dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Membership
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/membership/form">Membership Form</Link></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        {userRole === "manager"
                            ? <li className="nav-item">
                                <Link className="nav-link me-3" to='/management'>Management</Link>
                            </li>
                            : ""
                        }

                        {isAuthenticated
                            ? <li className="nav-item mt-3 mt-lg-0">
                                <button className='btn btn-info px-5 py-2 rounded-pill text-white buttons' onClick={handleLogout}>Logout</button>
                            </li>
                            : <li className="nav-item mt-3 mt-lg-0">
                                <Link className='btn btn-info px-5 py-2 rounded-pill text-white buttons' to='/auth/login'>Login</Link>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}
