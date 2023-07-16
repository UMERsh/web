import React, { useState, useEffect } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'
import NonProductiveItemsOptions from 'components/NonProductiveItemsOptions'

const initialState = {
  supplier: "",
  item_type: "",
  unit: "",
  approved_qty: 0,
  unit_rate: 0,
  store: ""
}


const initialReturnState = {
  return_supplier: "",
  return_item_type: "",
  return_unit: "",
  return_approved_qty: 0,
  return_unit_rate: 0,
  return_store: "",
  return_date: ""
}
export default function NonProductive() {
  const [state, setState] = useState(initialState)
  const [returnState, setReturnState] = useState(initialReturnState)
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalReturnAmount, setTotalReturnAmount] = useState(0)
  const { userData } = useAuthContext()

  useEffect(() => {
    gettingRecieveData()
  }, [])

  const gettingRecieveData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Non-Productive"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });

  }


  useEffect(() => {
    state.approved_qty = Number(state.approved_qty)
    state.unit_rate = Number(state.unit_rate)

    setTotalAmount(state.approved_qty * state.unit_rate)
  }, [state.approved_qty, state.unit_rate])

  useEffect(() => {
    returnState.return_approved_qty = Number(returnState.return_approved_qty)
    returnState.return_unit_rate = Number(returnState.return_unit_rate)

    setTotalReturnAmount(returnState.return_approved_qty * returnState.return_unit_rate)
  }, [returnState.return_approved_qty, returnState.return_unit_rate])




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
      await setDoc(doc(firestore, "Non-Productive", moment().format('YYYY-MM-DD,h:mm:ss a')), data)
        .then(() => {
          setIsLoading(false)
          window.toastify("Record Added Successfully", "success")
        })
    } catch (error) {
      window.toastify(error.message, "error")
      setIsLoading(false)
    }

    setState(initialState)
    gettingRecieveData()
  }

  // returning none productive items
  const handleReturnChange = e => setReturnState(s => ({ ...s, [e.target.name]: e.target.value }));

  //handleSubmit
  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    var { return_supplier, return_item_type, return_unit, return_approved_qty, return_unit_rate, return_store, return_date } = returnState
    return_supplier = return_supplier.trim()
    // return_item_type = return_item_type.trim()
    return_unit = return_unit.trim()
    // approved_qty = approved_qty.trim()
    // unit_rate = unit_rate.trim()
    return_store = return_store.trim()

    let data = {
      supplier: return_supplier,
      item_type: return_item_type,
      unit: return_unit,
      approved_qty: return_approved_qty,
      unit_rate: return_unit_rate,
      store: return_store,
      date: return_date,
      gross_amount: totalReturnAmount,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
      createdBy: {
        email: userData.email,
        uid: userData.uid,
      }
    }

    let fillteredData = documents.filter(item => {
      return item.dateCreated.split(',')[0] == data.date && item.item_type.toLowerCase() == data.item_type.toLowerCase() && item.store.toLowerCase() == data.store.toLowerCase() && item.supplier.toLowerCase() == data.supplier.toLowerCase()
    })
    if (!fillteredData.length) {
      return window.toastify("supplier, Item name, store or date does not match with existed received goods. Please re-check data", "error")
    } else {
      setIsLoading(true)
      try {
        const washingtonRef = doc(firestore, "Non-Productive", fillteredData[0].dateCreated);
        await updateDoc(washingtonRef, data)
          .then(async () => {
            await setDoc(doc(firestore, "Return-Non-Productive", moment().format('YYYY-MM-DD,h:mm:ss a')), data)
            setIsLoading(false)
            window.toastify("Good's Recieve Data Updated and New Record Added Successfully", "success")
          })

      } catch (error) {
        window.toastify(error.message, "error")
        setIsLoading(false)

      }
    }

    setReturnState(initialReturnState)
  }



  return (
    <>
      <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 fw-bold text-info'>Add Non Productive Items</h1>
              <form onSubmit={handleSubmit} >
                {/* Supplier */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="supplier" className="form-label">Supplier <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="supplier" name='supplier' value={state.supplier} onChange={handleChange} required />
                  </div>
                  {/* Item Name */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="item type" className="form-label"> Item Type</label>
                    {/* <input type="text" className="form-control" id="item_name" name='item_name' value={state.item_name} onChange={handleChange} required /> */}
                    <select className="form-select shadow-none" id='item_type' name='item_type' value={state.item_type} onChange={handleChange} aria-label="Default select example">
                      <option value=""></option>
                      <NonProductiveItemsOptions />
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

                <div className="row">
                  <div className="col">
                    {/* Store */}
                    <label htmlFor="store" className="form-label">Store <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="store" name='store' value={state.store} onChange={handleChange} required />
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



        {/* return non productive item */}
        <div className="row mt-5">
          <div className="col">
            <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 fw-bold text-info'>Returning Non Productive Items</h1>
              <form onSubmit={handleReturnSubmit} >
                {/* Supplier */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="return-supplier" className="form-label">Supplier <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="return-supplier" name='return_supplier' value={returnState.return_supplier} onChange={handleReturnChange} required />
                  </div>
                  {/* Item Name */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="return-item-type" className="form-label"> Item Name</label>
                    {/* <input type="text" className="form-control" id="item_name" name='item_name' value={state.item_name} onChange={handleReturnChange} required /> */}
                    <select className="form-select shadow-none" id='return-item-type' name='return_item_type' value={returnState.return_item_type} onChange={handleReturnChange} aria-label="Default select example">
                      <option value="" ></option>
                      <NonProductiveItemsOptions />
                    </select>
                  </div>
                </div>

                {/* Unit*/}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="return-unit" className="form-label">Unit<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="return-unit" name='return_unit' value={returnState.return_unit} onChange={handleReturnChange} required />
                  </div>
                  {/* //Approved Qty */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="return-approved-qty" className="form-label">Approved Qty<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="return-approved-qty" name='return_approved_qty' value={returnState.return_approved_qty} onChange={handleReturnChange} required />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    {/* Unit Rate */}
                    <label htmlFor="return-unit-rate" className="form-label">Unit Rate<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="return-unit-rate" name='return_unit_rate' value={returnState.return_unit_rate} onChange={handleReturnChange} required />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    {/* Gross Amount */}
                    <label htmlFor="return-gross-amount" className="form-label">Gross Amount<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="return-gross-amount" name='return_gross_amount' value={totalReturnAmount} readOnly />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    {/* Store */}
                    <label htmlFor="return-store" className="form-label">Store <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="return-store" name='return_store' value={returnState.return_store} onChange={handleReturnChange} required />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    {/* Gross Amount */}
                    <label htmlFor="return-date" className="form-label">Enter Date of Received Goods<span className="text-danger">*</span></label>
                    <input type="date" className="form-control" id="return-date" name='return_date' value={returnState.return_date} onChange={handleReturnChange} required />
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
        </div >






      </div >
    </>
  )
}
