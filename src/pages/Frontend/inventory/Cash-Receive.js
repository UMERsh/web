import React, {useState,useEffect} from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
    date: "",
    account_name: "",
    amount: "",
    item_type: "",
    description: ""
}
export default function CashReceive() {
    const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()

  useEffect(()=>{
    gettingData()
  },[])
  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
  }
  //handlechange
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));
///handlesubmit
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
      await setDoc(doc(firestore, "Cash-Receive", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 text-info'>Cash Receive</h1>
              <form onSubmit={handleSubmit} >

              {/* Date */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="date" className="form-label">Date <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" id="date" name='date' onChange={handleChange} required/>
                    </div>
              
            </div>
             {/* Account Name */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="salary" className="form-label"> Account Name</label>
                          <input type="text" className="form-control" id="account_name" name='account_name'  onChange={handleChange} required/>
                    </div>
              
            </div>
            
          </div>
          
           
         </div>
           {/* amount*/}
       <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Amount<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="amount" name='amount' onChange={handleChange} required  />
                    </div>
              
            </div>
            {/* item type */}
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Item Type<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="item_type" name='item_type' onChange={handleChange} required  />
                    </div>
              
            </div>
        </div>
       </div>
       <div className="container">
        <div className="row">
            <div className="col">
             {/* Description*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Description<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="description" name='description'   onChange={handleChange} required/>
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
