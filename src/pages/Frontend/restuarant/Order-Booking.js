import { firestore } from 'config/Firebase';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import React, { useEffect, useRef, useState } from 'react'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FoodItemOptions from 'components/FoodItemOptions';
import './_restuarant.scss'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './New';
import { StaffComponentPrint } from './StaffComponentPrint';

const intitalState = {
  date: "",
  shift: "",
  surving_area: "",
  dine_in: "",
  party_type: "",
  party_name: "",
  sales_man_name: "",
  surving_unit: "",
  surving_unit_details: "",
  membership_number: "",
  customer_name: "",
  order_type: "",
  order_code: "",
  item_title: "",
  quantity: 1,
  amount: "",

}
export default function OrderBooking(props) {
  const [state, setState] = useState(intitalState)
  const [data, setData] = useState([])
  const [documents, setDocuments] = useState([])
  const [isAmount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [initialFixedPrice, setInitialFixedPrice] = useState()
  const [itemCode, setItemCode] = useState()
  const [localStorageData, setLocalStorageData] = useState([])
  const [printLocalStorageData, setPrintLocalStorageData] = useState([])
  const [dummyToggle, setDummyToggle] = useState(false)
  const [time, setTime] = useState("")
  const [changeTime, setChangeTime] = useState(false)
  const [printData, setPrintData] = useState([])
  const [printDataForStaff, setPrintDataForStaff] = useState([])

  var componentRef = useRef(null)
  var staffComponentPrint = useRef(null)


  useEffect(() => {
    var hours = new Date().getHours()
    var amPm = "am";

    if (hours > 12) {
      hours = hours - 12
      amPm = "pm"
    }
    if (hours == 0) {
      hours = 12
    }
    if (hours === 12) {
      amPm = "pm"
    }
    var mints = new Date().getMinutes()
    var sec = new Date().getSeconds()
    setTime(hours + ':' + mints + ':' + sec + ' ' + amPm)
  }, [changeTime])


  // This useEffect is used to get data from firebase and it is also used to get data from localstorage for once 
  useEffect(() => {
    gettingData()
    gettingPrintableData()
  }, [])

  // this funtion is used to get firebase data and this data is used in menu items
  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Menu"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
  }

  // this is another useEffect function and this function is helping to get data from localstorage when localstorage data change.
  useEffect(() => {
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []
    setLocalStorageData(previousLocalStorageItems)
    gettingPrintableData()
  }, [dummyToggle])

  //this function is used to get same type of data like we know that every user has different mobile phone number. 
  // so data one user can enter just one number and this function is helping to get data which is stored in that phone number.  
  const gettingPrintableData = () => {
    let previousLocalPrintableStorage = JSON.parse(localStorage.getItem("printable")) || []
    var membership_numbers = {};

    // Iterate through the array and group the objects by type
    previousLocalPrintableStorage.forEach(function (obj) {
      var membership_number = obj.membership_number;
      if (!membership_numbers[membership_number]) {
        membership_numbers[membership_number] = [];
      }
      membership_numbers[membership_number].push(obj);
    });

    var groupedArray = Object.values(membership_numbers);
    let customers = groupedArray.map((das, i) => das.map((ssss, i) => {
      return ssss
    }));
    setPrintLocalStorageData(customers)
  }


  // this handle change funtion halps us to get the values of all input fields like if user change some letter in that input fields then that changes will store in state
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []

    let { date, shift, surving_area, dine_in, party_type, party_name, sales_man_name, surving_unit, surving_unit_details, membership_number, customer_name, address, order_type, order_code, item_title, quantity, amount } = state
    date = date.trim()
    shift = shift.trim()
    surving_area = surving_area.trim()
    dine_in = dine_in.trim()
    party_type = party_type.trim()
    party_name = party_name.trim()
    sales_man_name = sales_man_name.trim()
    surving_unit = surving_unit.trim()
    surving_unit_details = surving_unit_details.trim()
    membership_number = membership_number.trim()
    customer_name = customer_name.trim()

    if (order_type == "") {
      return window.toastify("Please Select Order Type", "err0or")
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
      sales_man_name,
      surving_unit,
      surving_unit_details,
      membership_number,
      customer_name,
      order_type,
      order_code,
      item_title,
      quantity,
      amount,
      dateCreated: serverTimestamp(),
      id: window.getRandomId()
    }

    if (previousLocalStorageItems[0] == undefined) {
      setinLocalStorage(formData)
    } else {
      if (previousLocalStorageItems[0].membership_number !== membership_number || previousLocalStorageItems[0].customer_name !== customer_name) {
        window.toastify("You are adding different name or membership number of customer.Please 'Click Go for Print' button to take another order", "error")
      } else {
        setinLocalStorage(formData)
      }
    }


  }

  //set items in local storage
  const setinLocalStorage = (data) => {
    console.log("true");
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []

    previousLocalStorageItems.push(data)
    localStorage.setItem("orders", JSON.stringify(previousLocalStorageItems))
    setDummyToggle(!dummyToggle)
    state.order_type = ""
    state.item_title = ""
    state.quantity = 1
    setItemCode("")
    setQuantity(1)
    setAmount(0)
    window.toastify("Item added Successfully", "success")
  }


  // handleOrderType
  const handleOrderType = async (e) => {
    let orderType = e.target.value
    state.order_type = orderType;

    let array = []
    const q = query(collection(firestore, "Menu"), where("item_type", "==", orderType));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setData(array)
    });

  }

  // handleItemPrice
  const handleItemPrice = (e) => {
    const { value } = e.target
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
    setDummyToggle(!dummyToggle)
    localStorage.setItem("orders", JSON.stringify(filteredItems))
    window.toastify("Removed Successfully", "success")

  }

  // handleGoForPrint
  const handleGoForPrint = () => {
    setChangeTime(!changeTime)
    let localStorageOrdersData = JSON.parse(localStorage.getItem("orders"))
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("printable")) || []

    localStorageOrdersData.forEach(data => previousLocalStorageItems.push(data))

    localStorage.setItem("printable", JSON.stringify(previousLocalStorageItems))
    window.toastify("Item added for print successfully", "success")
    localStorage.removeItem("orders");
    setDummyToggle(!dummyToggle)

    state.customer_name = "";
    state.membership_number = "";
  }

  // handlelocalstorageupdate
  const handleLocalStorageUpdate = async (data) => {
    let printableLocal = JSON.parse(localStorage.getItem("printable")) || []

    data.forEach((editId, i) => {
      let name = editId.customer_name
      let phoneNumber = editId.membership_number;
      let filtered = printableLocal.filter((dataa, i) => {
        return (dataa.customer_name !== name && dataa.membership_number !== phoneNumber);
      })
      localStorage.setItem("printable", JSON.stringify(filtered))
    })
    localStorage.setItem("orders", JSON.stringify(data))
    setDummyToggle(!dummyToggle)

    let dataForUpdate = JSON.parse(localStorage.getItem("orders")) || []
    const lastData = dataForUpdate[dataForUpdate.length - 1];

    state.date = lastData.date;
    state.surving_unit = lastData.surving_unit;
    state.surving_unit_details = lastData.surving_unit_details;
    state.membership_number = lastData.membership_number;
    state.customer_name = lastData.customer_name;
  }

  // handlePrint
  const handlePrint = (get) => {
    setChangeTime(!changeTime)
    setPrintData(get)
    let printableLocal = JSON.parse(localStorage.getItem("printable"))

    get.forEach(async (items, i) => {
      try {
        await setDoc(doc(firestore, "Order-booking", window.getRandomId()), items)
          .then(() => {
            let name = items.customer_name
            let phoneNumber = items.membership_number;
            let filtered = printableLocal.filter((dataa, i) => {
              return (dataa.customer_name !== name && dataa.membership_number !== phoneNumber);
            })
            localStorage.setItem("printable", JSON.stringify(filtered))
            setDummyToggle(!dummyToggle)
          })

      } catch (e) {
        window.toastify("Something went wrong", "error")
      }
    })
  }



  return (
    <>
      <div className={`${localStorageData.length == 0 ? "container my-5" : "container-fluid my-5 px-4"}`}>
        <div className="row g-2">
          <div className={`${localStorageData.length == 0 ? "col-12" : "col-12 col-md-8"} `}>
            <div className="card rounded-4 shadow-lg bg-light border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 fw-bold pb-5'>Order Booking</h1>
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    {/* date and shift input fields */}
                    <div className="row g-2">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">Date *</label>
                          <input type="date" className="form-control bg-light" id="date" required name='date' value={state.date} onChange={handleChange} placeholder="name@example.com" />
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
                          <input type="number" className="form-control bg-light me-2" id="surving-area" name='surving_area' onChange={handleChange} />
                          <input type="text" className="form-control bg-light" name='dine_in' placeholder='Dine in' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* party  */}
                    <div className="row my-3 g-2">
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

                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="sales-man" className="form-label">Sales man *</label>
                      <input type="text" className="form-control bg-light" id="sales-man" name='sales_man_name' value={state.sales_man_name} required onChange={handleChange} placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="surving-unit" className="form-label">Serving Unit *</label>
                        <div className='d-flex '>
                          <input type="number" className="form-control bg-light me-2" id="surving-unit" name='surving_unit' value={state.surving_unit} required onChange={handleChange} />
                          <input type="text" className="form-control bg-light" name='surving_unit_details' placeholder='E.g. H1' value={state.surving_unit_details} required onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* phone number */}
                    <div className="my-3">
                      <label htmlFor="membership-number" className="form-label ">Membership Number *</label>
                      <input type="text" className="form-control bg-light" id="membership-number" name='membership_number' value={state.membership_number} required onChange={handleChange} />
                    </div>
                    {/* customer */}
                    <div className="my-3">
                      <label htmlFor="customer" className="form-label">Customer *</label>
                      <input type="text" className="form-control bg-light" id="customer" name='customer_name' value={state.customer_name} required onChange={handleChange} placeholder='Enter Customer Name' />
                    </div>

                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-4 gx-2">
                  <div className="col-4 col-md-2 ">
                    <label htmlFor="order-type" className="form-label">Order Type</label>
                    <select className="form-select" id='order-type' name='order_type' value={state.order_type} onChange={handleOrderType} aria-label="Default select example">
                      <option value="" ></option>
                      <FoodItemOptions />
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


          {/* print screen */}

          {localStorageData.length !== 0
            ?
            <div className="col-12 col-md-4">
              <div className="card rounded-4 shadow py-3 px-3 px-md-4 bg-light border-0 printable-table">
                <h1 className='fw-bold'>Added Products</h1><hr />
                <div className="table-responsive">
                  <table className="table table-striped table-hover  ">
                    <thead>
                      <tr>
                        <th scope="col" className='px-3' ></th>
                        <th scope="col" className='pe-5' >Item Title</th>
                        <th scope="col" className='px-3' >Order Type</th>
                        <th scope="col" className='px-3' >Date</th>
                        <th scope="col" className='px-3' >Quantity</th>
                        <th scope="col" className='px-3' >Price</th>
                        <th scope="col" className='px-3' >Customer Name</th>
                        <th scope="col" className='px-3' >Membership Number</th>
                        <th scope="col" className='px-3' >Serving Unit</th>
                        <th scope="col" className='px-3' >Sales man</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localStorageData.map((items, i) => {
                        return <tr key={i}>
                          <td scope="col">
                            <button className='btn btn-sm btn-link' onClick={() => handleLocalStorageDelete(items.id)}>
                              <DeleteTwoToneIcon />
                            </button>
                          </td>
                          <td scope="col">{items.item_title}</td>
                          <td scope="col">{items.order_type}</td>
                          <td scope="col">{items.date}</td>
                          <td scope="col" className='text-center'>{items.quantity}</td>
                          <td scope="col">{"Rs. " + items.amount}</td>
                          <td scope="col">{items.customer_name}</td>
                          <td scope="col">{items.membership_number}</td>
                          <td scope="col">{items.surving_unit + " / " + items.surving_unit_details}</td>
                          <td scope="col">{items.sales_man_name}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row row-cols-1 row-cols-lg-2 mt-5">
                  <div className="col text-center">
                    <div className='fs-3'>Total: <span className='fw-bold text-primary '>Rs. {localStorageData.reduce((a, v) => a = a + v.amount, 0)}</span></div>
                  </div>
                  <div className="col mt-3 mt-lg-0 text-center">
                    <ReactToPrint
                      trigger={() => <button className='btn btn-info text-white px-5 py-2 rounded-pill' onMouseOver={() => setPrintDataForStaff(localStorageData)}>Go for Print</button>}
                      // onBeforePrint={() => handlePrint(data)}
                      onAfterPrint={handleGoForPrint}
                      content={() => staffComponentPrint}
                    />
                    <div className='d-none'>
                      <StaffComponentPrint ref={(el) => (staffComponentPrint = el)} dataForPrint={printDataForStaff} time={time} />
                    </div>


                  </div>
                </div>
              </div>
            </div>
            : <></>
          }
        </div>



        <div className="row mt-3">
          <div className="col">
            <div className="card border-0 shadow rounded-4  ">
              <h1 className='fw-bold py-3 px-4'>Print Section</h1>
              <div className="table-responsive">
                <table className="table table-striped  ">
                  <thead>
                    <tr>
                      <th scope="col" className='px-3 ' >#</th>
                      <th scope="col" className='px-3 ' >Customer</th>
                      <th scope="col" className='px-3 ' >Membership Number</th>
                      <th scope="col" className='px-3 '>Items</th>
                      <th scope="col" className='pe-5 ' >Serving Unit</th>
                      <th scope="col" className='px-3 ' >Date</th>
                      <th scope="col" className='px-3 '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printLocalStorageData.map((data, i) => {
                      return <tr key={i} >
                        <td scope="col " >{i + 1}</td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.customer_name}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.item_title}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.membership_number}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col " >{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.surving_unit_details}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col " >{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.date}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col" >
                          <button className='btn btn-link btn-sm me-2' onClick={() => handleLocalStorageUpdate(data)}><EditTwoToneIcon /></button>
                          <ReactToPrint
                            trigger={() => <div className='btn btn-info btn-sm text-white' onMouseOver={() => setPrintData(data)}>Print</div>}
                            // onBeforePrint={() => handlePrint(data)}
                            // removeAfterPrint={true}
                            onAfterPrint={() => handlePrint(data)}
                            content={() => componentRef}
                          />

                          <div className='d-none'>
                            <ComponentToPrint ref={(el) => (componentRef = el)} dataForPrint={printData} time={time} />
                          </div>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
