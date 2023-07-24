import React, { useState, useEffect } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'
import ProductiveItemsOptions from 'components/ProductiveItemsOptions'

const initialState = {
  store: "",
  item_name: "",
  unit: "",
  approved_qty: 0,
  unit_rate: 0,
 

}

export default function Issuance() {
  const [state, setState] = useState(initialState)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const { userData } = useAuthContext()

  // const gettingData = async () => {
  //   let array = []
  //   const querySnapshot = await getDocs(collection(firestore, "ProductiveItems"));
  //   querySnapshot.forEach((doc) => {
  //     array.push(doc.data())
  //     setDocuments(array)
  //   });
  // }
  useEffect(() => {
    // gettingData()
    state.approved_qty = Number(state.approved_qty)
    state.unit_rate = Number(state.unit_rate)

    setTotalAmount(state.approved_qty * state.unit_rate)
  }, [state.approved_qty, state.unit_rate])



  // handleItemType
  const handleItemType = async (e) => {
    let ItemName = e.target.value
    state.item_name = ItemName;

    let array = []
    const q = query(collection(firestore, "ProductiveItems"), where("item_name", "==", ItemName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setData(array)
    });

  }

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
      await setDoc(doc(firestore, "Issuance", moment().format('YYYY-MM-DD,h:mm:ss a')), data)
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
              <h1 className='pt-3 pb-5 fw-bold text-info'>Issuance</h1>
              <form onSubmit={handleSubmit} >
                {/* Store */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="supplier" className="form-label">Store <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="store" name='store' value={state.store} onChange={handleChange} required />
                  </div>
                  {/* Item Type */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="item-type" className="form-label"> Item Type</label>
                    {/* <input type="text" className="form-control" id="item_name" name='item_name' value={state.item_name} onChange={handleChange} required /> */}
                   <select className="form-select shadow-none" id='item_name' name='item_name' value={state.item_name} onChange={handleChange} aria-label="Default select example">
                      <option value="" ></option>
                       <ProductiveItemsOptions />
                   </select> 
                  </div>
                </div>
                      
                {/* Unit*/}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="person_name" className="form-label">Unit<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="unit" name='unit' value={state.unit} onChange={handleChange} required />
                  </div>
                  {/* //Approved Qty */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="person_name" className="form-label">Approved Qty<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="approved_qty" name='approved_qty' value={state.approved_qty} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    {/* Unit Rate */}
                    <label htmlFor="person_name" className="form-label">Unit Rate<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="unit_rate" name='unit_rate' value={state.unit_rate} onChange={handleChange} required />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    {/* Gross Amount */}
                    <label htmlFor="person_name" className="form-label">Gross Amount<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="gross_amount" name='gross_amount' value={totalAmount} onChange={handleChange} required />
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
            </div >
          </div >
        </div >
      </div >
    </>
  )
}
