import React, { useEffect, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { useAuthContext } from 'context/AuthContext'
import moment from 'moment'

const initialState = {
  person_name: "",
  salery: "",
  salery_month: ""
}
export default function Saleries() {
  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthContext()

  useEffect(() => {
    gettingData()
  }, [])

  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
  }

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
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
      await setDoc(doc(firestore, "Salaries", moment().format('YYYY-MM-DD,h:mm:ss')), data)
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
              <h1 className='pt-3 pb-5 text-info fw-bold'>Salaries</h1>
              <form onSubmit={handleSubmit}>
                {/* Select Person */}
                <div className="row row-cols-1 row-cols-md-2 mb-3">
                  <div className="col">
                    <label htmlFor="person_name" className="form-label">Person Name <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" id='person_name' name='person_name' aria-label="Default select example" onChange={handleChange} required>
                      <option value="" >Please Select Person</option>
                      {documents.map((items, i) => {
                        return <option value={items.user_name} key={i}>{items.user_name}</option>
                      })}

                    </select>
                  </div>
                  {/* Person Salary */}
                  <div className="col mt-3 mt-md-0">
                    <label htmlFor="salary" className="form-label"> Salary*</label>
                    <input type="number" className="form-control" name='salery' onChange={handleChange} id="salary" required />
                  </div>
                </div>

                {/* Salary Month*/}
                <div className="row">
                  <div className="col">
                    <label htmlFor="sal_month" className="form-label"> Month for Salary*</label>
                    <input type="date" className="form-control" name='salery_month' onChange={handleChange} id="sal_month" required />
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
      </div >
    </>
  )
}
