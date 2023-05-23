import React from 'react'

export default function OrderBookingInformation() {



  var arr = [
    { type: "orange", title: "First" },
    { type: "orange", title: "Second" },
    { type: "banana", title: "Third" },
    { type: "banana", title: "Fourth" },
    { type: "apple", title: "Third" },
    { type: "apple", title: "Fourth" },
    { type: "banana", title: "Third" },
    { type: "banana", title: "Fourth" },
  ];

  // Create an empty object to store the different types
  var types = {};

  // Iterate through the array and group the objects by type
  arr.forEach(function (obj) {
    var type = obj.type;
    if (!types[type]) {
      types[type] = [];
    }
    types[type].push(obj);
  });

  // Create a new array containing the grouped objects
  var groupedArray = Object.values(types);

  console.log(types.apple);
















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
                        <div className="mb-3">
                          <label for="date" className="form-label">Date *</label>
                          <input type="date" className="form-control" id="date" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label for="time" className="form-label">Time *</label>
                          <input type="time" className="form-control" id="time" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label for="shift" className="form-label">Shift *</label>
                          <select className="form-select" id='item-title' aria-label="Default select example">
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
                        <div className="mb-3">
                          <label for="party-name" className="form-label">Party Name *</label>
                          <input type="text" className="form-control" id="party-name" />
                        </div>
                      </div>
                    </div>
                    {/* customer info  */}
                    <div className="row ">
                      <div className="col">
                        <div className="mb-3">
                          <label for="customer-name" className="form-label">Customer Name *</label>
                          <input type="text" className="form-control" id="customer-name" />
                        </div>
                      </div>
                    </div>
                    {/* Customer Mobile */}
                    <div className="mb-3">
                      <label for="mobile_no" className="form-label">Mobile No</label>
                      <input type="text" className="form-control" id="mobile_no" />
                    </div>
                    <div className="mb-3">
                      <label for="delivery" className="form-label">Place of Delivery</label>
                      <input type="text" className="form-control" id="delivery" />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label for="sales-man" className="form-label">Sales man *</label>
                      <input type="email" className="form-control" id="sales-man" placeholder="Enter Name" />
                    </div>
                    {/* phone no */}
                    <div className="my-3">
                      <label for="phone-number" className="form-label ">Phone Number *</label>
                      <input type="tel" className="form-control" id="phone-number" />
                    </div>
                    {/* preparation  */}
                    <div className="row">
                      <div className="col">
                        <label for="surving-unit" className="form-label">Preparation Date&Time *</label>
                        <div className='d-flex '>
                          <input type="date" className="form-control me-4" id="preparation_date" />
                          <input type="time" className="form-control" />
                        </div>
                      </div>
                    </div>
                    {/* delivery */}
                    <div className="row my-3">
                      <div className="col">
                        <label for="surving-unit" className="form-label">Delivery Date&Time *</label>
                        <div className='d-flex '>
                          <input type="date" className="form-control me-4" id="delivery_date" />
                          <input type="time" className="form-control" />
                        </div>
                      </div>
                    </div>
                    {/* delivery man */}
                    <div className="my-3">
                      <label for="delivery_man" className="form-label">Delivery Man*</label>
                      <input type="text" className="form-control" id="delivery_man" />
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
