import { firestore } from 'config/Firebase';
import { useAuthContext } from 'context/AuthContext';
import { doc, setDoc } from 'firebase/firestore/lite';
import moment from 'moment';
import React, { useState } from 'react'

const initialState = {
  bill_type: "",
  bill_price: "",
  bill_month: ""
}

export default function UtilityBills() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
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
      await setDoc(doc(firestore, "Utility-Bills", moment().format('YYYY-MM-DD,h:mm:ss')), data)
        .then(() => {
          setIsLoading(false)
          window.toastify("Record Added Successfully", "success")
        })
    } catch (error) {
      window.toastify(error.message, "error")
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info fw-bold'>Utility Bills</h1>
              {/* Expense Type */}
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col mb-3 mb-md-0">
                    <label htmlFor="bill-type" className="form-label">Bill Type <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" id='bill-type' name='bill_type' aria-label="Default select example" onChange={handleChange} required>
                      <option value="" >Please Select Bill type</option>
                      <option value="mepco" >MEPCO</option>
                      <option value="ptcl" >PTCL</option>
                      <option value="gas" >Gas</option>
                    </select>
                  </div>
                  {/* Price of Bill */}
                  <div className="col">
                    <label htmlFor="bill_price" className="form-label"> Price of Bill*</label>
                    <input type="number" className="form-control" name='bill_price' id="bill_price" onChange={handleChange} required />
                  </div>
                </div>
                {/* Bill Month */}
                <div className="row">
                  <div className="col">
                    <label htmlFor="bill_month" className="form-label"> Month for Bill*</label>
                    <input type="date" className="form-control" name='bill_month' id="bill_month" onChange={handleChange} required />
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
