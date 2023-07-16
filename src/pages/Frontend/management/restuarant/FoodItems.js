import { firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { collection, collectionGroup, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import React, { useEffect, useRef, useState } from 'react'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FoodItemOptions from 'components/FoodItemOptions';

export default function FoodItems(props) {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessingDelete, setIsProcessingDelete] = useState(false)
    const [oldItem, setOldItem] = useState({})
    const { userRole } = useAuthContext()
    const [viewMore, setViewMore] = useState(true)


    const item_type_ref = useRef()
    const item_name_ref = useRef()
    const item_price_ref = useRef()


    useEffect(() => {
        gettingData()
    }, [props.counting])

    const gettingData = async () => {
        var array = []

        const querySnapshot = await getDocs(collection(firestore, "Menu"));
        querySnapshot.forEach((doc) => {
            let data = { firebaseId: doc.id, ...doc.data() }
            array.push(data)
            setDocuments(array)
        });
        setIsLoading(false)
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setOldItem(s => ({ ...s, [name]: value }))
    }


    // handle Update
    const handleUpdate = async () => {

        let { item_type, item_name, item_price } = oldItem
        item_name = item_name.trim()
        item_price = item_price.trim()

        if (item_type === "") {
            return window.toastify("Please Select Item Type", "error")
        }
        if (!item_name.length) {
            return window.toastify("Please Enter Item Name Correctly", "error")
        }
        if (!item_price.length) {
            return window.toastify("Please Enter Item Price Correctly", "error")
        }

        const appiUrl = `https://api.mymemory.translated.net/get?q=${item_name}&langpair=en-GB|ur-PK`
        setIsProcessing(true)
        fetch(appiUrl).then((res) => res.json()).then(async (data) => {
            let item_name_urdu = data.responseData.translatedText

            let updatedData = {
                item_type,
                item_name,
                item_price,
                item_name_urdu,
                updatedBy: userRole,
                dateUpdated: serverTimestamp()
            }
            await setDoc(doc(firestore, "Menu", oldItem.firebaseId), updatedData, { merge: true });
            gettingData()
            window.toastify("Updated Successfully", "success")
            setOldItem(oldItem)
            setIsProcessing(false)
        })
    }


    //delete
    const handleDelete = async (get) => {
        setIsProcessingDelete(true)
        await deleteDoc(doc(firestore, "Menu", get));
        gettingData()
        window.toastify("Item has been deleted successfully", "success")
        setIsProcessingDelete(false)
    }


    return (
        <>
            <div className="row pb-4">
                {isLoading
                    ? <div className='d-flex justify-content-center my-3'>
                        <div className="spinner-grow text-primary" role="status"></div>
                        <div className="spinner-grow text-secondary mx-3" role="status"></div>
                        <div className="spinner-grow text-success" role="status"></div>
                    </div>
                    : <div className="col ">
                        <div className="card p-4 shadow-lg border-0 bg-light">
                            {!documents.length
                                ? <div>
                                    <p className='text-secondary'>No items have been added yet</p>
                                </div>
                                : <div className={`table-responsive ${viewMore ? "table-show-hide" : ""}`} >
                                    <table className="table " >
                                        <thead>
                                            <tr className='bg-primary text-white'>
                                                <th scope="col">#</th>
                                                <th scope="col" style={{ width: 350 }}>Item Title</th>
                                                <th scope="col">Item Price</th>
                                                <th scope="col">Item Type</th>
                                                <th scope="col" className='text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documents.map((data, i) => {
                                                return <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{data.item_name}</td>
                                                    <td>{"Rs. " + data.item_price}</td>
                                                    <td>{data.item_type}</td>
                                                    <td className='text-center'>
                                                        <button type="button" className="btn btn-sm btn-link" data-bs-toggle="modal" data-bs-target="#updateModalProduct" onClick={() => { setOldItem(data) }}><EditTwoToneIcon /></button>
                                                        <div className="modal fade" id="updateModalProduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Food Item</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body text-start">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="item-type " className=' mb-1 fw-bold'>Item Type</label>
                                                                            <select className="form-select" id='item-type' name='item_type' ref={item_type_ref} value={oldItem.item_type} onChange={handleChange} aria-label="Default select example">
                                                                                <FoodItemOptions />
                                                                            </select>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="item-name" className="form-label">Item Name</label>
                                                                            <input type="text" className="form-control" id="item-name" name='item_name' ref={item_name_ref} value={oldItem.item_name !== undefined ? oldItem.item_name : ""} onChange={handleChange} placeholder="e.g: French Fries" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="item-price" className="form-label">Price</label>
                                                                            <input type="text" className="form-control" id="item-price" name='item_price' ref={item_price_ref} value={oldItem.item_price !== undefined ? oldItem.item_price : ""} onChange={handleChange} placeholder="e.g: 100" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" className="btn btn-primary px-5" disabled={isProcessing} onClick={handleUpdate} data-bs-dismiss="modal">
                                                                            {isProcessing
                                                                                ? <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                                                                : "Done"
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <button className='btn btn-link btn-sm me-2' ><EditTwoToneIcon /></button> */}
                                                        <button className='btn btn-link btn-sm' disabled={isProcessingDelete} onClick={() => handleDelete(data.firebaseId)}>
                                                            {isProcessingDelete
                                                                ? <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                                                                : <DeleteTwoToneIcon />
                                                            }

                                                        </button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                        <div className='text-end mt-4  pe-5'>
                            <button className='btn btn-link' onClick={() => setViewMore(!viewMore)}>{viewMore ? "View More" : "View Less"}</button>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
