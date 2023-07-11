import React from 'react'
import ViewRecievingRecord from './ViewRecievingRecord'
import ViewReturningRecord from './ViewReturningRecord'
import ViewCashPaymentRecord from './ViewCashPaymentRecord'
import ViewNonProductiveRecord from './ViewNonProductiveRecord'

export default function InventoryRecord() {
    return (
        <>
            <ViewRecievingRecord />
            <hr /><br />
            <ViewNonProductiveRecord />
            <hr /> <br />
            <ViewReturningRecord />
            <hr /><br />
            <ViewCashPaymentRecord />
        </>
    )
}
