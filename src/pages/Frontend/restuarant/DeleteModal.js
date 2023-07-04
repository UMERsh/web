import React, { useEffect, useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export default function DeleteModal({ getData }) {
    const [documents, setDocuments] = useState([])
    // const [dummyToggle, setDummyToggle] = useState(false)

    useEffect(() => {
        let previousLocalPrintableStorage = JSON.parse(localStorage.getItem("printable")) || []
        setDocuments(previousLocalPrintableStorage)
    }, [])

    // handleLocalStorageDelete
    const handleLocalStorageDelete = (get) => {
        let filteredItems = documents.filter((oldpro) => {
            return oldpro.id !== get
        })
        localStorage.setItem("printable", JSON.stringify(filteredItems))
        // setDummyToggle(!dummyToggle)
        window.toastify("Removed Successfully", "success")

    }

    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-3 ms-auto fw-bold text-info" id="exampleModalLabel">Delete Items</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Membership Number</th>
                                        <th scope="col">Order Type</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Serving Unit</th>
                                        <th scope="col">Sales Man</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getData.map((items, i) => {
                                        return <tr key={i}>
                                            <th>{i + 1}</th>
                                            <td>{items.customer_name}</td>
                                            <td className='text-center'>{items.membership_number}</td>
                                            <td>{items.order_type}</td>
                                            <td>{items.item_title}</td>
                                            <td>{items.surving_unit_details}</td>
                                            <td>{items.sales_man_name}</td>
                                            <td>{items.date}</td>
                                            <td>
                                                <button type="button" class="btn btn-link btn-sm" onClick={() => handleLocalStorageDelete(items.id)}><DeleteTwoToneIcon /></button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
