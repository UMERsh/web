import React, { useEffect, useRef, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import moment from 'moment/moment'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function ViewUtilityBillsRecord() {
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
    const querySnapshot = await getDocs(collection(firestore, "Utility-Bills"));
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
    e.target.value === "" ? setFilteredData(documents) : setFilteredData(documents.filter(doc => doc.bill_month >= moment().subtract(e.target.value, "month").format('YYYY-MM-DD') && doc.bill_month <= currentFullDate))
  }

  // handleOrderType
  const handleOrderType = e => {
    var currentFullDate = moment().format('YYYY-MM-D')
    const gettingValue = e.target.value;
    if (gettingValue === "") {
      setFilteredData(documents)
    } else {
      switch (durationRef.current.value) {
        case '1':
          setFilteredData(documents.filter(doc => doc.bill_month >= moment().subtract(1, 'month').format('YYYY-MM-DD') && doc.bill_month <= currentFullDate && doc.bill_type === gettingValue))
          break;
        case '2':
          setFilteredData(documents.filter(doc => doc.bill_month >= moment().subtract(2, 'month').format('YYYY-MM-DD') && doc.bill_month <= currentFullDate && doc.bill_type === gettingValue))
          break;
        case '3':
          setFilteredData(documents.filter(doc => doc.bill_month >= moment().subtract(3, 'month').format('YYYY-MM-DD') && doc.bill_month <= currentFullDate && doc.bill_type === gettingValue))
          break;
        case "4":
          setFilteredData(documents.filter(doc => doc.bill_month >= moment().subtract(4, 'month').format('YYYY-MM-DD') && doc.bill_month <= currentFullDate && doc.bill_type === gettingValue))
          break;
        default:
          setFilteredData(documents.filter(doc => doc.bill_type === gettingValue))
          break;
      }
    }

  }

  // handleMemberShip
  const handleMemberShip = e => setFilteredData(documents.filter(item => item.bill_month.includes(e.target.value.toLowerCase())))



  return (
    <>
      <h3 className='fw-bold mb-4 text-info'>Utility Bills Record</h3>
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
            <option value={1}>Last Month</option>
            <option value={2}>Last 2 Months</option>
            <option value={3}>Last 3 Months</option>
            <option value={4}>Last 4 Months</option>
          </select>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <select className="form-select" id='order-type' onChange={handleOrderType} aria-label="Default select example">
            <option value="" >Bill Type...</option>
            <option value="mepco" >MEPCO</option>
            <option value="ptcl" >PTCL</option>
            <option value="gas" >Gas</option>
          </select>
        </div>
        <div className="col-10 col-sm-4 col-lg-3 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div class="input-group">
            <span class="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with bill month...' onChange={handleMemberShip} />
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
                <th scope="col">Bill Month</th>
                <th scope="col">Bill Type</th>
                <th scope="col">Bill Price</th>
                <th scope="col">Date Created</th>
                <th scope="col">Created By</th>
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
                    <td scope="col">{data.bill_month}</td>
                    <td scope="col">{data.bill_type}</td>
                    <td scope="col">{data.bill_price}</td>
                    <td scope="col">{data.dateCreated}</td>
                    <td scope="col">{data.createdBy.email}</td>
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
    </>
  )
}