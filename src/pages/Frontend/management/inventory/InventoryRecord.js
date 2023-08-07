import React from 'react'
import ViewCashPaymentRecord from './ViewCashPaymentRecord'
import ViewNonProductiveRecord from './ViewNonProductiveRecord'
import ViewReturnNonProductive from './ViewReturnNonProductive'
import ViewCashReceiveRecord from './ViewCashReceiveRecord'

export default function InventoryRecord() {
    return (
        <>
            <ViewNonProductiveRecord />
            <hr /> <br />
            <ViewReturnNonProductive/>
            <hr /> <br />
            <ViewCashPaymentRecord />
            <hr /> <br />
            <ViewCashReceiveRecord />

        </>
    )
}
