import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/Firebase';

const initialState = {
    email: "",
}

export default function ForgotPassword() {
    const [state, setState] = useState(initialState)

    //getting values
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    //submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email } = state
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.toastify("Reset link is sent. Check inbox", "success")
            })
            .catch((error) => {
                window.toastify(error.message, "error")
            });
    }
    return (
        <>
            <div className='form-section '>
                <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card px-4 px-md-5 py-5 border-0 shadow-lg rounded-4">
                                <h2 className='text-center text-info py-4'>FORGOT PASSWORD</h2>
                                <form className='text-center ' onSubmit={handleSubmit}>
                                    {/* <div className="form-floating mb-3">
                                        <input type="email" className="form-control border-0 shadow-none border-bottom border-info border-2 rounded-0" id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                                        <label htmlFor="floatingInput" className='text-secondary'>Email address</label>
                                    </div> */}
                                    <input type="email" className="form-control my-4" id="email" name='email' onChange={handleChange} placeholder="Enter Email Here..." />

                                    <button className='btn btn-info px-5 py-2 mt-5 rounded-pill text-white buttons'>RESET PASSWORD</button>
                                    <div className='my-5 mx-2'>
                                        <Link to="/auth/login" className='text-info fs-4'>LOGIN</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
