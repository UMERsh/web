import React, { useEffect, useState } from 'react'
import { auth, firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite'
import { Link, useNavigate } from 'react-router-dom'

const initialState = { email: "", password: "", confirm_password: "", user_role: "", user_name: "" }
const adminValues = { admin_email: "", admin_password: "" }

export default function Register() {
  const [state, setState] = useState(initialState)
  const [adminState, setAdminState] = useState(adminValues)
  const [superAdmin, setSuperAdmin] = useState({})
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

    const q = query(collection(firestore, "users"), where("role", "==", "super_admin"));
    const admin = await getDocs(q);
    admin.forEach((doc) => {
      setSuperAdmin(doc.data())
    });

  }



  //  handleChange
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }

  const handleAdminChange = e => setAdminState(s => ({ ...s, [e.target.name]: e.target.value }))




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

      if (user_role === "visiter") {
        addUserInFirestore(email, confirm_password, user_name, userData)
      } else {
        if (adminState.admin_email !== superAdmin.email) {
          return window.toastify("Wrong admin email", "error")
        } else if (adminState.admin_password !== superAdmin.password) {
          return window.toastify("Wrong admin password", "error")
        } else {
          addUserInFirestore(email, confirm_password, user_name, userData)
        }
      }

    } else {
      window.toastify("Please Enter valid email-address", "error")
    }

  }

  // adding user in firebase auth 
  const addUserInFirestore = (email, confirm_password, user_name, userData) => {
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
  }

  // storing data in firestore
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
          <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
            <div className="card px-4 px-md-3 px-lg-5 py-5 border-0 shadow-lg rounded-4">
              <div className="row">
                <div className="col">

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
                          <option value="visiter">Visiter</option>
                          <option value="staff">Staff</option>
                          <option value="manager">Manager</option>
                          <option value="restuarant_staff">Restuarant Staff</option>
                          <option value="restuarant_manager">Restuarant Manager</option>
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
                <div className="col-12 col-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                  <div className="text-secondary">Please enter email and password of super admin to confirm that you are super admin. Otherwise you can't create account.</div>
                  <div className="text-danger"><b>Note: </b>Super admin email and password not allowed for visiter account</div>
                  <div className="mb-3 mt-4">
                    <input type="email" className="form-control " onChange={handleAdminChange} required id="admin_email" name='admin_email' placeholder="Enter Super Admin Email" />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control " onChange={handleAdminChange} required id="admin_password" name='admin_password' placeholder="Enter Password" />
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}
