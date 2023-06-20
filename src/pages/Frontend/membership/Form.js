import React from 'react'

export default function Form() {
  return (
    <>
    <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5'>Member's Form</h1>
              <form >
                <div className="row row-cols-1 row-cols-md-2">

                  <div className="col">
                    {/* name & father name */}
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label for="member_name" className="form-label"> Member's Name*</label>
                          <input type="text" className="form-control" id="member_name"  />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label for="father_name" className="form-label">Father's Name</label>
                          <input type="text" className="form-control" id="father_name" />
                        </div>
                      </div>
                    </div>
                    {/* Phone & Membership No */}
                    <div className="row">
                      <div className="col">
                        <label for="phone_no" className="form-label">Phone No*</label>
                        <div className='d-flex '>
                          <input type="text" className="form-control me-4" id="phone_no" />
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col ">
                        <div className="mb-3">
                          <label for="membership_no" className="form-label"> Membership No*</label>
                          <input type="text" className="form-control" id="membership_no"  />
                        </div>
                      </div>
                      <div className="col ">
                        <div className="mb-3">
                          <label for="member_fee" className="form-label">Member's Fee</label>
                          <input type="text" className="form-control" id="member_fee" />
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
                     <input type="radio" name="martial_status" id="martial_status" />
                      <label htmlFor="martial_status">Married</label> <br />
                      <input type="radio" name="martial_status" id="martial_status" />
                      <label htmlFor="martial_status">Unmarried</label>
                    
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label for="cnic_no" className="form-label">CNIC*</label>
                      <input type="text" className="form-control" id="cnic_no" placeholder="CNIC No" />
                    </div>
                    {/* DOB */}
                    <div className="row">
                      <div className="col">
                        <label for="dob" className="form-label">Date of Birth*</label>
                        <div className='d-flex '>
                          <input type="date" className="form-control me-4" id="dob" />
                        </div>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="my-3">
                      <label for="email" className="form-label ">Email Address*</label>
                      <input type="text" className="form-control" id="email" />
                    </div>
                    {/* Postal Address */}
                    <div className="my-3">
                      <label for="postal_address" className="form-label">Postal Address *</label>
                      <input type="text" className="form-control" id="postal_addrtess" />
                    </div>
                    {/* address */}
                    <div className="my-3">
                      <label for="address" className="form-label">Address *</label>
                      <input type="text" className="form-control" id="address" />
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
