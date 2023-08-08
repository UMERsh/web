import React, { useState, useEffect } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'


const initialState = {
  business_unit: "",
  employe_name: "",
  designation: "",
  month: "",
  salery: "",
}
export default function EmpSalery() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()



  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      ...state,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
      createdBy: {
        email: userData.email,
        uid: userData.uid,
      }
    }
    setIsLoading(true)
    try {
      await setDoc(doc(firestore, "Monthly-Salery", moment().format('YYYY-MM-DD,h:mm:ss')), data)
        .then(() => {
          setIsLoading(false)
          window.toastify("Record Added Successfully", "success")
        })
    } catch (error) {
      window.toastify(error.message, "error")
      setIsLoading(false)
    }
    setState(initialState)
  }
  return (
    <>
      <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 fw-bold text-info'>Monthly Salery</h1>
              <form onSubmit={handleSubmit} >

                {/* Business Unit */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="supplier" className="form-label">Business Unit <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="business_unit" name='business_unit' value={state.business_unit} onChange={handleChange} required placeholder='E.g nbc Burewala' />
                  </div>

                  {/* Emp Name */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="item name" className="form-label"> Employe Name</label>
                    <input type="text" className="form-control" id="employe_name" name='employe_name' value={state.employe_name} onChange={handleChange} required />
                  </div>
                </div>

                {/* Designation*/}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="person_name" className="form-label">Designation<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="designation" name='designation' value={state.designation} onChange={handleChange} required placeholder='E.g waiter, Sweeper' />
                  </div>
                  {/* //Monthyly Salery */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="person_name" className="form-label"> Month<span className="text-danger">*</span></label>
                    <input type="date" className="form-control" id="month" name='month' onChange={handleChange} required />
                  </div>
                </div>

                <div className="row row-cols-12">
                  <div className="col">
                    {/* Advance Salery*/}
                    <label htmlFor="person_name" className="form-label">Salery<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="salery" name='salery'  onChange={handleChange} required />
                  </div>
                  
                </div>

                <div className="row mt-4">
                  <div className="col-8 col-md-3 offset-2 offset-md-9">
                    <button className='btn btn-info text-white w-100' disabled={isLoading}>
                      {isLoading
                        ? <div>
                          <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                          <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                          <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                        </div>
                        : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
