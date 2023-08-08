import React, { useState, useEffect } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'
import ProductiveItemsOptions from 'components/ProductiveItemsOptions'
const initialState = {
  supplier: "",
  item_name: "",
  unit: "",
  approved_qty: 0,
  unit_rate: 0,
  store: "",
  discount: "",
  date: ""

}
export default function GoodsReturn() {
  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const { userData } = useAuthContext()

  useEffect(() => {
    state.approved_qty = Number(state.approved_qty)
    state.unit_rate = Number(state.unit_rate)

    setTotalAmount(state.approved_qty * state.unit_rate)
  }, [state.approved_qty, state.unit_rate])


  useEffect(() => {
    gettingRecieveData()
  }, [])

  const gettingRecieveData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Goods-Receive"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });

  }

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    var { supplier, item_name, unit, approved_qty, unit_rate, store, date, discount } = state
    supplier = supplier.trim()
    item_name = item_name.trim()
    unit = unit.trim()
    // approved_qty = approved_qty.trim()
    // unit_rate = unit_rate.trim()
    store = store.trim()

    let data = {
      supplier, item_name, unit, approved_qty, unit_rate, store, date, discount,
      gross_amount: totalAmount,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
      createdBy: {
        email: userData.email,
        uid: userData.uid,
      }
    }

    let fillteredData = documents.filter(item => {
      return item.dateCreated.split(',')[0] == data.date && item.item_name.toLowerCase() == data.item_name.toLowerCase() && item.store.toLowerCase() == data.store.toLowerCase() && item.supplier.toLowerCase() == data.supplier.toLowerCase()
    })

    if (!fillteredData.length) {
      return window.toastify("supplier, Item name, store or date does not match with existed received goods. Please re-check data", "error")
    } else {
      setIsLoading(true)
      try {
        const washingtonRef = doc(firestore, "Goods-Receive", fillteredData[0].dateCreated);
        await updateDoc(washingtonRef, data)
          .then(async () => {
            await setDoc(doc(firestore, "Goods-Return", moment().format('YYYY-MM-DD,h:mm:ss a')), data)
            setIsLoading(false)
            window.toastify("Good's Recieve Data Updated and New Record Added Successfully", "success")
          })

      } catch (error) {
        window.toastify(error.message, "error")
        setIsLoading(false)

      }
    }

    setState(initialState)
  }
  return (
    <>
      <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 fw-bold text-info'>Goods Returning Note(GRN)</h1>
              <form onSubmit={handleSubmit} >
                {/* Supplier */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="supplier" className="form-label">Supplier <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="supplier" name='supplier' value={state.supplier} onChange={handleChange} required />
                  </div>
                  {/* Item Name */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="item name" className="form-label"> Item Name</label>
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
                    <input type="number" className="form-control" id="gross_amount" name='gross_amount' value={totalAmount} readOnly />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    {/* Store */}
                    <label htmlFor="store" className="form-label">Store <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="store" name='store' value={state.store} onChange={handleChange} required />
                  </div>
                  <div className="col mt-3 mt-md-0">
                    {/* Gross Amount */}
                    <label htmlFor="discount" className="form-label">Discount</label>
                    <input type="text" className="form-control" id="discount" name='discount' value={state.discount} onChange={handleChange} />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-6">
                    {/* Gross Amount */}
                    <label htmlFor="date" className="form-label">Enter Date of Received Goods<span className="text-danger">*</span></label>
                    <input type="date" className="form-control" id="date" name='date' value={state.date} onChange={handleChange} required />
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
