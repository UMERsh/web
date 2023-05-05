import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    const handleChange = () => {

    }
    const handleSubmit = () => {
    }

    return (
        <>
            <div className="container py-5">
                <div className="row ">
                    <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card px-4 px-md-5 py-5 shadow-lg rounded-4">
                            <h2 className='text-center py-4'>LOGIN</h2>
                            <form className='pb-4' onSubmit={handleSubmit}>
                                <div className=" mb-3 ">
                                    {/* <label htmlFor="floatingInput" className='text-secondary'>Email address</label> */}
                                    <input type="email" className="form-control " id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                                </div>
                                <div className=" mb-3">
                                    {/* <label htmlFor="floatingPassword" className='text-secondary'>Password</label> */}
                                    <input type="password" className="form-control " id="password" name='password' onChange={handleChange} placeholder="Password" />
                                </div>
                                <div className="row">
                                    <div className="col-3 d-flex align-items-center">
                                        <label htmlFor="user-status " className='fw-bold'>Login as a:</label>
                                    </div>
                                    <div className="col">
                                        <select class="form-select " id='user-status' aria-label="Default select example">
                                            <option selected>Manager</option>
                                            <option >Staff</option>
                                            <option >Clients</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='text-start my-5 mx-2'>
                                    <Link to="/auth/forgot-password" className='text-primary'>Forgot password?</Link>
                                </div>
                                <button className="btn btn-primary w-50 rounded-0 text-white signin ">LOGIN</button>
                                <div className='mt-5 mx-2'>
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
