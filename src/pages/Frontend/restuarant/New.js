import React, { useEffect, useState } from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const ComponentToPrint = React.forwardRef((props, ref) => {

    const { time } = props
    var data = props.dataForPrint
    // console.log(data[0].customer_name);

    return (
        <>
            <div className="container m-5" ref={ref}>
                <h2>NBC Burewala</h2>
                <p><u>COMPLETE ORDER</u></p>
                <div className="row mt-5">
                    <div className="col"><b>Customer Name: </b>{!data[0] ? "" : data[0].customer_name}</div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Membership Number: </b>{!data[0] ? "" : data[0].membership_number}</div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Area: </b>{!data[0] ? "" : data[0].dine_in}</div>
                    <div className="col"><b>Unit: </b>{!data[0] ? "" : data[0].surving_unit}</div>
                </div>
                <div className="row mt-3 ">
                    <div className="col"><b>Sales Man: </b>{!data[0] ? "" : data[0].sales_man_name}</div>
                    <div className="col"><b>Shift: </b>{!data[0] ? "" : data[0].shift}</div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Date: </b>{!data[0] ? "" : data[0].date}</div>
                    <div className="col"><b>Time: </b>{time}</div>
                </div>

                <table className="table mt-3" >
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((items, i) => {
                            return <tr key={i}>
                                <th scope="row">{items.order_code}</th>
                                <td>{items.item_title}</td>
                                <td>{items.quantity}</td>
                                <td>{items.amount}</td>
                            </tr>
                        })}
                        <tr>
                            <td colSpan="3"><b>Total Price: </b></td>
                            <td >{data.reduce((a, v) => a = a + v.amount, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>



    );
});