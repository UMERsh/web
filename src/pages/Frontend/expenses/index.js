import React from "react";
import { Routes,Route } from "react-router-dom";
import UtilityBills from "./Utility-Bills";
import Saleries from "./Saleries";
import Construction from "./Construction";

export default function index(){
    return(
        <>
            <div className="alert alert-info mx-2" role="alert">Note! Only management can see this page.</div>
            <Routes>
             <Route path="utility-bills" element={<UtilityBills />} />
             <Route path="saleries" element={<Saleries />} />
             <Route path="construction" element={<Construction />} />
            </Routes>
        </>
    )
}