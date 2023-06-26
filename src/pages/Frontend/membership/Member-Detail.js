import { firestore } from 'config/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MemberDetail() {
    const { memberNumber } = useParams()
    const [document, setDocument] = useState({})

    useEffect(() => {
        gettingData()
    }, [])

    const gettingData = async () => {
        const q = query(collection(firestore, "Members"), where("membership_no", "==", memberNumber));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setDocument(doc.data())
        });

        // setIsLoading(false)
    }
    console.log(document);

    return (
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

            <div className="row my-5">
                <div className="col">
                    <div><b>Email Address:</b> {document.email}</div>
                </div>
                <div className="col">
                    <div><b>Marital Status:</b> {document.martial_status}</div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col">
                    <div><b>Date:</b> {document.dateCreated}</div>
                </div>
                <div className="col">
                    <div><b>Member's Fee:</b> {document.member_fee}</div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col">
                    <div><b>Address: </b>{document.address}</div>
                </div>
            </div>

            <div className="row text-end my-4">
                <div className="col">
                    <h4>Total Payable Fee: <span className='text-info'>{document.totalFee}</span></h4>
                </div>
            </div>


        </div>
    )
}
