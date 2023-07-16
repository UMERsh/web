import React from 'react'
import ViewRecievingRecord from './ViewRecievingRecord'
import ViewReturningRecord from './ViewReturningRecord'

export default function InventoryGoodsRecord() {
    return (
        <>
            <ViewRecievingRecord />
            <hr /><br />            
            <ViewReturningRecord />
            <hr /><br />
        </>
    )
}
