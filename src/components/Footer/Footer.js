import React from 'react'
// logo
import logo from '../../Assets/images/logo.jpeg'
// Link
import { Link } from 'react-router-dom';
export default function Footer() {
  const year = new Date().getFullYear();
  return (
  <>
   <div className="container-fluid">
    <div className="row">
      <div className="col-3 bg-dark text-white ">
         <img className='py-2' src={logo} alt="" width='50px' /> <b>NBCBurewala</b>
          <p >Neeli Bar Club Burewala since its inception <br /> has grown to a membership strength of <br /> about 600.</p>   
             
      </div>
      
      <div className="col-3 bg-dark text-white">
          <h3>Quick Links</h3>
          <ul>
            <Link to='' className='text-decoration-none'><li className='text-white text-decoration-none'>Home</li></Link>
            <Link to='' className=' text-decoration-none'><li className='text-white text-decoration-none'>Restuarant&Cafe</li></Link>
            <Link to='' className=' text-decoration-none'><li className='text-white '>Contact</li></Link>
       
            <li></li>
          </ul>
             
      </div>
      <div className="col-3 bg-dark text-white">
         <h3>Facilities </h3>
          <ul>
          <Link to='' className='text-decoration-none'><li className='text-white '>Sports</li></Link>
            <Link to='' className=' text-decoration-none'><li className='text-white '>Masjid</li></Link>
            <Link to='' className=' text-decoration-none'><li className='text-white '>Parking</li></Link>
       
             <li></li>
            </ul>             
      </div>
      <div className="col-3 bg-dark text-white">
            <h3>Get In Touch</h3>
          <p>Neeli Bar Club Burewala since its inception <br /> has grown to a membership strength of <br /> about 600.</p>   
             
      </div>
         
         <div className="text-center bg-dark text-white  ">Copyright &copy; All Rights Reserved {year} </div>
    </div>
   </div>
  </>
    )
}
