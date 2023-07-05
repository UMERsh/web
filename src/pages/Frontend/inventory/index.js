import React from 'react'
import { Routes,Route } from 'react-router-dom'
import GoodsReceive from './Goods-Receive'
import GoodsReturn from './Goods-Return'
import CashPayment from './Cash-Payment'
import CashReceive from './Cash-Receive'

export default function () {
  return (
    <>
    <div className="alert alert-info mx-2" role="alert">Note! Only management can see this page.</div>
    <Routes>
        <Route path='goods-receive' element={<GoodsReceive />} />
        <Route path='goods-return' element={<GoodsReturn />} />
        <Route path='cash-payment' element={<CashPayment />} />
        <Route path='cash-receive' element={<CashReceive />} />
    </Routes>
    </>
  )
}
