import React, {useState,useEffect} from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'


 const initialState = {
    business_unit: "",
    employe_name: "",
    designation: "",
    monthly_salery: "",
    advance_salery: "",
    ex_salery: ""
 }
export default function AdvanceSalery() {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useAuthContext()
    const [totalAmount, setTotalAmount] = useState()

    useEffect(() => {
        gettingData()
         setTotalAmount(state.monthly_salery-state.advance_salery)
      }, [state.monthly_salery,state.advance_salery])
    
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
    await setDoc(doc(firestore, "Advance-Salery", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 text-info'>Advance Salery</h1>
              <form onSubmit={handleSubmit} >

              {/* Business Unit */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="supplier" className="form-label">Business Unit <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="business_unit" name='business_unit' onChange={handleChange} required placeholder='E.g nbc Burewala'/>
                    </div>
              
            </div>
            
             {/* Emp Name */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="item name" className="form-label"> Employe Name</label>
                          <input type="text" className="form-control" id="employe_name" name='employe_name' onChange={handleChange} required/>
                    </div>
              
            </div>
            
          </div>
          
           
         </div>
           {/* Designation*/}
       <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Designation<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="designation" name='designation' onChange={handleChange} required placeholder='E.g waiter, Sweeper'  />
                    </div>
              
            </div>
            {/* //Monthyly Salery */}
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Monthly Salery<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="monthly_salery" name='monthly_salery' onChange={handleChange} required  />
                    </div>
              
            </div>
        </div>
       </div>
       <div className="container">
        <div className="row">
            <div className="col-6">
             {/* Advance Salery*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Advance Salery<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="advance_salery" name='advance_salery'  onChange={handleChange} required/>
                    </div>
                    
              
            </div>
            <div className="col-6">
             {/* New Sal*/}
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">New Ex Salery of Month<span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="ex_salery" name='ex_salery' value={totalAmount}  onChange={handleChange} required/>
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
