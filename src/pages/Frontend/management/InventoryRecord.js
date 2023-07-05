import React from 'react'
import ViewRecievingRecord from './ViewRecievingRecord'
import ViewReturningRecord from './ViewReturningRecord'
import ViewCashPaymentRecord from './ViewCashPaymentRecord'

export default function InventoryRecord() {
    return (
        <>
            <ViewRecievingRecord />
            <hr /><br />
            <ViewReturningRecord />
            <hr /><br />
            <ViewCashPaymentRecord />
        </>
    )
}
