import React, { useEffect, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite'
import { Link } from 'react-router-dom'
import MemberDetail from './Member-Detail'
import RefreshData from './Refresh-Data'

export default function TotalMembers() {
  const [documents, setDocuments] = useState([])
  const [delMemberNo, setDelMemberNo] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    gettingData()
  }, [])


  const gettingData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "Members"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      setDocuments(array)
    });
    setIsLoading(false)
  }


  // handle remove
  const handleRemove = async () => {
    setIsProcessingDelete(true)
    try {
      await deleteDoc(doc(firestore, "Members", delMemberNo))
        .then(() => {
          window.toastify("Member removed successfully", "success")
          setIsProcessingDelete(false)
          gettingData()
        })
    } catch (error) {
      window.toastify(error.message, "error")
      setIsProcessingDelete(false)
    }
  }


  return (
    <>
      <div className="container py-5">
        <RefreshData />
     
        <h1 className='fw-bold  pb-3 text-info'>Total Members___</h1>
        {isLoading
          ? <div className='d-flex justify-content-center my-5'>
            <div className="spinner-grow text-primary" role="status"></div>
            <div className="spinner-grow text-secondary mx-3" role="status"></div>
            <div className="spinner-grow text-success" role="status"></div>
          </div>
          : <>
            {documents.map((items, i) => {
              return <div className="row shadow-lg text-center rounded overflow-hidden d-flex align-items-center mt-3" key={i}>
                <div className="col-6 mb-4 mb-sm-0 col-md-2 col-lg-1 py-1">
                  <img src={items.profile_pic === "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" : items.profile_pic} className='w-100 rounded' height="100px" alt="" />
                </div>
                <div className="col-6 mb-4 mb-sm-0 col-sm-3 ">
                  <h6>{items.member_name}</h6>
                </div>
                <div className="col ">
                  <div><b>Membership No:</b> {items.membership_no}</div>
                </div>
                <div className="col ">
                  <div><b>Membership Fee:</b> {items.member_fee}</div>
                </div>
                <div className="col ">
                  <div><b>Date:</b> {items.dateCreated}</div>
                </div>
                <div className="col">
                  <Link className="btn btn-sm btn-link text-info" to={`/membership/member-details/${items.membership_no}`}>View Details</Link>

                  {/* remove button */}
                  <button type="button" className="btn btn-sm btn-link text-danger" data-bs-toggle="modal" data-bs-target="#removeMember" onClick={() => setDelMemberNo(items.membership_no)}>Remove</button>
                  <div className="modal fade" id="removeMember" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      {isProcessingDelete === true
                        ? <div className="modal-content py-5 ">
                          <div className="spinner-border text-info mx-auto p-4 p-md-5" role="status"></div>
                        </div>
                        : <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body text-start">
                            <h6>Warning! If you will remove then all data of member will be removed. Are you sure?</h6>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={handleRemove}>Remove</button>
                          </div>
                        </div>
                      }
       

                    </div>
                  </div>
                </div>
              </div>
            })}
          </>
        }
      </div>
     
    </>
  )
}
