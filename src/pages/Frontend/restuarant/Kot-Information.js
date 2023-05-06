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
                        <div class="mb-3">
                          <label for="kot_no" class="form-label"> KOT No*</label>
                          <input type="text" class="form-control" id="kot_no"  />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3">
                          <label for="date" class="form-label">KOT Date *</label>
                          <input type="date" class="form-control" id="date" />
                        </div>
                      </div>
                    </div>
                    {/* serving area  */}
                    <div className="row">
                      <div className="col">
                        <label for="surving-area" class="form-label">Serving Area *</label>
                        <div className='d-flex '>
                          <input type="number" class="form-control me-4" id="surving-area" />
                          <input type="text" class="form-control" placeholder='Dine in' />
                        </div>
                      </div>
                    </div>
                    {/* party  */}
                    <div className="row my-3">
                    <div class="mb-2">
                      <label for="party_name" class="form-label">Party Name</label>
                      <input type="text" class="form-control" id="party_name" />
                    </div>
                    </div>
                    <div className="row ">
                    <div class="">
                      <label for="description" class="form-label">Description</label>
                      <input type="text" class="form-control" id="description" />
                    </div>
                    </div>
                    {/* empoloyee */}
                    <div class="mb-3">
                      <label for="employee" class="form-label">Exmployee</label>
                      <input type="text" class="form-control" id="employee" />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div class="mb-3">
                      <label for="sales-man" class="form-label">Sales man *</label>
                      <input type="email" class="form-control" id="sales-man" placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row">
                      <div className="col">
                        <label for="surving-unit" class="form-label">Serving Unit *</label>
                        <div className='d-flex '>
                          <input type="number" class="form-control me-4" id="surving-unit" />
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                    </div>
                    {/* phone number */}
                    <div class="my-3">
                      <label for="phone-number" class="form-label ">Phone Number *</label>
                      <input type="tel" class="form-control" id="phone-number" />
                    </div>
                    {/* customer */}
                    <div class="my-3">
                      <label for="customer" class="form-label">Customer *</label>
                      <input type="text" class="form-control" id="customer" placeholder='Enter Customer Name' />
                    </div>
                    {/* address */}
                    <div class="my-3">
                      <label for="address" class="form-label">Address *</label>
                      <input type="text" class="form-control" id="address" />
                    </div>
                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-4 gx-2">
                  
                  <div className="col-4 col-md-1  ">
                    <label for="order-code" class="form-label">Code </label>
                    <input type="text" class="form-control" id="order-code" />
                  </div>
                  <div className="col-4 ">
                    <label for="item-title" class="form-label">Item Title</label>
                    <select class="form-select" id='item-title' aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="quantity" />
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label for="amount" class="form-label">Amount</label>
                    <input type="text" class="form-control" id="amount" />
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
