import React from 'react'

export default function UtilityBills() {
  return (
    <>
    <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info'>Utility Bills</h1>
              {/* Expense Type */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="bill-type" className="form-label">Bill Type <span className="text-danger">*</span></label>
                      <select className="form-select bg-light" id='bill-type' name='bill-type'  aria-label="Default select example">
                        <option value="" >Please Select Bill type</option>
                        <option value="dine_in" >MEPCO</option>
                        <option value="take_away" >PTCL</option>
                        <option value="home_delivery" >Gas</option>
                      </select>
                    </div>
              
            </div>
             {/* Price of Bill */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="bill_price" className="form-label"> Price of Bill*</label>
                          <input type="number" className="form-control" id="bill_price"  />
                    </div>
              
            </div>
            
          </div>
           
         </div>
           {/* Bill Month */}
      <div className="container">
        <div className="row">
          <div className="col">
          <label for="bill_month" className="form-label"> Month for Bill*</label>
                          <input type="date" className="form-control" id="bill_month"  />
          </div>
        </div>
      </div>

      <div className="row mt-4">
                  <div className="col-8 col-md-3 offset-2 offset-md-9">
                    <button className='btn btn-info text-white w-100'>Submit</button>
                  </div>
                </div>
     </div>
             
                    
            </div>
          </div>
        </div>
   </>
  )
}
