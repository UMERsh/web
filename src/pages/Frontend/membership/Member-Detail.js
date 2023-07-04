import { firestore } from 'config/Firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MemberDetail() {
    const { memberNumber } = useParams()
    const [document, setDocument] = useState({})
    const [updateAmount, setUpdateAmount] = useState()
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)

    useEffect(() => {
        gettingData()
    }, [])

    const gettingData = async () => {
        const q = query(collection(firestore, "Members"), where("membership_no", "==", memberNumber));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setDocument(doc.data())
        });

    }


    const handleUpdateAmount = async (e) => {
        e.preventDefault()
        let amountUpdate = Number(updateAmount)
        let updatedValue = document.totalFee - amountUpdate;

        let updatedData = {
            totalFee: updatedValue,
            dateUpdated: moment().format('YYYY-MM-DD,h:mm:ss a')
        }
        setIsUpdateLoading(true)

        try {
            const washingtonRef = doc(firestore, "Members", document.membership_no);
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, updatedData, { merge: true })
                .then(() => {
                    setIsUpdateLoading(false)
                    gettingData()
                    window.toastify("Member's Data Updated Successfully", "success")
                    setUpdateAmount(0)
                })
        } catch (error) {
            window.toastify(error.message, "error")
            setIsUpdateLoading(false)
        }
    }



    return (
        <>
            <div className="container border rounded my-5 py-5 px-4">
                <h2 className="text-center fw-bold text-info">{document.member_name}</h2>
                <div className="row my-5">
                    <div className="col">
                        <div><b>Member Name:</b> {document.member_name}</div>
                    </div>
                    <div className="col">
                        <div><b>Father Name:</b> {document.father_name}</div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col">
                        <div><b>CNIC Number:</b> {document.cnic_no}</div>
                    </div>
                    <div className="col">
                        <div><b>MemberShip Number:</b> {document.membership_no}</div>
                        {/* <div><b>Email Address:</b> usman@gmail.com</div> */}
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 my-5">
                    <div className="col">
                        <div><b>Email Address:</b> {document.email}</div>
                    </div>
                    <div className="col mt-5 mt-md-0">
                        <div><b>Marital Status:</b> {document.martial_status}</div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col">
                        <div><b>Date:</b> {document.dateCreated}</div>
                    </div>
                    <div className="col">
                        <div><b>Date Modified:</b> {document.dateModified}</div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col">
                        <div><b>Address: </b>{document.address}</div>
                    </div>
                    <div className="col">
                        <div><b>Member's Monthly Fee:</b> {document.member_fee}</div>
                    </div>
                </div>

                <div className="row text-end my-4">
                    <div className="col">
                        <h4>Total Payable Fee: <span className='text-info'>{document.totalFee}</span></h4> 
                    </div>
                </div>

                <div className="text-danger my-3"><b>Note:</b> If the member has paid the amount then update the total amount of the member here</div>
                <form onSubmit={handleUpdateAmount}>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" value={updateAmount} placeholder='E.g. 500' onChange={e => setUpdateAmount(e.target.value)} required />
                        <label htmlFor="floatingInput" className='text-secondary'>Enter the amount to be deducted in Total E.g. 500</label>
                    </div>
                    <button className='btn btn-info text-white' disabled={isUpdateLoading}>
                        {isUpdateLoading
                            ? <div>
                                <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                                <div className="spinner-grow spinner-grow-sm text-info mx-2" role="status"></div>
                                <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                            </div>
                            : "Updata Data"}
                    </button>
                </form>
            </div>
        </>
    )
}
