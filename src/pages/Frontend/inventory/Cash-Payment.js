import React, { useState } from 'react'
import { firestore } from 'config/Firebase'
import { doc, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
  date: "",
  account_name: "",
  amount: "",
  item_type: "",
  description: ""
}
export default function CashPayment() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()

  //handlechange
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));
  ///handlesubmit
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
      await setDoc(doc(firestore, "Cash-Payment", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 fw-bold text-info'>Cash Payment</h1>
              <form onSubmit={handleSubmit} >
                {/* Date */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="date" className="form-label">Date <span className="text-danger">*</span></label>
                    <input type="date" className="form-control" id="date" name='date' value={state.date} onChange={handleChange} required />
                  </div>
                  {/* Account Name */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="account_name" className="form-label"> Account Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="account_name" name='account_name' value={state.account_name} onChange={handleChange} required />
                  </div>
                </div>

                {/* amount*/}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="amount" className="form-label">Amount<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="amount" name='amount'value={state.amount} onChange={handleChange} required />
                  </div>
                  {/* item type */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="item_type" className="form-label">Item Type <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="item_type" name='item_type'value={state.item_type} onChange={handleChange} required />                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    {/* Description*/}
                    <label htmlFor="description" className="form-label">Description <span className="text-danger">*</span></label>
                    <textarea className="form-control" rows={3} id="description" name='description'value={state.description} onChange={handleChange} required ></textarea>
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
