import React, {useState,useEffect} from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
  employe_name: "",
  business_unit: "",
  staff_group: "",
  designation: "",
  hire_date: "",
  city: "",
  address: "",
  phone_no:"",
  nic_no: ""

}
export default function EmployeInfo() {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useAuthContext()
    const [totalAmount, setTotalAmount] = useState()

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
 const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));



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
      await setDoc(doc(firestore, "Employe-Info", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 text-info'>Employe Information</h1>
              <form onSubmit={handleSubmit} >

              {/* employe name */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="employe" className="form-label">Employe Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="employe_name" name='employe_name' onChange={handleChange} required/>
                    </div>
              
            </div>
            
             {/* Bussiness Unit */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="item name" className="form-label"> Business Unit</label>
                          <input type="text" className="form-control" id="business_unit" name='business_unit' onChange={handleChange} required placeholder='nbc burewala'/>
                    </div>
              
            </div>
            
          </div>
          
           
         </div>
           {/* Staf Group*/}
       <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Staf Group<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="staf_group" name='staf_group' onChange={handleChange} required placeholder='' />
                    </div>
              
            </div>
            {/* //Designation */}
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Designation<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="designation" name='designation' onChange={handleChange} required  placeholder='Eg waiter,sweeper'  />
                    </div>
              
            </div>
        </div>
       </div>
       <div className="container">
        <div className="row">
            <div className="col-6">
             {/* Hire Date */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Hire Date<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="hire_date" name='hire_date'  onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="col-6">
             {/* City */}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">City<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="city" name='city' value={totalAmount}  onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                   {/* Address*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Address<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="address" name='address'   onChange={handleChange} required/>
                    </div>
                </div>
              </div>
            </div>
        </div>
       </div>
        <div className="container">
            <div className="row">
                <div className="col-6">
                     {/* phone No*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Phone No:<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="phone_no" name='phone_no'   onChange={handleChange} required/>
                    </div>
                </div>
                <div className="col-6">
                     {/* NIC No*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">NIC No:<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="nic_no" name='nic_no'   onChange={handleChange} required/>
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
