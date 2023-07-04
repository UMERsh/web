import React, {useState,useEffect} from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
    item_name: "",
    unit: "",
   approved_qty: "",
   unit_rate: "",
   gross_amount: "",
   store_name: ""

}

export default function GoodsReceive() {
    const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()
  const [totalAmount, setTotalAmount] = useState()

  useEffect(() => {
    gettingData()
     setTotalAmount(state.approved_qty*state.unit_rate)
  }, [state.approved_qty,state.unit_rate])

  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
  }
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));
  //handleSubmit
  const handleSubmit = async (e)=>{
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
    await setDoc(doc(firestore, "Goods-Receive", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info'>Goods Receiving Note(GRN)</h1>
              <form onSubmit={handleSubmit} >

              {/* Item Name */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Item Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="item_name" name='item_name' onChange={handleChange} required/>
                    </div>
              
            </div>
             {/* Unit */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="salary" className="form-label"> Unit</label>
                          <input type="text" className="form-control" id="unit" name='unit' onChange={handleChange} required/>
                    </div>
              
            </div>
            
          </div>
          
           
         </div>
           {/* Approved Qty*/}
       <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Approved Qty<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="approved_qty" name='approved_qty' onChange={handleChange} required  />
                    </div>
              
            </div>
            {/* //Unit Rate */}
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Unit Rate<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="unit_rate" name='unit_rate' onChange={handleChange} required  />
                    </div>
              
            </div>
        </div>
       </div>
       <div className="container">
        <div className="row">
            <div className="col-6">
             {/* Gross Amount */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Gross Amount<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="gross_amount" name='gross_amount'  value={totalAmount} onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="col-6">
             {/* Store */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Store Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="store_name" name='store_name'   onChange={handleChange} required/>
                    </div>
                    
              
            </div>
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
