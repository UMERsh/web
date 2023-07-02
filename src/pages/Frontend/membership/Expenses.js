import React from 'react'

export default function Expenses() {
  return (
    <>
    <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info'>Expenses</h1>
              {/* Expense Type */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="expense-type" className="form-label">Expense Type <span className="text-danger">*</span></label>
                      <select className="form-select bg-light" id='expense-type' name='expense-type'  aria-label="Default select example">
                        <option value="" >Please Select Expense type</option>
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

     </div>
             
                    
            </div>
          </div>
        </div>
   </>
  )
}
