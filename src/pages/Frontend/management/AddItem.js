import { firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import React, { useState } from 'react'
import FoodItems from './FoodItems'
import ProductItems from './ProductItems'

const intitalState = {
    item_type: "",
    item_name: "",
    item_price: ""
}

export default function AddItem() {
    const [state, setState] = useState(intitalState)
    const [isLoading, setLoading] = useState(false)
    const [count, setCount] = useState(false)

    const { userRole } = useAuthContext()

    // handle Change
    const handleChange = (e) => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    // handleSubmit
    const handleSubmit = async () => {
        let { item_type, item_name, item_price } = state
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

        let itemData = {
            item_type, item_name, item_price,
            dateCreated: serverTimestamp(),
            createdBy: userRole
        }
        setLoading(true)
        try {
            await setDoc(doc(firestore, "Items", window.getRandomId()), itemData)
            window.toastify("Item added successfully", "success")
            setCount(!count)
        } catch (e) {
            window.toastify("Something went wrong", "error")
        }
        setLoading(false)
        setState(intitalState)
    }


    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="text-end">
                        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Item
                        </button>
                    </div>
                    <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">New Products</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div class="mb-3">
                                        <label htmlFor="item-type " className=' mb-1 fw-bold'>Item Type</label>
                                        <select class="form-select" id='item-type' name='item_type' value={state.item_type} onChange={handleChange} aria-label="Default select example">
                                            <option value="" ></option>
                                            <option value="food">food</option>
                                            <option value="product">product</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="item-name" class="form-label">Item Name</label>
                                        <input type="text" class="form-control" id="item-name" name='item_name' value={state.item_name} onChange={handleChange} placeholder="e.g: French Fries" />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="item-price" class="form-label">Price</label>
                                        <input type="text" class="form-control" id="item-price" name='item_price' value={state.item_price} onChange={handleChange} placeholder="e.g: 100" />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary px-5" disabled={isLoading} onClick={handleSubmit}>
                                        {isLoading
                                            ? <div class="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                            : "Done"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FoodItems counting={count} />
            <ProductItems counting={count} />
        </>
    )
}
