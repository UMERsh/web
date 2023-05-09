import React from 'react'

export default function KotInformation() {
  return (
   <>
    <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5'>KOT Information</h1>
              <form >
                <div className="row row-cols-1 row-cols-md-2">

                  <div className="col">
                    {/* date and shift input fields */}
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label for="kot_no" className="form-label"> KOT No*</label>
                          <input type="text" className="form-control" id="kot_no"  />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label for="date" className="form-label">KOT Date *</label>
                          <input type="date" className="form-control" id="date" />
                        </div>
                      </div>
                    </div>
                    {/* serving area  */}
                    <div className="row">
                      <div className="col">
                        <label for="surving-area" className="form-label">Serving Area *</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control me-4" id="surving-area" />
                          <input type="text" className="form-control" placeholder='Dine in' />
                        </div>
                      </div>
                    </div>
                    {/* party  */}
                    <div className="row my-3">
                    <div className="mb-2">
                      <label for="party_name" className="form-label">Party Name</label>
                      <input type="text" className="form-control" id="party_name" />
                    </div>
                    </div>
                    <div className="row ">
                    <div className="">
                      <label for="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" />
                    </div>
                    </div>
                    {/* empoloyee */}
                    <div className="mb-3">
                      <label for="employee" className="form-label">Exmployee</label>
                      <input type="text" className="form-control" id="employee" />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label for="sales-man" className="form-label">Sales man *</label>
                      <input type="email" className="form-control" id="sales-man" placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row">
                      <div className="col">
                        <label for="surving-unit" className="form-label">Serving Unit *</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control me-4" id="surving-unit" />
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    {/* phone number */}
                    <div className="my-3">
                      <label for="phone-number" className="form-label ">Phone Number *</label>
                      <input type="tel" className="form-control" id="phone-number" />
                    </div>
                    {/* customer */}
                    <div className="my-3">
                      <label for="customer" className="form-label">Customer *</label>
                      <input type="text" className="form-control" id="customer" placeholder='Enter Customer Name' />
                    </div>
                    {/* address */}
                    <div className="my-3">
                      <label for="address" className="form-label">Address *</label>
                      <input type="text" className="form-control" id="address" />
                    </div>
                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-4 gx-2">
                  
                  <div className="col-4 col-md-1  ">
                    <label for="order-code" className="form-label">Code </label>
                    <input type="text" className="form-control" id="order-code" />
                  </div>
                  <div className="col-4 ">
                    <label for="item-title" className="form-label">Item Title</label>
                    <select className="form-select" id='item-title' aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label for="quantity" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" />
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label for="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-8 col-md-3 offset-2 offset-md-9">
                    <button className='btn btn-outline-primary w-100'>Submit</button>
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
