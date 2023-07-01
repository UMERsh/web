import React from 'react'

export default function Construction() {
  return (
    <>
    <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info'>Construction</h1>
              {/* Material Type */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="material_type" className="form-label">Material Type <span className="text-danger">*</span></label>
                      <select className="form-select bg-light" id='material_type' name='material_type'  aria-label="Default select example">
                      <option value="">Please Select Material type</option>
                        <option value="" >Semant</option>
                        <option value="" >Bajree</option>
                        <option value="" >Bricks</option>
                        <option value="" >Rayte</option>
                        <option value="" >Matti</option>
                        <option value="" >Tiles</option>
                        <option value="" >Bricks</option>
                        <option value="" >Bricks</option>
                      </select>
                    </div>
              
            </div>
             {/* Material Quantity */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="material_quantity" className="form-label"> Quantity of Material*</label>
                          <input type="text" className="form-control" id="material_quantity"  />
                    </div>
              
            </div>
            
          </div>
           
         </div>
           {/* Price of MAterial*/}
      <div className="container">
        <div className="row">
          <div className="col-6">
          <label for="mat_amount" className="form-label"> Amount per quantity*</label>
                          <input type="number" className="form-control" id="mat_amount"  />
          </div>
          <div className="col-6">
          <label for="total_amount" className="form-label"> Total Amount*</label>
                          <input type="number" className="form-control" id="total_amount"  />
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
