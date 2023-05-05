import { firestore } from 'config/Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import React, { useState } from 'react'

const intitalState = {
  date: "",
  shift: "",
  surving_area: "",
  dine_in: "",
  party_type: "",
  party_name: "",
  employee: "",
  sales_man_name: "",
  surving_unit: "",
  surving_unit_details: "",
  phone: "",
  customer_name: "",
  address: "",
  order_type: "",
  order_code: "",
  item_title: "",
  quantity: "",
  amount: "",

}
export default function OrderBooking() {
  const [state, setState] = useState(intitalState)

  // handle Change
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    let { date, shift, surving_area, dine_in, party_type, party_name, employee, sales_man_name, surving_unit, surving_unit_details, phone, customer_name, address, order_type, order_code, item_title, quantity, amount } = state
    date = date.trim()
    shift = shift.trim()
    surving_area = surving_area.trim()
    dine_in = dine_in.trim()
    party_type = party_type.trim()
    party_name = party_name.trim()
    employee = employee.trim()
    sales_man_name = sales_man_name.trim()
    surving_unit = surving_unit.trim()
    surving_unit_details = surving_unit_details.trim()
    phone = phone.trim()
    customer_name = customer_name.trim()
    address = address.trim()
    order_type = order_type.trim()
    order_code = order_code.trim()
    item_title = item_title.trim()
    quantity = quantity.trim()
    amount = amount.trim()

    const formData = {
      date,
      shift,
      surving_area,
      dine_in,
      party_type,
      party_name,
      employee,
      sales_man_name,
      surving_unit,
      surving_unit_details,
      phone,
      customer_name,
      address,
      order_type,
      order_code,
      item_title,
      quantity,
      amount,
      dateCreated: serverTimestamp(),
      id: window.getRandomId()
    }




    console.log('state', formData)
    try {
      const docRef = await addDoc(collection(firestore, "order-booking"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }




  }



  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5'>Order Booking</h1>
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    {/* date and shift input fields */}
                    <div className="row">
                      <div className="col">
                        <div class="mb-3">
                          <label htmlFor="date" class="form-label">Date *</label>
                          <input type="date" class="form-control" id="date" name='date' onChange={handleChange} placeholder="name@example.com" />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3">
                          <label htmlFor="shift" class="form-label">Shift *</label>
                          <input type="text" class="form-control" id="shift" name='shift' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* serving area  */}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="surving-area" class="form-label">Serving Area *</label>
                        <div className='d-flex '>
                          <input type="number" class="form-control me-4" id="surving-area" name='surving_area' onChange={handleChange} />
                          <input type="text" class="form-control" name='dine_in' placeholder='Dine in' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* party  */}
                    <div className="row my-3">
                      <div className="col">
                        <div class="mb-3">
                          <label htmlFor="party-type" class="form-label">Party Type *</label>
                          <input type="text" class="form-control" id="party-type" name='party_type' onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col">
                        <div class="mb-3">
                          <label htmlFor="party-name" class="form-label">Party Name *</label>
                          <input type="text" class="form-control" id="party-name" name='party_name' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* empoloyee */}
                    <div class="mb-3">
                      <label htmlFor="employee" class="form-label">Exmployee</label>
                      <input type="text" class="form-control" id="employee" name='employee' onChange={handleChange} />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div class="mb-3">
                      <label htmlFor="sales-man" class="form-label">Sales man *</label>
                      <input type="email" class="form-control" id="sales-man" name='sales_man_name' onChange={handleChange} placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="surving-unit" class="form-label">Serving Unit *</label>
                        <div className='d-flex '>
                          <input type="number" class="form-control me-4" id="surving-unit" name='surving_unit' onChange={handleChange} />
                          <input type="text" class="form-control" name='surving_unit_details' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* phone number */}
                    <div class="my-3">
                      <label htmlFor="phone-number" class="form-label ">Phone Number *</label>
                      <input type="tel" class="form-control" id="phone-number" name='phone' onChange={handleChange} />
                    </div>
                    {/* customer */}
                    <div class="my-3">
                      <label htmlFor="customer" class="form-label">Customer *</label>
                      <input type="text" class="form-control" id="customer" name='customer_name' onChange={handleChange} placeholder='Enter Customer Name' />
                    </div>
                    {/* address */}
                    <div class="my-3">
                      <label htmlFor="address" class="form-label">Address *</label>
                      <input type="text" class="form-control" id="address" name='address' onChange={handleChange} />
                    </div>
                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-4 gx-2">
                  <div className="col-4 col-md-2 ">
                    <label htmlFor="order-type" class="form-label">Order Type</label>
                    <select class="form-select" id='order-type' name='order_type' onChange={handleChange} aria-label="Default select example">
                      <option defaultValue>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-4 col-md-1  ">
                    <label htmlFor="order-code" class="form-label">Code </label>
                    <input type="text" class="form-control" id="order-code" name='order_code' onChange={handleChange} />
                  </div>
                  <div className="col-4 ">
                    <label htmlFor="item-title" class="form-label">Item Title</label>
                    <select class="form-select" id='item-title' name='item_title' onChange={handleChange} aria-label="Default select example">
                      <option defaultValue>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="quantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="quantity" name='quantity' onChange={handleChange} />
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="amount" class="form-label">Amount</label>
                    <input type="text" class="form-control" id="amount" name='amount' onChange={handleChange} />
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
