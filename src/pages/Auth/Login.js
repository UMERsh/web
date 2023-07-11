import React, { useEffect, useState } from 'react'
import { auth, firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore/lite'
import { Link, useNavigate } from 'react-router-dom'

const initialState = { email: "", password: "", user_role: "" }

export default function Login() {
    const [state, setState] = useState(initialState)
    const [documents, setDocuments] = useState([])
    const { setIsAuthenticated } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        gettingData()
    }, [])

    const gettingData = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(firestore, "users"));
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
            setDocuments(array)
        });
    }

    //  handleChangez
    const handleChange = e => {
        const { name, value } = e.target;
        setState(s => ({ ...s, [name]: value }))
    }

    //  handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        let { email, password, user_role } = state

        if (user_role === "") {
            user_role = "manager"
        }

        let userRole = documents.filter((data, i) => {
            return data.email == email
        })

        if (!userRole[0]) {
            return window.toastify(`This email doesn't exists`, "error")
        } else {
            if (user_role !== userRole[0].user_role) {
                return window.toastify(`This email is registered for ${userRole[0].user_role}`, "error")
            } else {
                setIsLoading(true)
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        setIsAuthenticated(true)
                        window.toastify("Logged in successfully", "success")
                        navigate('/')
                    })
                    .catch((error) => {
                        window.toastify(error.message, "error")
                    });
                setIsLoading(false)
            }
        }

    }

    return (
        <>
            <div className="container py-5">
                <div className="row ">
                    <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card px-4 px-md-5 py-5 border-0 shadow-lg rounded-4">
                            <h2 className='text-center text-info py-4'>LOGIN</h2>
                            <form className='pb-4' onSubmit={handleSubmit}>
                                <div className=" mb-3 ">
                                    <input type="email" className="form-control " id="email" name='email' onChange={handleChange} placeholder="Enter Email Here..." />
                                </div>
                                <div className=" mb-4">
                                    <input type="password" className="form-control " id="password" name='password' onChange={handleChange} placeholder="Enter Password Here..." />
                                </div>
                                <div className="row ">
                                    <div className="col-6 col-md-3 d-flex align-items-center">
                                        <label htmlFor="user-role " className='fw-bold'>Login as:</label>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <select className="form-select " id='user-role' name='user_role' onChange={handleChange} aria-label="Default select example">
                                            <option value="manager">Manager</option>
                                            <option value="visiter">Visiter</option>
                                            <option value="staff">Staff</option>
                                            <option value="restuarant_staff">Restuarant Staff</option>
                                            <option value="restuarant_manager">Restuarant Manager</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='text-start my-5 mx-2'>
                                    <Link to="/auth/forgot-password" className='text-primary'>Forgot password?</Link>
                                </div>
                                <div className="text-center">
                                    <button className='btn btn-info px-5 py-2 rounded-pill text-white buttons' disabled={isLoading}>
                                        {isLoading
                                            ? <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            : "LOGIN"
                                        }
                                    </button>
                                </div>
                                <div className='text-center mt-5 mx-2'>
                                    <span>Don't have account?</span>
                                    <Link to="/auth/register" className=' mx-2 text-primary '>Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
