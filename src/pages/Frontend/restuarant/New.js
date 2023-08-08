import React from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const ComponentToPrint = React.forwardRef((props, ref) => {

    const { time } = props
    var data = props.dataForPrint
    var salesTax = 0
    var totalBill = 0

    if (data[0] !== undefined && data[0].serving_area === "dine_in") {
        const tax = 6
        let totalamnt = data.reduce((a, v) => a = a + v.amount, 0)
        salesTax = (tax / 100) * totalamnt;
        totalBill = totalamnt + salesTax;

    }

    return (
        <>
            <div className="container my-5 mx-1" ref={ref}>
                <h2>NBC Burewala</h2>
                <p><u>COMPLETE ORDER</u></p>

                <div className="row mt-2">
                    <div className="col-6"><b>Customer Name: </b>{!data[0] ? "" : data[0].customer_name}</div>
                    <div className="col-6"><b>Membership No: </b>{!data[0] ? "" : data[0].membership_number}</div>
                </div>
                {/* <div className="row mt-3">
                </div> */}
                {/* <div className="row mt-3">
                    <div className="col"><b>Unit: </b>{!data[0] ? "" : data[0].surving_unit}</div>
                </div> */}
                <div className="row mt-2 ">
                    <div className="col"><b>Sales Man: </b>{!data[0] ? "" : data[0].sales_man_name}</div>
                    <div className="col"><b>Shift: </b>{!data[0] ? "" : data[0].shift}</div>
                </div>
                <div className="row ">
                    <div className="col"><b>Date: </b>{!data[0] ? "" : data[0].date}</div>
                    <div className="col"><b>Time: </b>{time}</div>
                </div>

                <table className="table mt-3" >
                    <thead>
                        <tr className="border border-dark">
                            <th scope="col">Code</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Qty</th>
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
                    </tbody>
                </table>

                <div className="row text-center mt-4">
                    <div className="col">
                        <b>Service Ch: </b>
                    </div>
                    <div className="col">
                        {salesTax.toFixed(2)}
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col">
                        <b> Price: </b>
                    </div>
                    <div className="col">
                        {data.reduce((a, v) => a = a + v.amount, 0)}
                    </div>
                </div>

                <div className="row text-center mt-3 pt-2 border-top">
                    <div className="col">
                        <b>Total Price: </b>
                    </div>
                    <div className="col">
                        {data.reduce((a, v) => a = a + v.amount, 0) + salesTax}
                    </div>
                </div>
            </div>
        </>
    );
});