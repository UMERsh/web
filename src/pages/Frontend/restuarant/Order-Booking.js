import { firestore } from 'config/Firebase';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import React, { useEffect, useRef, useState } from 'react'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


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
  quantity: 1,
  amount: "",

}
export default function OrderBooking() {
  const [state, setState] = useState(intitalState)
  const [data, setData] = useState([])
  const [documents, setDocuments] = useState([])
  const [isAmount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [initialFixedPrice, setInitialFixedPrice] = useState()
  const [itemCode, setItemCode] = useState()
  const [localStorageData, setLocalStorageData] = useState([])
  const [dummyToggle, setDummyToggle] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    gettingData()
  }, [])

  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Menu"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
  }

  useEffect(() => {
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []
    setLocalStorageData(previousLocalStorageItems)
    // setTotalPrice(localStorageData.reduce((a, v) => a = a + v.amount, 0))
    // console.log(localStorageData.reduce((a, v) => a = a + v.amount, 0));
  }, [dummyToggle])

  // handle Change
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []


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

    // console.log(previousLocalStorageItems[0].customer_name);
    // if (previousLocalStorageItems[0] && customer_name !== previousLocalStorageItems[0].customer_name) {
    //   let firstFilteredItem = localStorageData.filter((oldpro) => {
    //     return oldpro.customer_name == customer_name
    //   })
    //   console.log(firstFilteredItem);
    //   localStorage.clear()
    //   setLocalStorageData([])

    //   localStorage.setItem("orders", JSON.stringify(firstFilteredItem))
    //   setLocalStorageData(firstFilteredItem)
    // }

    if (order_type == "") {
      return window.toastify("Please Select Order Type", "error")
    }
    if (item_title == "") {
      return window.toastify("Please Select Items", "error")
    }

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

    // console.log('state', formData)
    // console.log(previousLocalStorageItems);

    previousLocalStorageItems.push(formData)
    localStorage.setItem("orders", JSON.stringify(previousLocalStorageItems))
    setDummyToggle(!dummyToggle)
    state.order_type = ""
    state.item_title = ""
    setItemCode("")
    setQuantity(1)
    setAmount(0)
    window.toastify("Item added Successfully", "success")
  }

  // localStorageData.forEach((data) => {
  //   let total = + data.amount
  //   console.log(total);
  // })
  // console.log(total);

  console.log(totalPrice);
  // handleOrderType
  const handleOrderType = async (e) => {
    let orderType = e.target.value
    state.order_type = orderType;

    let array = []
    const q = query(collection(firestore, "Menu"), where("item_type", "==", orderType));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // let data = { firebaseId: doc.id, ...doc.data() }
      array.push(doc.data())
      setData(array)
    });
    // if (data == "") {
    //   setData([])
    // }
    // console.log(data)
    // setIsLoading(false)

  }

  // handleItemPrice
  const handleItemPrice = (e) => {
    const { value } = e.target
    // console.log(value);
    state.item_title = value
    let filteredData = documents.filter((data, i) => {
      return data.item_name === value
    })
    setItemCode(filteredData[0].code);
    state.order_code = filteredData[0].code;
    state.amount = Number(filteredData[0].item_price);
    setAmount(Number(filteredData[0].item_price))
    setInitialFixedPrice(Number(filteredData[0].item_price))
  }

  // handleAmount
  const handleAmount = (condition) => {
    if (state.item_title === "") {
      return window.toastify("Please Select Item First", "error")
    } else {
      switch (condition) {
        case -1:
          setQuantity(quantity === 1 ? quantity : quantity - 1)
          state.amount = state.amount == initialFixedPrice ? state.amount : state.amount - initialFixedPrice
          setAmount(state.amount)
          state.quantity = quantity + 1
          break;
        default:
          setQuantity(quantity + 1)
          state.amount = state.amount + initialFixedPrice
          setAmount(state.amount)
          state.quantity = quantity + 1
          break;
      }
    }


  }

  // handleLocalStorageDelete
  const handleLocalStorageDelete = (get) => {
    let filteredItems = localStorageData.filter((oldpro) => {
      return oldpro.id !== get
    })
    setLocalStorageData(filteredItems)
    localStorage.setItem("orders", JSON.stringify(filteredItems))
    window.toastify("Removed Successfully", "success")

  }

  // handleGenerateBill
  const handleGenerateBill = () => {
    let localStorageItemsAll = JSON.parse(localStorage.getItem("orders"))

    localStorageItemsAll.forEach(async (items, i) => {
      try {
        await setDoc(doc(firestore, "Order-booking", window.getRandomId()), items)
        // setCount(!count)
      } catch (e) {
        window.toastify("Something went wrong", "error")
      }
    })
    window.toastify("Item added successfully", "success")
    // console.log(result);
    localStorage.clear()
    setLocalStorageData([])
    setDummyToggle(!dummyToggle)
  }

  // localStorageData.map((ire, i) => {
  //   return console.log(ire.amount);
  // })



  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow-lg bg-light border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 fw-bold pb-5'>Order Booking</h1>
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    {/* date and shift input fields */}
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">Date *</label>
                          <input type="date" className="form-control bg-light" id="date" required name='date' onChange={handleChange} placeholder="name@example.com" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="shift" className="form-label">Shift *</label>
                          <input type="text" className="form-control bg-light" required id="shift" name='shift' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* serving area  */}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="surving-area" className="form-label">Serving Area *</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control bg-light me-4" id="surving-area" name='surving_area' onChange={handleChange} />
                          <input type="text" className="form-control bg-light" name='dine_in' placeholder='Dine in' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* party  */}
                    <div className="row my-3">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="party-type" className="form-label">Party Type *</label>
                          <input type="text" className="form-control bg-light" id="party-type" name='party_type' onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="party-name" className="form-label">Party Name *</label>
                          <input type="text" className="form-control bg-light" id="party-name" name='party_name' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* empoloyee */}
                    <div className="mb-3">
                      <label htmlFor="employee" className="form-label">Exmployee</label>
                      <input type="text" className="form-control bg-light" id="employee" name='employee' onChange={handleChange} />
                    </div>
                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="sales-man" className="form-label">Sales man *</label>
                      <input type="text" className="form-control bg-light" id="sales-man" name='sales_man_name' required onChange={handleChange} placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="surving-unit" className="form-label">Serving Unit *</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control bg-light me-4" id="surving-unit" name='surving_unit' required onChange={handleChange} />
                          <input type="text" className="form-control bg-light" name='surving_unit_details' required onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* phone number */}
                    <div className="my-3">
                      <label htmlFor="phone-number" className="form-label ">Phone Number *</label>
                      <input type="tel" className="form-control bg-light" id="phone-number" name='phone' required onChange={handleChange} />
                    </div>
                    {/* customer */}
                    <div className="my-3">
                      <label htmlFor="customer" className="form-label">Customer *</label>
                      <input type="text" className="form-control bg-light" id="customer" name='customer_name' required onChange={handleChange} placeholder='Enter Customer Name' />
                    </div>
                    {/* address */}
                    <div className="my-3">
                      <label htmlFor="address" className="form-label">Address *</label>
                      <input type="text" className="form-control bg-light" id="address" name='address' onChange={handleChange} />
                    </div>
                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-4 gx-2">
                  <div className="col-4 col-md-2 ">
                    <label htmlFor="order-type" className="form-label">Order Type</label>
                    <select className="form-select" id='order-type' name='order_type' value={state.order_type} onChange={handleOrderType} aria-label="Default select example">
                      <option value="" ></option>
                      <option value="dinner">Dinner</option>
                      <option value="mutton">Mutton</option>
                      <option value="fish">Fish</option>
                      <option value="chinese">Chinese</option>
                      <option value="fried-rice">Fried Rice</option>
                      <option value="noodles">Noodles</option>
                      <option value="ice-cream">Ice Cream</option>
                      <option value="milk-shake">Milk Shake</option>
                    </select>
                  </div>
                  <div className="col-4 col-md-1  ">
                    <label htmlFor="order-code" className="form-label">Code </label>
                    <input type="text" className="form-control bg-light" id="order-code" name='order_code' readOnly value={itemCode === undefined ? "" : itemCode} />
                  </div>
                  <div className="col-4 ">
                    <label htmlFor="item-title" className="form-label">Item Title</label>
                    <select className="form-select" id='item-title' name='item_title' value={state.item_title} onChange={handleItemPrice} aria-label="Default select example">
                      <option value="">Please Select Items</option>
                      {data.map((options, i) => {
                        return <option value={options.item_name} key={i}>{options.item_name}</option>
                      })}
                    </select>
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control bg-light" id="quantity" name='quantity' readOnly value={quantity} aria-describedby="basic-addon2" />
                      <span className="input-group-text p-0" id="basic-addon2" onClick={() => handleAmount(+1)}><ArrowDropUpRoundedIcon /></span>
                      <span className="input-group-text p-0" id="basic-addon2" onClick={() => handleAmount(-1)}><ArrowDropDownRoundedIcon /></span>
                    </div>
                    {/* <input type="number" className="form-control bg-light" id="quantity" name='quantity' onChange={handleAmount} /> */}
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control bg-light" id="amount" name='amount' readOnly value={isAmount} />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-8 col-md-3 offset-2 offset-md-9">
                    <button className='btn btn-info text-white w-100'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>





        {/*Showing data */}

        {localStorageData.length !== 0
          ? <div className="row mb-5 mt-3">
            <div className="col">
              <div className="card rounded-4 shadow py-3 px-3 px-md-4">
                <h1 className='fw-bold'>Added Products</h1><hr />
                <div className="table-responsive">
                  <table className="table table-striped table-hover  ">
                    <thead>
                      <tr>
                        <th scope="col" className='px-3'>#</th>
                        <th scope="col" className='pe-5'>Item Title</th>
                        <th scope="col" className='px-3'>Order Type</th>
                        <th scope="col" className='px-3'>Date</th>
                        <th scope="col" className='px-3'>Quantity</th>
                        <th scope="col" className='px-3'>Price</th>
                        <th scope="col" className='px-3'>Customer Name</th>
                        <th scope="col" className='px-3'>Phone</th>
                        <th scope="col" className='px-3'>Serving Unit</th>
                        <th scope="col" className='px-3'>Sales man</th>
                        <th scope="col" className='px-3'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {localStorageData.map((items, i) => {
                        return <tr key={i}>
                          <td scope="col">{i + 1}</td>
                          <td scope="col">{items.item_title}</td>
                          <td scope="col">{items.order_type}</td>
                          <td scope="col">{items.date}</td>
                          <td scope="col" className='text-center'>{items.quantity}</td>
                          <td scope="col">{"Rs. " + items.amount}</td>
                          <td scope="col">{items.customer_name}</td>
                          <td scope="col">{items.phone}</td>
                          <td scope="col">{items.surving_unit + " / " + items.surving_unit_details}</td>
                          <td scope="col">{items.sales_man_name}</td>
                          <td scope="col">
                            <button className='btn btn-sm btn-link' onClick={() => handleLocalStorageDelete(items.id)}>
                              <DeleteTwoToneIcon />
                            </button>
                          </td>
                        </tr>
                      })}

                    </tbody>
                  </table>
                </div>
                <div className="row mt-5">
                  <div className="col text-center">
                    <div className='fs-3'>Total: <span className='fw-bold text-primary '>Rs. {localStorageData.reduce((a, v) => a = a + v.amount, 0)}</span></div>
                  </div>
                  <div className="col text-center">

                    <button className='btn btn-info text-white px-5 py-2 rounded-pill' onClick={handleGenerateBill}>Generate Bill</button>
                  </div>
                </div>

                {/* <div className="text-end mt-5">
                  <button className='btn btn-primary px-5 py-2 rounded-pill' onClick={handleGenerateBill}>Generate Bill</button>
                </div> */}
              </div>
            </div>
          </div>
          : <></>
        }

      </div >
    </>
  )
}
