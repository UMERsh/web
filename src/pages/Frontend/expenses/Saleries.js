import React from 'react'

export default function Saleries() {
  return (
    <>
    <div className="container my-5 ">
        <div className="row ">
          <div className="col">
            <div className="card rounded-4 shadow pb-5 px-3 px-md-4">
              <h1 className='pt-3 pb-5 text-info'>Salaries</h1>
              {/* Select Person */}
         <div className="container">
          <div className="row">
            <div className="col-6">
            <div className="mb-3  ">
                      <label htmlFor="person_name" className="form-label">Person Name <span className="text-danger">*</span></label>
                      <select className="form-select bg-light" id='person_name' name='person_name'  aria-label="Default select example">
                        <option value="p_1" >person1</option>
                        <option value="p_2" >Person2</option>
                        <option value="p_3" >person3</option>
                      </select>
                    </div>
              
            </div>
             {/* Person Salary */}
            <div className="col-6">
            <div className="mb-3  ">
            <label for="salary" className="form-label"> Salary*</label>
                          <input type="number" className="form-control" id="salary"  />
                    </div>
              
            </div>
            
          </div>
           
         </div>
           {/* Salary Month*/}
      <div className="container">
        <div className="row">
          <div className="col">
          <label for="sal_month" className="form-label"> Month for Salary*</label>
                          <input type="date" className="form-control" id="sal_month"  />
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
