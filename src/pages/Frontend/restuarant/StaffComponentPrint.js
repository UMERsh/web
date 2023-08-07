import React from "react";

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components

export const StaffComponentPrint = React.forwardRef((props, ref) => {
    const { time } = props
    var data = props.dataForPrint

    return (
        <>
            <div className="container my-5 mx-1 text-end"  ref={ref}>
                <h2>NBC Burewala</h2>
                <p><u>ORDER</u></p>
                <div className="row mt-5">
                    <div className="col ">{!data[0] ? "" : data[0].sales_man_name} <b> :سیل مین</b></div>
                </div>
                <div className="row mt-3">
                    <div className="col">{!data[0] ? "" : data[0].surving_unit}<b> :یونٹ</b></div>
                </div>
                <div className="row mt-3">
                    <div className="col">{!data[0] ? "" : data[0].date}<b> :تاریخ </b></div>
                    <div className="col">{time}<b> :وقت </b></div>
                </div>
                <table className="table mt-4" >
                    <thead>
                        <tr className="border border-dark">
                            {!data[0] ? "" : data[0].serving_area == 'take_away' || data[0].serving_area === 'home_delivery' ? <th scope="col">قیمت</th> : ""}
                            {!data[0] ? "" : data[0].serving_area == 'take_away' || data[0].serving_area === 'home_delivery' ? <th scope="col">پتہ</th> : ""}
                            <th scope="col">تعداد</th>
                            <th scope="col">اشیا کا انگریزی نام</th>
                            <th scope="col">نام اشیا</th>
                            <th scope="col">کوڈ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((items, i) => {
                            return <tr key={i}>
                                {!data[0] ? "" : data[0].serving_area == 'take_away' || data[0].serving_area === 'home_delivery' ? <td>{items.amount} </td>  : ""}
                                {!data[0] ? "" : data[0].serving_area == 'take_away' || data[0].serving_area === 'home_delivery' ? <td>{items.address} </td>  : ""}
                                <td>{items.quantity}</td>
                                <td>{items.item_title}</td>
                                <td>{items.item_name_urdu}</td>
                                <td>{items.order_code}</td>
                            </tr>
                        })}
                        {!data[0] ? "" : data[0].serving_area == 'take_away' || data[0].serving_area === 'home_delivery' ? <tr >
                            <td ><b>{data.reduce((a, v) => a = a + v.amount, 0)}</b> :کل قیمت</td>
                        </tr> : ""}
                    </tbody>
                </table>
            </div>
        </>



    );
});