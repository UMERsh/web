import React from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const StaffComponentPrint = React.forwardRef((props, ref) => {
    const { time } = props
    var data = props.dataForPrint

    return (
        <>
            <div className="container my-5 text-end" style={{ paddingLeft: 80, paddingRight: 80 }} ref={ref}>
                <h2>NBC Burewala</h2>
                <p><u>ORDER</u></p>
                {/* <p>{time}</p> */}
                <div className="row mt-5">
                    <div className="col  bg-info">{!data[0] ? "" : data[0].customer_name} <b> :سیل مین</b></div>
                </div>
                <div className="row mt-3">
                    <div className="col">{!data[0] ? "" : data[0].dine_in}<b> :ایریا</b></div>
                    <div className="col">{!data[0] ? "" : data[0].surving_unit}<b> :یونٹ</b></div>
                </div>
                <div className="row mt-3">
                    <div className="col">{!data[0] ? "" : data[0].date}<b> :تاریخ </b></div>
                    <div className="col">{time}<b> :وقت </b></div>
                </div>
                <table className="table mt-3" >
                    <thead>
                        <tr>
                            <th scope="col">تعداد</th>
                            <th scope="col">نام اشیا</th>
                            <th scope="col">کوڈ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((items, i) => {
                            return <tr key={i}>
                                <td>{items.quantity}</td>
                                <td>{items.item_title}</td>
                                <td>{items.order_code}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>



    );
});