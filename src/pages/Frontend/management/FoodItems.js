import { firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { collection, collectionGroup, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import React, { useEffect, useRef, useState } from 'react'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const intitalState = {
    item_type: "",
    item_name: "",
    item_price: ""
}

export default function FoodItems(props) {
    const [state, setState] = useState(intitalState)
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessingDelete, setIsProcessingDelete] = useState(false)
    const [oldItem, setOldItem] = useState({})
    const { userRole, userData } = useAuthContext()


    const item_type_ref = useRef()
    const item_name_ref = useRef()
    const item_price_ref = useRef()


    useEffect(() => {
        gettingData()
    }, [props.counting])

    const gettingData = async () => {
        var array = []
        const q = query(collection(firestore, "Items"), where("item_type", "==", "food"));
        const querySnapshot = await getDocs(q);
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


        let updatedData = {
            item_type,
            item_name,
            item_price,
            updatedBy: userRole,
            dateUpdated: serverTimestamp()
        }
        setIsProcessing(true)
        await setDoc(doc(firestore, "Items", oldItem.firebaseId), updatedData, { merge: true });
        gettingData()
        setIsProcessing(false)
    }


    //delete
    const handleDelete = async (get) => {
        console.log(get);
        setIsProcessingDelete(true)
        await deleteDoc(doc(firestore, "Items", get));
        gettingData()
        setIsProcessingDelete(false)
        window.toastify("Todo has been deleted successfully", "success")
    }


    return (
        <>
            <div className="row ">
                <div className="col">
                    <h3>Food Items</h3>
                </div>
            </div><hr />
            <div className="row">
                {isLoading
                    ? <div className='d-flex justify-content-center my-3'>
                        <div class="spinner-grow text-primary" role="status"></div>
                        <div class="spinner-grow text-secondary mx-3" role="status"></div>
                        <div class="spinner-grow text-success" role="status"></div>
                    </div>
                    : <div className="col ">
                        {!documents.length
                            ? <div>
                                <p className='text-secondary'>No items have been added yet</p>
                            </div>
                            : <div className='table-responsive'>

                                <table class="table">
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
                                                    <div class="modal fade" id="updateModalProduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Products</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body text-start">
                                                                    <div class="mb-3">
                                                                        <label htmlFor="item-type " className=' mb-1 fw-bold'>Item Type</label>
                                                                        <select class="form-select" id='item-type' name='item_type' ref={item_type_ref} defaultValue={oldItem.item_type} onChange={handleChange} aria-label="Default select example">
                                                                            <option value="" ></option>
                                                                            <option value="food">food</option>
                                                                            <option value="product">product</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="item-name" class="form-label">Item Name</label>
                                                                        <input type="text" class="form-control" id="item-name" name='item_name' ref={item_name_ref} defaultValue={oldItem.item_name} onChange={handleChange} placeholder="e.g: French Fries" />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="item-price" class="form-label">Price</label>
                                                                        <input type="text" class="form-control" id="item-price" name='item_price' ref={item_price_ref} defaultValue={oldItem.item_price} onChange={handleChange} placeholder="e.g: 100" />
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary px-5" disabled={isProcessing} onClick={handleUpdate}>
                                                                        {isProcessing
                                                                            ? <div class="spinner-grow spinner-grow-sm text-light" role="status"></div>
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
                                                            ? <div class="spinner-border spinner-border-sm text-dark" role="status"></div>
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
                }

            </div>

        </>
    )
}
