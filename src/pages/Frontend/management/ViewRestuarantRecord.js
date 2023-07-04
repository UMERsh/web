import React, { useEffect, useRef, useState } from 'react'
import FoodItemOptions from 'components/FoodItemOptions'
import { firestore } from 'config/Firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import moment from 'moment/moment'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function ViewRestuarantRecord() {
  const [documents, setDocuments] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMore, setViewMore] = useState(true)
  const durationRef = useRef()

  useEffect(() => {
    gettingData()
  }, [])

  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Order-booking"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
      setFilteredData(array)
    });
    setIsLoading(false)
  }

  //handleChangeDuration
  const handleChangeDuration = e => {
    var currentFullDate = moment().format('YYYY-MM-D')
    e.target.value === "" ? setFilteredData(documents) : setFilteredData(documents.filter(doc => doc.date >= moment().subtract(1, e.target.value).format('YYYY-MM-DD') && doc.date <= currentFullDate))
  }

  // handleOrderType
  const handleOrderType = e => {
    var currentFullDate = moment().format('YYYY-MM-D')
    const gettingValue = e.target.value;
    if (gettingValue === "") {
      setFilteredData(documents)
    } else {
      switch (durationRef.current.value) {
        case "today":
          setFilteredData(documents.filter(doc => doc.date == currentFullDate && doc.order_type === gettingValue))
          break;
        case "week":
          setFilteredData(documents.filter(doc => doc.date >= moment().subtract(1, 'week').format('YYYY-MM-DD') && doc.date <= currentFullDate && doc.order_type === gettingValue))
          break;
        case "month":
          setFilteredData(documents.filter(doc => doc.date >= moment().subtract(1, 'month').format('YYYY-MM-DD') && doc.date <= currentFullDate && doc.order_type === gettingValue))
          break;
        case "year":
          setFilteredData(documents.filter(doc => doc.date >= moment().subtract(1, 'year').format('YYYY-MM-DD') && doc.date <= currentFullDate && doc.order_type === gettingValue))
          break;
        default:
          setFilteredData(documents.filter(doc => doc.order_type === gettingValue))
          break;
      }
    }

  }

  // handleMemberShip
  const handleMemberShip = e => setFilteredData(documents.filter(item => item.customer_name.toLowerCase().includes(e.target.value.toLowerCase())))

  return (
    <>
      <h3 className='fw-bold mb-4 text-info'>Restuarant Record</h3>
      <div className="row mb-3">
        <div className="col text-secondary">
          <h6 >Filters <FilterListTwoToneIcon /></h6>
        </div>
        <div className="col text-end text-secondary pe-3 pe-sm-5">
          <h6 >Total Results: {filteredData.length}</h6>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <select class="form-select" ref={durationRef} onChange={handleChangeDuration} aria-label="Default select example">
            <option value="">Duration..</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <select className="form-select" id='order-type' onChange={handleOrderType} aria-label="Default select example">
            <option value="" >Order Type...</option>
            <FoodItemOptions />
          </select>
        </div>
        <div className="col-10 col-sm-4 col-lg-3 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div class="input-group">
            <span class="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with member name...' onChange={handleMemberShip} />
          </div>
        </div>
      </div>

      {/* show table */}

      {isLoading
        ? <div className='d-flex justify-content-center my-5'>
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary mx-3" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
        </div>
        : <div className={`table-responsive mt-4 ${viewMore ? "table-show-hide" : ""}`}>
          <table class="table table-light table-striped-columns" id='table-id'>
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Membership Number</th>
                <th scope="col">Date</th>
                <th scope="col">Order Type</th>
                <th scope="col">Item Title</th>
                <th scope="col">Salesman Name</th>
                <th scope="col">Serving Area</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            {!filteredData.length
              ? <tbody >
                <tr >
                  <th scope='col' className='border-0 text-center text-info' colSpan="8">No data found</th>
                </tr>
              </tbody>
              : <tbody class="table-group-divider">
                {filteredData.map((data, i) => {
                  return <tr key={i}>
                    <td scope="col">{data.customer_name}</td>
                    <td scope="col">{data.membership_number}</td>
                    <td scope="col">{data.date}</td>
                    <td scope="col">{data.order_type}</td>
                    <td scope="col">{data.item_title}</td>
                    <td scope="col">{data.sales_man_name}</td>
                    <td scope="col">{data.serving_area}</td>
                    <td scope="col">{data.quantity}</td>
                    <th scope="col"><span className='fw-light'>Rs. </span>{data.amount}</th>
                  </tr>
                })}
              </tbody>
            }
          </table>
        </div>

      }
      <div className='text-end mt-4  pe-5'>
        <button className='btn btn-link' onClick={() => setViewMore(!viewMore)}>{viewMore ? "View More" : "View Less"}</button>
      </div>

      <div className="row my-5 g-0 amount-sale" id='unique'>
        <div className="col-6 col-md-4 col-lg-2 py-3  text-center ">
          <h5 className='fw-bold '>Today's Amount</h5>
          <h5 className="text-info fw-bold">Rs. {durationRef.current !== undefined && durationRef.current.value === "today" ? filteredData.reduce((a, v) => a = a + v.amount, 0) : 0}</h5>
        </div>
        <div className="col-6 col-md-4 col-lg-2 py-3  text-center ">
          <h5 className='fw-bold '>Weekly Amount</h5>
          <h5 className="text-info fw-bold">Rs. {durationRef.current !== undefined && durationRef.current.value === "week" ? filteredData.reduce((a, v) => a = a + v.amount, 0) : 0}</h5>
        </div>
        <div className="col-6 col-md-4 col-lg-2 py-3  text-center ">
          <h5 className='fw-bold '>Monthly Amount</h5>
          <h5 className="text-info fw-bold">Rs. {durationRef.current !== undefined && durationRef.current.value === "month" ? filteredData.reduce((a, v) => a = a + v.amount, 0) : 0}</h5>
        </div>
        <div className="col-6 col-md-4 col-lg-2 py-3 text-center ">
          <h5 className='fw-bold '>Yearly Amount</h5>
          <h5 className="text-info fw-bold">Rs. {durationRef.current !== undefined && durationRef.current.value === "year" ? filteredData.reduce((a, v) => a = a + v.amount, 0) : 0}</h5>
        </div>
        <div className="col-6 col-md-4 col-lg-2 py-3  text-center ">
          <h5 className='fw-bold '>Item's Total Amount</h5>
          <h5 className="text-info fw-bold">Rs. {durationRef.current !== undefined && durationRef.current.value === "" ? filteredData.reduce((a, v) => a = a + v.amount, 0) : 0}</h5>
        </div>
        <div className="col-6 col-md-4 col-lg-2 py-3  text-center bg-primary text-light shadow ">
          <h5 className='fw-bold '>Total Amount</h5>
          <h5 className="text-info fw-bold">Rs. {documents.reduce((a, v) => a = a + v.amount, 0)}</h5>
        </div>
      </div>
    </>
  )
}