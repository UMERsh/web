import { firestore } from 'config/Firebase';
import { useAuthContext } from 'context/AuthContext';
import { doc, setDoc } from 'firebase/firestore/lite';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const initialState = {
  material_type: "",
  material_quantity: "",
  material_amount: "",
}

export default function Construction() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()
  const [totalAmount, setTotalAmount] = useState(0)

  // handleChange
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  };

  useEffect(() => {
    setTotalAmount(state.material_amount * state.material_quantity)
  }, [state.material_amount, state.material_quantity])

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      ...state,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
      total_amount: totalAmount,
      createdBy: {
        email: userData.email,
        uid: userData.uid,
      }
    }
    setIsLoading(true)
    try {
      await setDoc(doc(firestore, "Construction", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 text-info fw-bold'>Construction</h1>
              <form onSubmit={handleSubmit}>
                {/* Material Type */}
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    <label htmlFor="material_type" className="form-label">Material Type <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name='material_type' id="material_type" placeholder='E.g. Matti' onChange={handleChange} required />
                  </div>
                  {/* Material Quantity */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="material_quantity" className="form-label"> Quantity of Material*</label>
                    <input type="text" className="form-control" name='material_quantity' id="material_quantity" placeholder='E.g. 2' onChange={handleChange} required />
                  </div>
                </div>

                {/* Price of MAterial*/}
                <div className="row row-cols-1 row-cols-md-2 mt-3">
                  <div className="col">
                    <label htmlFor="mat_amount" className="form-label"> Amount per quantity*</label>
                    <input type="number" className="form-control" name='material_amount' id="mat_amount" placeholder='E.g. 200' onChange={handleChange} required />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="total_amount" className="form-label"> Total Amount*</label>
                    <input type="number" className="form-control" id="total_amount" readOnly value={totalAmount} />
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
