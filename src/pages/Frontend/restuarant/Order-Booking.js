import React, { useEffect, useRef, useState } from 'react'
import { auth, firestore } from 'config/Firebase';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FoodItemOptions from 'components/FoodItemOptions';
import './_restuarant.scss'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './New';
import { StaffComponentPrint } from './StaffComponentPrint';
import { Select } from 'antd';
import moment from 'moment';
import { useAuthContext } from 'context/AuthContext';

const intitalState = {
  shift: "",
  sales_man_name: "",
  surving_unit: "",
  surving_unit_details: "",
  address: "",
  serving_area: "",
  membership_number: "",
  customer_name: "",
  order_type: "",
  order_code: "",
  item_title: "",
  item_name_urdu: "",
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
  const [printPartyFunction, setPrintPartyFunctionData] = useState([])
  const [printDineIn, setPrintDineInData] = useState([])
  const [dummyToggle, setDummyToggle] = useState(false)
  const [time, setTime] = useState("")
  const [changeTime, setChangeTime] = useState(false)
  const [printData, setPrintData] = useState([])
  const [printDataForStaff, setPrintDataForStaff] = useState([])
  const [showAddedProducts, setShowAddedProducts] = useState(false)
  const [delModalValue, setDelModalValue] = useState([])
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const { userData } = useAuthContext()

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

  // useEffect(() => {
  //   setAmount(state.quantity * state.amount)
  // }, [state.amount, state.quantity])



  // This useEffect is used to get data from firebase and it is also used to get data from localstorage for once 
  useEffect(() => {
    gettingData()
    gettingHomeDeliveryPrintableData()
    gettingDineInPrintableData()
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
    gettingHomeDeliveryPrintableData()
    gettingDineInPrintableData()
  }, [dummyToggle])

  //this function is used to get same type of data like we know that every user has different mobile phone number. 
  // so data one user can enter just one number and this function is helping to get data which is stored in that phone number.  
  const gettingDineInPrintableData = () => {
    let previousLocalPrintableStorage = JSON.parse(localStorage.getItem("printable")) || []
    var membership_numbers = {};

    let home_delivery_filtered_data = previousLocalPrintableStorage.filter((dataa) => {
      return dataa.serving_area === 'dine_in'
    })
    home_delivery_filtered_data.forEach(function (obj) {
      var membership_number = obj.membership_number;
      if (!membership_numbers[membership_number]) {
        membership_numbers[membership_number] = [];
      }
      membership_numbers[membership_number].push(obj);
    });

    var groupedArray = Object.values(membership_numbers);
    setPrintDineInData(groupedArray)
  }

  //this function is used to get same type of data like we know that every user has different mobile phone number. 
  // so data one user can enter just one number and this function is helping to get data which is stored in that phone number.  
  const gettingHomeDeliveryPrintableData = () => {
    let previousLocalPrintableStorage = JSON.parse(localStorage.getItem("printable")) || []
    var membership_numbers = {};

    let party_function_filtered_data = previousLocalPrintableStorage.filter((dataa) => {
      return dataa.serving_area === 'party_function'
    })
    party_function_filtered_data.forEach(function (obj) {
      var membership_number = obj.membership_number;
      if (!membership_numbers[membership_number]) {
        membership_numbers[membership_number] = [];
      }
      membership_numbers[membership_number].push(obj);
    });

    var groupedArray = Object.values(membership_numbers);
    setPrintPartyFunctionData(groupedArray)
  }



  // this handle change funtion halps us to get the values of all input fields like if user change some letter in that input fields then that changes will store in state
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()


    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []

    let { shift, sales_man_name, surving_unit, surving_unit_details, address, serving_area, membership_number, customer_name, order_type, order_code, item_title, item_name_urdu, quantity, amount } = state
    shift = shift.trim()
    sales_man_name = sales_man_name.trim()
    surving_unit = surving_unit.trim()
    surving_unit_details = surving_unit_details.trim()
    membership_number = membership_number.trim()
    customer_name = customer_name.trim()

    if (order_type == "") {
      return window.toastify("Please Select Order Type", "error")
    }
    if (item_title == "") {
      return window.toastify("Please Select Items", "error")
    }

    if (serving_area === "") {
      return window.toastify("Please Select Serving Area", "error")
    }


    const formData = {
      date: moment().format('YYYY-MM-DD'),
      shift,
      sales_man_name,
      surving_unit,
      surving_unit_details,
      address,
      serving_area,
      membership_number,
      customer_name,
      order_type,
      order_code,
      item_title,
      item_name_urdu,
      quantity,
      amount,
      dateCreated: serverTimestamp(),
      id: window.getRandomId(),
      email: userData.email
    }

    if (previousLocalStorageItems[0] == undefined) {
      setinLocalStorage(formData)
    } else {
      if (previousLocalStorageItems[0].membership_number !== membership_number || previousLocalStorageItems[0].customer_name !== customer_name || previousLocalStorageItems[0].serving_area !== serving_area) {
        window.toastify("You are adding different name, serving area or membership number of customer.Please 'Click Go for Print' button to take another order", "error")
      } else {
        setinLocalStorage(formData)
      }
    }
  }

  //set items in local storage
  const setinLocalStorage = (data) => {
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("orders")) || []

    previousLocalStorageItems.push(data)
    localStorage.setItem("orders", JSON.stringify(previousLocalStorageItems))
    setDummyToggle(!dummyToggle)
    state.order_type = ""
    state.item_title = ""
    state.item_name_urdu = ""
    state.quantity = 1


    setItemCode("")
    setQuantity(1)
    setAmount(0)
    window.toastify("Item added Successfully", "success")
    setShowAddedProducts(false)

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
  const handleItemPrice = (value) => {
    state.item_title = value
    let filteredData = documents.filter((data, i) => {
      return data.item_name === value
    })
    setItemCode(filteredData[0].code);
    state.order_code = filteredData[0].code;
    state.amount = Number(filteredData[0].item_price);
    state.item_name_urdu = filteredData[0].item_name_urdu
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
  const handleGoForPrint = (get) => {

    setChangeTime(!changeTime)
    let localStorageOrdersData = JSON.parse(localStorage.getItem("orders"))
    let previousLocalStorageItems = JSON.parse(localStorage.getItem("printable")) || []

    if (get === 'home_delivery' || get === 'take_away') {
      localStorageOrdersData.forEach(async (items) => {
        try {
          await setDoc(doc(firestore, "Order-booking", window.getRandomId()), items)
            .then(() => {
              setDummyToggle(!dummyToggle)
            })

        } catch (e) {
          window.toastify("Something went wrong", "error")
        }
      })
      localStorage.removeItem("orders");
    } else {
      localStorageOrdersData.forEach(data => previousLocalStorageItems.push(data))
      localStorage.setItem("printable", JSON.stringify(previousLocalStorageItems))
      window.toastify("Item added for print successfully", "success")
      localStorage.removeItem("orders");
      setDummyToggle(!dummyToggle)
    }

    state.customer_name = "";
    state.membership_number = "";
    state.serving_area = ""
  }


  // handlelocalstorageupdate
  const handleLocalStorageUpdate = (data) => {
    let ordersCollection = JSON.parse(localStorage.getItem("orders")) || []
    let printableLocal = JSON.parse(localStorage.getItem("printable")) || []

    if (ordersCollection.length !== 0) {
      return window.toastify('Some Data already exists. Please press "Go for Print" button', "error")
    } else {
      // data.forEach((editId, i) => {
      //   let name = editId.customer_name
      //   let memberShip_number = editId.membership_number;
      //   let filtered = printableLocal.filter((dataa, i) => {
      //     return (dataa.customer_name !== name && dataa.membership_number !== memberShip_number);
      //   })
      //   localStorage.setItem("printable", JSON.stringify(filtered))
      // })

      setShowAddedProducts(true)
      // localStorage.setItem("orders", JSON.stringify(data))
      // setDummyToggle(!dummyToggle)
      // let dataForUpdate = JSON.parse(localStorage.getItem("orders")) || []
      const lastData = data[data.length - 1];

      state.serving_area = lastData.serving_area;
      state.surving_unit = lastData.surving_unit;
      state.surving_unit_details = lastData.surving_unit_details;
      state.membership_number = lastData.membership_number;
      state.customer_name = lastData.customer_name;
    }
  }

  // handleSaveData
  const handleSaveData = async (get) => {
    let printableLocal = JSON.parse(localStorage.getItem("printable"))
    setIsSaveLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "TotalTax"));
    var getTax;
    querySnapshot.forEach((doc) => {
      getTax = doc.data()
    })

    if (get[0].serving_area === "dine_in") {
      const tax = 6
      let totalamnt = get.reduce((a, v) => a = a + v.amount, 0)
      let salesTax = (tax / 100) * totalamnt;
      let total = getTax === undefined ? salesTax : getTax.salesTax + salesTax

      let totalTax = {
        salesTax: total,
        dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a')
      }

      await setDoc(doc(firestore, "TotalTax", "tax"), totalTax)
        .then(() => {
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
                  setIsSaveLoading(false)
                })

            } catch (e) {
              window.toastify("Something went wrong", "error")
              setIsSaveLoading(false)
            }
          })
        })
    } else {
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
              setIsSaveLoading(false)
            })

        } catch (e) {
          window.toastify("Something went wrong", "error")
          setIsSaveLoading(false)
        }
      })
    }
  }


  const handleDeleteFromPrintable = (get) => {
    let printableLocal = JSON.parse(localStorage.getItem("printable"))

    let filteredItems = printableLocal.filter((oldpro) => {
      return oldpro.id !== get
    })
    setDummyToggle(!dummyToggle)
    localStorage.setItem("printable", JSON.stringify(filteredItems))
    window.toastify("Removed Successfully", "success")
  }

  return (
    <>
      <div className={`${localStorageData.length == 0 && showAddedProducts === false ? "container my-5" : "container-fluid my-5 px-4"}`}>
        <div className="row g-2">
          <div className={`${localStorageData.length == 0 && showAddedProducts === false ? "col-12" : "col-12 col-md-8"} `}>
            <div className="card rounded-4 shadow-lg bg-light border-0 pb-5 px-3 px-md-4">
              <h1 className='pt-3 fw-bold pb-5 text-info'>Order Booking</h1>
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col">
                    {/* date and shift input fields */}
                    <div className="row g-2">

                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="shift" className="form-label">Shift <span className="text-danger">*</span></label>
                          <input type="text" className="form-control bg-light" required id="shift" name='shift' onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                    {/* serving area */}
                    <div className="mb-3">
                      <label htmlFor="serving-area" className="form-label">Serving Area <span className="text-danger">*</span></label>
                      <select className="form-select bg-light" id='serving-area' name='serving_area' value={state.serving_area} onChange={handleChange} aria-label="Default select example">
                        <option value="" >Please Select Serving Area</option>
                        <option value="dine_in" >Dine in</option>
                        <option value="take_away" >Take Away</option>
                        <option value="home_delivery" >Home Delivery</option>
                        <option value="party_function" >Party Function</option>
                      </select>
                    </div>
                    {/* customer */}
                    <div className="row my-1 g-2">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="customer" className="form-label">Customer <span className="text-danger">*</span></label>
                          <input type="text" className="form-control bg-light" id="customer" name='customer_name' value={state.customer_name} required onChange={handleChange} placeholder='Enter Customer Name' />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="membership-number" className="form-label ">Membership Number <span className="text-danger">*</span></label>
                          <input type="text" className="form-control bg-light" id="membership-number" name='membership_number' value={state.membership_number} required onChange={handleChange} />
                        </div>


                      </div>

                    </div>

                  </div>

                  {/* it's second column */}
                  <div className="col">
                    <div className="mb-4">
                      <label htmlFor="sales-man" className="form-label">Sales man <span className="text-danger">*</span></label>
                      <input type="text" className="form-control bg-light" id="sales-man" name='sales_man_name' value={state.sales_man_name} onChange={handleChange} required placeholder="Enter Name" />
                    </div>
                    {/* serving unit */}
                    <div className="row mb-4">
                      <div className="col">
                        <label htmlFor="surving-unit" className="form-label">Serving Unit <span className="text-danger">*</span></label>
                        <div className='d-flex '>
                          <input type="number" className="form-control bg-light me-2" id="surving-unit" name='surving_unit' value={state.surving_unit} required onChange={handleChange} />
                          <input type="text" className="form-control bg-light" name='surving_unit_details' placeholder='E.g. H1' value={state.surving_unit_details} required onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="address" className='form-label'>Address</label>
                          <input type="text" name="address" className="form-control bg-light" id="address" value={state.address} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div><hr />
                {/*  */}

                <div className="row mt-5 gx-2">
                  <div className="col-4 col-md-2 ">
                    <label htmlFor="order-type" className="form-label">Order Type</label>
                    <select className="form-select shadow-none" id='order_type' name='order_type' value={state.order_type} onChange={handleOrderType} aria-label="Default select example">
                      <option value="" ></option>
                      <FoodItemOptions />
                    </select>
                  </div>
                  <div className="col-4 col-md-1  ">
                    <label htmlFor="order-code" className="form-label">Code </label>
                    <input type="text" className="form-control shadow-none bg-light" id="order-code" name='order_code' readOnly value={itemCode === undefined ? "" : itemCode} />
                  </div>
                  <div className="col-4 col-md-3">
                    <label htmlFor="item-title" className="form-label">Item Title</label>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      onChange={handleItemPrice}
                      value={state.item_title}
                      id='item-title'
                      size='large'
                      className='w-100 '
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={data.map((items, i) => {
                        return {
                          value: items.item_name,
                          label: items.item_name,
                        }
                      })}
                    />

                  </div>
                  <div className="col-4 col-md-2  mt-4 mt-md-0">
                    <label htmlFor="item-name-urdu" className="form-label">Item Title (Urdu) </label>
                    <input type="text" className="form-control shadow-none bg-light" id="item-name-urdu" name='item_name_urdu' readOnly value={state.item_name_urdu} />
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control shadow-none bg-light" id="quantity" name='quantity' readOnly value={quantity} aria-describedby="basic-addon2" />
                      <span className="input-group-text p-0" id="basic-addon2" onClick={() => handleAmount(+1)}><ArrowDropUpRoundedIcon /></span>
                      <span className="input-group-text p-0" id="basic-addon2" onClick={() => handleAmount(-1)}><ArrowDropDownRoundedIcon /></span>
                    </div>
                  </div>
                  <div className="col mt-4 mt-md-0">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control shadow-none bg-light" id="amount" name='amount' readOnly value={isAmount} />
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

          {localStorageData.length !== 0 || showAddedProducts
            ?
            <div className="col-12 col-md-4">
              <div className="card rounded-4 shadow py-3 px-3 px-md-4 bg-light border-0 printable-table">
                <h1 className='fw-bold text-info'>Added Products</h1><hr />
                <div className="table-responsive">
                  <table className="table table-striped table-hover  ">
                    <thead>
                      <tr>
                        <th scope="col" className='px-3' ></th>
                        <th scope="col" className='pe-5' >Item Title</th>
                        <th scope="col" className='px-3' >Order Type</th>
                        <th scope="col" className='px-3' >Customer Name</th>
                        <th scope="col" className='px-3' >Membership Number</th>
                        <th scope="col" className='px-3' >Serving Area</th>
                        <th scope="col" className='px-3' >Salesman</th>
                        <th scope="col" className='px-3' >Quantity</th>
                        <th scope="col" className='px-3' >Date</th>
                        <th scope="col" className='px-3' >Price</th>
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
                          <td scope="col">{items.customer_name}</td>
                          <td scope="col">{items.membership_number}</td>
                          <td scope="col">{items.serving_area}</td>
                          <td scope="col">{items.sales_man_name}</td>
                          <td scope="col" className='text-center'>{items.quantity}</td>
                          <td scope="col">{items.date}</td>
                          <td scope="col">{"Rs. " + items.amount}</td>
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
                      onAfterPrint={() => handleGoForPrint(localStorageData[0].serving_area)}
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



        <div className="row mt-4">
          <div className="col">
            <div className="card border-0 shadow rounded-4  edit-and-print">
              <h1 className='fw-bold py-3 px-4 text-info'>Dine In</h1>
              <div className="table-responsive">
                <table className="table table-striped  ">
                  <thead>
                    <tr>
                      <th scope="col" className='px-3 text-center' >#</th>
                      <th scope="col" className='px-3 ' >Customer</th>
                      <th scope="col" className='px-0 ' style={{ width: 130 }}>Membership No.</th>
                      <th scope="col" className='px-3 '>Order Type</th>
                      <th scope="col" className='px-3 '>Items</th>
                      <th scope="col" className='pe-5 ' >Serving Unit</th>
                      <th scope="col" className='pe-5 ' >Sales man</th>
                      <th scope="col" className='px-3 ' >Date</th>
                      <th scope="col" className='text-center ' >Print</th>
                      <th scope="col" className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printDineIn.map((data, i) => {
                      return <tr key={i} >
                        <td scope="col " className='text-center' >{i + 1}</td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.customer_name}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col" className='text-center'>{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.membership_number}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.order_type}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.item_title}</li>
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
                            <li className='list-group-item  '>{nested.sales_man_name}</li>
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
                          <div className="row row-cols-1 text-center g-1">
                            <div className="col">
                              <ReactToPrint
                                trigger={() => <div className='btn btn-info btn-sm text-white' onMouseOver={() => setPrintData(data)}>Print</div>}
                                // onAfterPrint={() => handlePrint(data)}
                                content={() => componentRef}
                              />
                              <div className='d-none'>
                                <ComponentToPrint ref={(el) => (componentRef = el)} dataForPrint={printData} time={time} />
                              </div>
                            </div>
                            <div className="col">
                              <button className='btn btn-info btn-sm text-white' onClick={() => handleSaveData(data)} disabled={isSaveLoading}>
                                {isSaveLoading
                                  ? <div className='spinner-border spinner-border-sm'></div>
                                  : "Save"}

                              </button>
                            </div>
                          </div>
                        </td>

                        <td scope="col" >
                          <button className='btn btn-link btn-sm me-2' onClick={() => handleLocalStorageUpdate(data)}><EditTwoToneIcon /></button>
                          <button type="button" className="btn btn-link btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setDelModalValue(data)}><DeleteTwoToneIcon /></button>

                          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header ">
                                  <h1 className="modal-title fs-3 ms-auto fw-bold text-info" id="exampleModalLabel">Delete Items</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Membership Number</th>
                                        <th scope="col">Order Type</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Serving Unit</th>
                                        <th scope="col">Sales Man</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {delModalValue.map((items, i) => {
                                        return <tr key={i}>
                                          <th>{i + 1}</th>
                                          <td>{items.customer_name}</td>
                                          <td className='text-center'>{items.membership_number}</td>
                                          <td>{items.order_type}</td>
                                          <td>{items.item_title}</td>
                                          <td>{items.surving_unit_details}</td>
                                          <td>{items.sales_man_name}</td>
                                          <td>{items.date}</td>
                                          <td>
                                            <button type="button" className="btn btn-link btn-sm" onClick={() => handleDeleteFromPrintable(items.id)}><DeleteTwoToneIcon /></button>
                                          </td>
                                        </tr>
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
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

        <div className="row mt-4">
          <div className="col">
            <div className="card border-0 shadow rounded-4  edit-and-print">
              <h1 className='fw-bold py-3 px-4 text-info'>Party Function</h1>
              <div className="table-responsive">
                <table className="table table-striped  ">
                  <thead>
                    <tr>
                      <th scope="col" className='px-3 text-center' >#</th>
                      <th scope="col" className='px-3 ' >Customer</th>
                      <th scope="col" className='px-0 ' style={{ width: 130 }}>Membership No.</th>
                      <th scope="col" className='px-3 '>Order Type</th>
                      <th scope="col" className='px-3 '>Items</th>
                      <th scope="col" className='pe-5 ' >Serving Unit</th>
                      <th scope="col" className='px-3 ' >Date</th>
                      <th scope="col" className='text-center' >Print</th>
                      <th scope="col" className='text-center` '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printPartyFunction.map((data, i) => {
                      return <tr key={i} >
                        <td scope="col " className='text-center'>{i + 1}</td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.customer_name}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col" className='text-center'>{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.membership_number}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.order_type}</li>
                          </ul>
                        )}
                        </td>
                        <td scope="col">{data.map((nested, i) =>
                          <ul className='w-100  p-0' key={i}>
                            <li className='list-group-item  '>{nested.item_title}</li>
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
                          <div className="row row-cols-1 text-center g-1">
                            <div className="col">
                              <ReactToPrint
                                trigger={() => <div className='btn btn-info btn-sm text-white' onMouseOver={() => setPrintData(data)}>Print</div>}
                                content={() => componentRef}
                              />
                              <div className='d-none'>
                                <ComponentToPrint ref={(el) => (componentRef = el)} dataForPrint={printData} time={time} />
                              </div>
                            </div>
                            <div className="col">
                              <button className='btn btn-info btn-sm text-white' onClick={() => handleSaveData(data)} disabled={isSaveLoading}>
                                {isSaveLoading
                                  ? <div className='spinner-border spinner-border-sm'></div>
                                  : "Save"}
                              </button>
                            </div>
                          </div>
                        </td>

                        <td scope="col" >
                          <button className='btn btn-link btn-sm ' onClick={() => handleLocalStorageUpdate(data)}><EditTwoToneIcon /></button>
                          <button type="button" className="btn btn-link btn-sm me-2" data-bs-toggle="modal" data-bs-target="#party-function" onClick={() => setDelModalValue(data)}><DeleteTwoToneIcon /></button>

                          <div className="modal fade" id="party-function" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header ">
                                  <h1 className="modal-title fs-3 ms-auto fw-bold text-info" id="exampleModalLabel">Delete Items</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Membership Number</th>
                                        <th scope="col">Order Type</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Item Price</th>
                                        <th scope="col">Serving Unit</th>
                                        <th scope="col">Sales Man</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {delModalValue.map((items, i) => {
                                        return <tr key={i}>
                                          <th>{i + 1}</th>
                                          <td>{items.customer_name}</td>
                                          <td className='text-center'>{items.membership_number}</td>
                                          <td>{items.order_type}</td>
                                          <td>{items.item_title}</td>
                                          <td>{items.amount}</td>
                                          <td>{items.surving_unit_details}</td>
                                          <td>{items.sales_man_name}</td>
                                          <td>{items.date}</td>
                                          <td>
                                            <button type="button" className="btn btn-link btn-sm" onClick={() => handleDeleteFromPrintable(items.id)}><DeleteTwoToneIcon /></button>
                                          </td>
                                        </tr>
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
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
