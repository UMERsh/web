import React from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components

export const PrintScreen = React.forwardRef((props, ref) => {
    var data = props.dataForPrint

    return (
        <>
            <div className="container my-5" style={{ paddingLeft: 40, paddingRight: 40 }} ref={ref}>
                <h2>CashPayment Record Bill</h2>
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
                            <th scope="col">Item Type </th>
                            <th scope="col">Amount</th>
                            <th scope="col">Account Name</th>
                            <th scope="col">Description </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((items, i) => {
                            return <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{items.item_type}</td>
                                <td>{items.amount}</td>
                                <td>{items.account_name}</td>
                                <td>{items.description}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>



    );
});