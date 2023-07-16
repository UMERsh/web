import { firestore } from 'config/Firebase'
import { useAuthContext } from 'context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import React, { useState } from 'react'
import FoodItems from './FoodItems'
import FoodItemOptions from 'components/FoodItemOptions'

const intitalState = {
    item_type: "",
    item_name: "",
    // item_name_urdu: "",
    item_price: ""
}

export default function AddFoodItem() {
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

        var { item_type, item_name, item_price,} = state
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
        fetch(appiUrl).then((res) => res.json()).then(async (data) => {
            let item_name_urdu = data.responseData.translatedText
            let itemData = {
                item_type, item_name, item_price, item_name_urdu,
                dateCreated: serverTimestamp(),
                createdBy: userRole,
                code: Math.random().toString().slice(2, 7)
            }
            setLoading(true)
            try {
                await setDoc(doc(firestore, "Menu", window.getRandomId()), itemData)
                window.toastify("Item added successfully", "success")
                setCount(!count)
            } catch (e) {
                window.toastify("Something went wrong", "error")
            }
            setLoading(false)
            setState(intitalState)
        })

    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="text-end">
                        <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Food
                        </button>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Food</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label htmlFor="item-type " className=' mb-1 fw-bold'>Item Type</label>
                                        <select className="form-select" id='item-type' name='item_type' value={state.item_type} onChange={handleChange} aria-label="Default select example">
                                            <option value="" ></option>
                                            <FoodItemOptions />
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="item-name" className="form-label">Item Name</label>
                                        <input type="text" className="form-control" id="item-name" name='item_name' value={state.item_name} onChange={handleChange} placeholder="e.g: French Fries" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="item-price" className="form-label">Price</label>
                                        <input type="number" className="form-control" id="item-price" name='item_price' value={state.item_price} onChange={handleChange} placeholder="e.g: 100" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary px-5" disabled={isLoading} onClick={handleSubmit}>
                                        {isLoading
                                            ? <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
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
        </>
    )
}
