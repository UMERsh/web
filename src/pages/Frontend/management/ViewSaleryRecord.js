import React, { useEffect, useRef, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import moment from 'moment/moment'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function ViewSaleryRecord() {
  const [documents, setDocuments] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMore, setViewMore] = useState(true)
  const durationRef = useRef()

  useEffect(() => {
    gettingData()
    gettingUsers()
  }, [])

  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Salaries"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
      setFilteredData(array)
    });
    setIsLoading(false)
  }


  const gettingUsers = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setUsers(array)
    });
  }



  //handleChangePerson
  const handleChangePerson = e => {
    e.target.value === "" ? setFilteredData(documents) : setFilteredData(documents.filter(doc => doc.person_name == e.target.value))
  }


  // handleMemberShip
  const handleMemberShip = e => setFilteredData(documents.filter(item => item.salery_month.includes(e.target.value.toLowerCase())))



  return (
    <>
      <h3 className='fw-bold mb-4 text-info'>Salary Record</h3>
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
          <select className="form-select" ref={durationRef} onChange={handleChangePerson} aria-label="Default select example">
            <option value="">Person Name..</option>
            {users.map((item, i) => {
              return <option value={item.user_name} key={i}>{item.user_name}</option>
            })}
          </select>
        </div>

        <div className="col-10 col-sm-4 col-lg-3 mx-auto mx-md-0 ms-md-auto mt-4 mt-sm-0">
          <div className="input-group">
            <span className="input-group-text bg-white text-secondary border-0 border-bottom border-secondary rounded-0 px-0"><SearchTwoToneIcon /></span>
            <input type="search" className='form-control border-0 border-bottom border-secondary shadow-none rounded-0' placeholder='Search with salary month...' onChange={handleMemberShip} />
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
                <th scope="col">Person Name</th>
                <th scope="col">Salary Month</th>
                <th scope="col">Salary</th>
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
              : <tbody className="table-group-divider">
                {filteredData.map((data, i) => {
                  return <tr key={i}>
                    <td scope="col">{data.person_name}</td>
                    <td scope="col">{data.salery_month}</td>
                    <td scope="col">{data.salery}</td>
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