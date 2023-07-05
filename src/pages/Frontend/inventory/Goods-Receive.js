import React, { useState, useEffect } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
<<<<<<< HEAD
  item_name: "",
  unit: "",
  approved_qty: "",
  unit_rate: "",
  store_name: ""
=======
   supplier: "",
    item_name: "",
    unit: "",
   approved_qty: "",
   unit_rate: "",
   gross_amount: "",
   store: ""
>>>>>>> c7612651b40caed4e5eb60652a762f5b1f9751d2

}

export default function GoodsReceive() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const { userData } = useAuthContext()


  useEffect(() => {
    state.approved_qty = Number(state.approved_qty)
    state.unit_rate = Number(state.unit_rate)

    setTotalAmount(state.approved_qty * state.unit_rate)
  }, [state.approved_qty, state.unit_rate])


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...state,
      gross_amount: totalAmount,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
      createdBy: {
        email: userData.email,
        uid: userData.uid,
      }
    }

    setIsLoading(true)
    try {
      await setDoc(doc(firestore, "Goods-Receive", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 fw-bold text-info'>Goods Receiving Note (GRN)</h1>
              <form onSubmit={handleSubmit} >

<<<<<<< HEAD
                {/* Item Name */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="item_name" className="form-label">Item Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="item_name" name='item_name' placeholder='E.g. CokaCola' value={state.item_name} onChange={handleChange} required />
                  </div>

                  {/* Unit */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="unit" className="form-label"> Unit <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="unit" name='unit' placeholder='E.g. Littre'value={state.unit} onChange={handleChange} required />
                  </div>
                </div>

                {/* Approved Qty*/}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="approved_qty" className="form-label">Approved Qty<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="approved_qty" name='approved_qty'value={state.approved_qty} placeholder='E.g. 4' onChange={handleChange} required />
                  </div>

                  {/* Unit Rate */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="unit_rate" className="form-label">Unit Rate<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="unit_rate" name='unit_rate' value={state.unit_rate} placeholder='E.g. 120' onChange={handleChange} required />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    {/* Gross Amount */}
                    <label htmlFor="person_name" className="form-label">Gross Amount<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="gross_amount" name='gross_amount' value={totalAmount} readOnly />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    {/* Store */}
                    <label htmlFor="person_name" className="form-label">Store Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="store_name" name='store_name' value={state.store_name} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row mt-4">
=======
              {/* Supplier */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="supplier" className="form-label">Supplier <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="supplier" name='supplier' onChange={handleChange} required/>
                    </div>
              
            </div>
            
             {/* Item Name */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="item name" className="form-label"> Item Name</label>
                          <input type="text" className="form-control" id="item_name" name='item_name' onChange={handleChange} required/>
                    </div>
              
            </div>
            
          </div>
          
           
         </div>
           {/* Unit*/}
       <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Unit<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="unit" name='unit' onChange={handleChange} required  />
                    </div>
              
            </div>
            {/* //Approved Qty */}
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Approved Qty<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="approved_qty" name='approved_qty' onChange={handleChange} required  />
                    </div>
              
            </div>
        </div>
       </div>
       <div className="container">
        <div className="row">
            <div className="col-6">
             {/* Unit Rate */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Unit Rate<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="unit_rate" name='unit_rate'  onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="col-6">
             {/* Gross Amount */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Gross Amount<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="gross_amount" name='gross_amount' value={totalAmount}  onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                   {/* Store */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Store<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="store" name='store'   onChange={handleChange} required/>
                    </div>
                </div>
              </div>
            </div>
        </div>
       </div>
       <div className="row mt-4">
>>>>>>> c7612651b40caed4e5eb60652a762f5b1f9751d2
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
