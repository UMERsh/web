import React, { useEffect, useRef, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import moment from 'moment/moment'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function ViewPayRoll() {
  const [documents, setDocuments] = useState([])
  const [documents1, setDocuments1] = useState([])
  const [documents2, setDocuments2] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filteredData1, setFilteredData1] = useState([])
  const [filteredData2, setFilteredData2] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMore, setViewMore] = useState(true)
  const durationRef = useRef()

  useEffect(() => {
    gettingEmployeeData()
    gettingSaleryData()
    gettingMonthlySalery()
  }, [])

  const gettingEmployeeData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Employe-Info"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
      setFilteredData(array)
    });
    setIsLoading(false)
  }

  const gettingSaleryData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Advance-Salery"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments1(array)
      setFilteredData1(array)
    });
    setIsLoading(false)
  }
  const gettingMonthlySalery = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Monthly-Salery"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments2(array)
      setFilteredData2(array)
    });
    setIsLoading(false)
  }


  //handleChangePerson
  const handleChangeDuration = e => {
    var currentFullDate = moment().format('YYYY-MM-DD,h:mm:ss a')
    e.target.value === "" ? setFilteredData(documents) : setFilteredData(documents.filter(doc => doc.dateCreated >= moment().subtract(e.target.value, "month").format('YYYY-MM-DD,h:mm:ss a') && doc.dateCreated <= currentFullDate))
  }


  // handleMemberShip
  const handleMemberShip = e => setFilteredData(documents.filter(item => item.employe_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.hire_date.includes(e.target.value)))


  //handleChangePerson
  const handleChangeDuration1 = e => {
    var current = moment().format('YYYY-MM-DD,h:mm:ss a')
    e.target.value === "" ? setFilteredData1(documents1) : setFilteredData1(documents1.filter(doc => doc.dateCreated >= moment().subtract(e.target.value, "month").format('YYYY-MM-DD,h:mm:ss a') && doc.dateCreated <= current))
  }


  // handleMemberShip
  const handleMemberShip1 = e => setFilteredData1(documents1.filter(item => item.employe_name.toLowerCase().includes(e.target.value.toLowerCase())))

 //handleChangePerson2
 const handleChangeDuration2 = e => {
  var current = moment().format('YYYY-MM-DD,h:mm:ss a')
  e.target.value === "" ? setFilteredData2(documents2) : setFilteredData2(documents2.filter(doc => doc.dateCreated >= moment().subtract(e.target.value, "month").format('YYYY-MM-DD,h:mm:ss a') && doc.dateCreated <= current))
}

//handleMemberShip2
 const handleMemberShip2 = e => setFilteredData2(documents2.filter(item=>item.employe_name.toLowerCase().includes(e.target.value.toLowerCase())))
  return (
    <>
      <h3 className='fw-bold mb-4 text-info'>Employee Information</h3>
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
          <select className="form-select" ref={durationRef} onChange={handleChangeDuration} aria-label="Default select example">
            <option value="">Duration..</option>
            <option value={1}>Last Month</option>
            <option value={2}>Last 2 Months</option>
            <option value={3}>Last 3 Months</option>
            <option value={4}>Last 4 Months</option>
          </select>
        </div>

        <div className="col-10 col-sm-4 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div className="input-group">
            <span className="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with employee Name or hire date...' onChange={handleMemberShip} />
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
          <table className="table table-light table-striped-columns" id='table-id'>
            <thead>
              <tr>
                <th scope="col" style={{ width: "140px" }}>Employe Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Business Unit</th>
                <th scope="col">Staff Group</th>
                <th scope="col">Hire Date</th>
                <th scope="col">Phone</th>
                <th scope="col">City</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            {!filteredData.length
              ? <tbody >
                <tr >
                  <th scope='col' className='border-0 text-center text-info' colSpan="8">No data found</th>
                </tr>
              </tbody>
              : <tbody className="table-group-divider">
                {filteredData.map((data, i) => {
                  return <tr key={i}>
                    <td scope="col">{data.employe_name}</td>
                    <td scope="col">{data.designation}</td>
                    <td scope="col">{data.business_unit}</td>
                    <td scope="col">{data.staff_group}</td>
                    <td scope="col">{data.hire_date}</td>
                    <td scope="col">{data.phone_no}</td>
                    <td scope="col">{data.city}</td>
                    <td scope="col">{data.dateCreated}</td>
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


      <hr /><br />







      {/* advance salery */}
      <h3 className='fw-bold mb-4 text-info'>Advance Salary Record</h3>
      <div className="row mb-3">
        <div className="col text-secondary">
          <h6 >Filters <FilterListTwoToneIcon /></h6>
        </div>
        <div className="col text-end text-secondary pe-3 pe-sm-5">
          <h6 >Total Results: {filteredData1.length}</h6>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <select className="form-select"  onChange={handleChangeDuration1} aria-label="Default select example">
            <option value="">Duration..</option>
            <option value={1}>Last Month</option>
            <option value={2}>Last 2 Months</option>
            <option value={3}>Last 3 Months</option>
            <option value={4}>Last 4 Months</option>
          </select>
        </div>

        <div className="col-10 col-sm-4 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div className="input-group">
            <span className="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with employee Name or hire date...' onChange={handleMemberShip1} />
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
          <table className="table table-light table-striped-columns" id='table-id'>
            <thead>
              <tr>
                <th scope="col" style={{ width: "140px" }}>Employe Name</th>
                <th scope="col">Designation</th>
                <th scope="col">business_unit</th>
                <th scope="col">Monthly Salery</th>
                <th scope="col">Advance Salary</th>
                <th scope="col">Ex Salary</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            {!filteredData1.length
              ? <tbody >
                <tr >
                  <th scope='col' className='border-0 text-center text-info' colSpan="8">No data found</th>
                </tr>
              </tbody>
              : <tbody className="table-group-divider">
                {filteredData1.map((data, i) => {
                  return <tr key={i}>
                    <td scope="col">{data.employe_name}</td>
                    <td scope="col">{data.designation}</td>
                    <td scope="col">{data.business_unit}</td>
                    <td scope="col">{data.monthly_salery}</td>
                    <td scope="col">{data.advance_salery}</td>
                    <td scope="col">{data.ex_salery}</td>
                    <td scope="col">{data.dateCreated}</td>
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

     
     
      {/* Monthly salery */}
      <h3 className='fw-bold mb-4 text-info'>Monthly Salary Record</h3>
      <div className="row mb-3">
        <div className="col text-secondary">
          <h6 >Filters <FilterListTwoToneIcon /></h6>
        </div>
        <div className="col text-end text-secondary pe-3 pe-sm-5">
          <h6 >Total Results: {filteredData2.length}</h6>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <select className="form-select"  onChange={handleChangeDuration2} aria-label="Default select example">
            <option value="">Duration..</option>
            <option value={1}>Last Month</option>
            <option value={2}>Last 2 Months</option>
            <option value={3}>Last 3 Months</option>
            <option value={4}>Last 4 Months</option>
          </select>
        </div>

        <div className="col-10 col-sm-4 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div className="input-group">
            <span className="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with employee Name or hire date...' onChange={handleMemberShip2} />
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
          <table className="table table-light table-striped-columns" id='table-id'>
            <thead>
              <tr>
                <th scope="col" style={{ width: "140px" }}>Business Unit </th>
                <th scope="col">Employe Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Month</th>
                <th scope="col"> Salary</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            {!filteredData2.length
              ? <tbody >
                <tr >
                  <th scope='col' className='border-0 text-center text-info' colSpan="8">No data found</th>
                </tr>
              </tbody>
              : <tbody className="table-group-divider">
                {filteredData2.map((data, i) => {
                  return <tr key={i}>
                    <td scope="col">{data.business_unit}</td>
                    <td scope="col">{data.employe_name}</td>
                    <td scope="col">{data.designation}</td>
                    <td scope="col">{data.month}</td>
                    <td scope="col">{data.salery}</td>
                    <td scope="col">{data.dateCreated}</td>
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
