import React from 'react'

export default function OrderBookingInformation() {
  return (
  <>
    <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5'>Order Booking Information</h1>
              <form >
                <div className="row row-cols-1 row-cols-md-2">

                  <div className="col">
                    {/* date and time input fields */}
                    <div className="row">
                      <div className="col">
                        <div class="mb-3">
                          <label for="date" class="form-label">Date *</label>
                          <input type="date" class="form-control" id="date"  />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3">
                          <label for="time" class="form-label">Time *</label>
                          <input type="time" class="form-control" id="time" />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3">
                          <label for="shift" class="form-label">Shift *</label>
                          <select class="form-select" id='item-title' aria-label="Default select example">
                      <option selected>Morning</option>
                      <option value="1">Noon</option>
                      <option value="2">Evening</option>
                    </select>
                        </div>
                      </div>
                    </div>
                    {/* party name  */}
                    <div className="row">
                    <div className="col">
                        <div class="mb-3">
                          <label for="party-name" class="form-label">Party Name *</label>
                          <input type="text" class="form-control" id="party-name" />
                        </div>
                      </div>
                    </div>
                    {/* customer info  */}
                    <div className="row ">
                    <div className="col">
                        <div class="mb-3">
                          <label for="customer-name" class="form-label">Customer Name *</label>
                          <input type="text" class="form-control" id="customer-name" />
                        </div>
                      </div>
                    </div>
                    {/* Customer Mobile */}
                    <div class="mb-3">
                      <label for="mobile_no" class="form-label">Mobile No</label>
                      <input type="text" class="form-control" id="mobile_no" />
                    </div>
                    <div class="mb-3">
                      <label for="delivery" class="form-label">Place of Delivery</label>
                      <input type="text" class="form-control" id="delivery" />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div class="mb-3">
                      <label for="sales-man" class="form-label">Sales man *</label>
                      <input type="email" class="form-control" id="sales-man" placeholder="Enter Name" />
                    </div>
                    {/* phone no */}
                    <div class="my-3">
                      <label for="phone-number" class="form-label ">Phone Number *</label>
                      <input type="tel" class="form-control" id="phone-number" />
                    </div>
                    {/* preparation  */}
                    <div className="row">
                    <div className="col">
                            <label for="surving-unit" class="form-label">Preparation Date&Time *</label>
                            <div className='d-flex '>
                              <input type="date" class="form-control me-4" id="preparation_date" />
                            <input type="time" class="form-control" />
                    </div>
                      </div>
                     </div>
                    {/* delivery */}
                    <div className="row my-3">
                    <div className="col">
                            <label for="surving-unit" class="form-label">Delivery Date&Time *</label>
                            <div className='d-flex '>
                              <input type="date" class="form-control me-4" id="delivery_date" />
                            <input type="time" class="form-control" />
                    </div>
                      </div>
                     </div>
                    {/* delivery man */}
                    <div class="my-3">
                      <label for="delivery_man" class="form-label">Delivery Man*</label>
                      <input type="text" class="form-control" id="delivery_man" />
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
