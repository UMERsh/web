import React, { useEffect, useRef, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import moment from 'moment/moment'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function ViewConstructionRecord() {
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
    const querySnapshot = await getDocs(collection(firestore, "Construction"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
      setFilteredData(array)
    });
    setIsLoading(false)
  }

  //handleChangeDuration
  const handleChangeDuration = e => {
    var currentFullDate = moment().format('YYYY-MM-DD,h:mm:ss a')
    e.target.value === "" ? setFilteredData(documents) : setFilteredData(documents.filter(doc => doc.dateCreated >= moment().subtract(e.target.value, "month").format('YYYY-MM-DD,h:mm:ss a') && doc.dateCreated <= currentFullDate))
  }



  // handleMemberShip
  const handleMemberShip = e => setFilteredData(documents.filter(item => item.material_type.toLowerCase().includes(e.target.value.toLowerCase())))



  return (
    <>
      <h3 className='fw-bold mb-4 text-info'>Construction Record</h3>
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

        <div className="col-10 col-sm-4 col-lg-3 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div class="input-group">
            <span class="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with material type...' onChange={handleMemberShip} />
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
                <th scope="col">Material Type</th>
                <th scope="col">Material Quantity</th>
                <th scope="col">Material Amount</th>
                <th scope="col">Total Amount</th>
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
                    <td scope="col">{data.material_type}</td>
                    <td scope="col">{data.material_quantity}</td>
                    <td scope="col">{data.material_amount}</td>
                    <td scope="col">{data.total_amount}</td>
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