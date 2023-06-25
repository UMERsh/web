import React, { useEffect, useState } from 'react'
import { serverTimestamp } from 'firebase/firestore/lite'
import moment from 'moment'

const initialState = {
  member_name: "",
  father_name: "",
  phone_no: "",
  membership_no: "",
  member_fee: 0,
  martial_status: "",
  cnic_no: "",
  date_of_birth: "",
  email: "",
  postal_address: "",
  address: "",
}

export default function Form() {
  const [state, setState] = useState(initialState)
  const [number, setNumber] = useState(0)


  useEffect(() => {
    // setInterval(() => {

    handleDateChange()
    // }, 1000);
  }, [])



  const handleChange = e => {
    const { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
  }

  // handleSubmit
  const handleSubmit = e => {
    e.preventDefault()
    let { member_name, father_name, phone_no, membership_no, member_fee, martial_status, cnic_no, date_of_birth, email, postal_address, address } = state;

    member_name = member_name.trim()
    father_name = father_name.trim()
    phone_no = phone_no.trim()
    membership_no = membership_no.trim()
    cnic_no = cnic_no.trim()
    email = email.trim()
    postal_address = postal_address.trim()
    address = address.trim()

    member_fee = Number(member_fee)

    let formData = {
      member_name, father_name, phone_no, membership_no, member_fee, martial_status, cnic_no, date_of_birth, email, postal_address, address,
      dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a')
    }

    console.log(formData);
    nextFunction(formData)
  }

  const nextFunction = (get) => {
    const date = get.dateCreated;
    const nextDate = moment(date).add(1, "month").format('YYYY-MM-DD,h:mm:ss a')
    console.log(nextDate);

  }

  const handleDateChange = () => {
    // const date = event.target.value;
    // setSelectedDate(date);
    const selectedMoment = moment("2023-06-22", 'YYYY-MM-DD');
    const currentDate = moment();

    const monthsDiff = currentDate.diff(selectedMoment, 'seconds');
    console.log(monthsDiff);

  };



  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5'>Member's Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    {/* name & father name */}
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label for="member_name" className="form-label"> Member's Name*</label>
                          <input type="text" className="form-control" required name='member_name' onChange={handleChange} id="member_name" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label for="father_name" className="form-label">Father's Name</label>
                          <input type="text" className="form-control" required name='father_name' onChange={handleChange} id="father_name" />
                        </div>
                      </div>
                    </div>
                    {/* Phone & Membership No */}
                    <div className="row">
                      <div className="col">
                        <label for="phone_no" className="form-label">Phone No*</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control me-4" required name='phone_no' onChange={handleChange} id="phone_no" />
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col ">
                        <div className="mb-3">
                          <label for="membership_no" className="form-label"> Membership No*</label>
                          <input type="text" className="form-control" required name='membership_no' onChange={handleChange} id="membership_no" />
                        </div>
                      </div>
                      <div className="col ">
                        <div className="mb-3">
                          <label for="member_fee" className="form-label">Member's Fee</label>
                          <input type="number" className="form-control" required name='member_fee' onChange={handleChange} id="member_fee" />
                        </div>
                      </div>
                    </div>
                    <div className="row">

                    </div>
                    {/* member's image */}
                    <div className="row my-3">
                      <div className="mb-2">
                        <label for="member_pic" className="form-label">Member's Pic</label>
                        <input type="file" className="form-control" id="member_pic" />
                      </div>
                    </div>

                    {/* Martial status */}
                    <div className="mb-3">
                      <label for="martial_status" className="form-label">Martial Status*</label> <br />

                      <input type="radio" name="martial_status" required value="married" onChange={handleChange} id="married" />
                      <label htmlFor="married">Married</label> <br />
                      <input type="radio" name="martial_status" required value="unmarried" onChange={handleChange} id="unmarried" />
                      <label htmlFor="unmarried">Unmarried</label>

                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label for="cnic_no" className="form-label">CNIC*</label>
                      <input type="number" className="form-control" required name='cnic_no' onChange={handleChange} id="cnic_no" placeholder="CNIC No" />
                    </div>
                    {/* DOB */}
                    <div className="row">
                      <div className="col">
                        <label for="dob" className="form-label">Date of Birth*</label>
                        <div className='d-flex '>
                          <input type="date" className="form-control me-4" required name='date_of_birth' onChange={handleChange} id="dob" />
                        </div>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="my-3">
                      <label for="email" className="form-label ">Email Address*</label>
                      <input type="email" className="form-control" required name='email' onChange={handleChange} id="email" />
                    </div>
                    {/* Postal Address */}
                    <div className="my-3">
                      <label for="postal_address" className="form-label">Postal Address *</label>
                      <input type="text" className="form-control" required name='postal_address' onChange={handleChange} id="postal_addrtess" />
                    </div>
                    {/* address */}
                    <div className="my-3">
                      <label for="address" className="form-label">Address *</label>
                      <input type="text" className="form-control" required name='address' onChange={handleChange} id="address" />
                    </div>
                  </div>
                </div><hr />

                <div className="row mt-4">
                  <div className="col-8 col-md-3 offset-2 offset-md-9">
                    <button className='btn btn-outline-success w-100'>Submit</button>
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
