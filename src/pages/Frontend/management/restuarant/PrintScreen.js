import React from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components

export const PrintScreen = React.forwardRef((props, ref) => {
    var data = props.dataForPrint

    return (
        <>
            <div className="container my-5" style={{ paddingLeft: 40, paddingRight: 40 }} ref={ref}>
                <h2>Restuarant Record Bill</h2>
                <div className="row mt-5">
                    <div className="col"><b>Total Amount: </b>{data.reduce((a, v) => a = a + v.amount, 0)}</div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Total Items: </b>{data.length}</div>
                </div>

                <table className="table mt-3" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Membership Number</th>
                            <th scope="col">Order Type</th>
                            <th scope="col">Item Title</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Salesman Name</th>
                            <th scope="col">Serving Area</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((items, i) => {
                            return <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{items.customer_name}</td>
                                <td className="text-center">{items.membership_number}</td>
                                <td>{items.order_type}</td>
                                <td>{items.item_title}</td>
                                <td>{items.quantity}</td>
                                <td>{items.sales_man_name}</td>
                                <td>{items.serving_area}</td>
                                <td>{items.date}</td>
                                <td>{items.amount}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>



    );
});