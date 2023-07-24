import React from 'react'
import ViewRecievingRecord from './ViewRecievingRecord'
import ViewReturningRecord from './ViewReturningRecord'
import ViewIssuanceRecord from './ViewIssuanceRecord'

export default function InventoryGoodsRecord() {
    return (
        <>
            <ViewRecievingRecord />
            <hr /><br />            
            <ViewReturningRecord />
            <hr /><br />
            <ViewIssuanceRecord />
            <hr /><br />
        </>
    )
}
