import React, { useEffect, useState } from 'react'
import { auth, firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { Link, useNavigate } from 'react-router-dom'

const initialState = { email: "", password: "", confirm_password: "", user_role: "", user_name: "" }

export default function Register() {
  const [state, setState] = useState(initialState)
  const [documents, setDocuments] = useState([])
  const { setIsAuthenticated } = useAuthContext()

  const navigate = useNavigate()

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



  //  handleChange
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }

  //  handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, confirm_password, user_role, user_name } = state
    user_name = user_name.trim();
    email = email.trim();
    password = password.trim();
    confirm_password = confirm_password.trim();

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let userExists = documents.some((data) => data.user_name == user_name)
    if (userExists === true) {
      return window.toastify("User Name Exists Already. Please Choose Unique Name", "error")
    } else if (email.match(validRegex)) {
      if (password !== confirm_password) {
        return window.toastify("password dosn't match", "error")
      }
      if (user_role === "") {
        user_role = "visiter"
      }

      const userData = {
        user_name,
        email,
        password,
        confirm_password,
        user_role,
        dateCreated: new Date().getTime()
      }

      createUserWithEmailAndPassword(auth, email, confirm_password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: user_name
          })
          setIsAuthenticated(true)
          navigate('/')
          setDataInFirestore(userData);
          window.toastify("You are registered successfully", "success")
        })
        .catch((error) => {
          return window.toastify(error.message, "error")
        });

    } else {
      window.toastify("Please Enter valid email-address", "error")
    }

  }

  const setDataInFirestore = async (userData) => {

    try {
      await setDoc(doc(firestore, "users", userData.email), userData, { merge: true });
    } catch (e) {
      window.toastify(e.message, "error")
    }
  }




  return (
    <>
      <div className="container py-5">
        <div className="row ">
          <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card px-4 px-md-5 py-5 border-0 shadow-lg rounded-4">
              <h2 className='text-center text-info py-4'>REGISTER</h2>
              <form className='pb-4' onSubmit={handleSubmit}>
                <div className=" mb-3 ">
                  <input type="text" className="form-control " id="name" name='user_name' onChange={handleChange} placeholder="Enter Unique Username Here..." required />
                </div>
                <div className=" mb-3 ">
                  <input type="email" className="form-control " id="email" name='email' onChange={handleChange} placeholder="Enter Email Here..." />
                </div>
                <div className=" mb-3">
                  <input type="password" className="form-control " id="password" name='password' onChange={handleChange} placeholder="Enter Password Here..." />
                </div>
                <div className=" mb-4">
                  <input type="password" className="form-control " required id="confirm_password" name='confirm_password' onChange={handleChange} placeholder="Confirm Password..." />
                </div>
                <div className="row ">
                  <div className="col-6 col-md-3 d-flex align-items-center">
                    <label htmlFor="user-role " className='fw-bold'>Register as:</label>
                  </div>
                  <div className="col-6 col-md-9">
                    <select className="form-select" id='user-role' name='user_role' onChange={handleChange} aria-label="Default select example">
                      <option value="visiter">visiter</option>
                      <option value="staff">staff</option>
                      <option value="manager">manager</option>
                    </select>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <button className='btn btn-info px-5 py-2 rounded-pill text-white buttons' >REGISTER</button>
                </div>
                <div className='text-center mt-5 mx-2'>
                  <span>Already have account?</span>
                  <Link to="/auth/login" className=' mx-2 text-primary '>Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
