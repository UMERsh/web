import React from 'react'
// logo
import logo from '../../Assets/images/logo1.png'
import location from '../../Assets/images/loc.png'
import dial from '../../Assets/images/telephone-plus.svg'
import mail from '../../Assets/images/envelope.svg'
// Link
import { Link } from 'react-router-dom';
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className='bg-dark pt-5'>
        <div className="container text-white px-4 px-md-0">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div className="col ">
              <img className='py-3 rounded-circle me-2' src={logo} alt="" width='50px' /> <b>NBCBurewala</b>
              <p >Neeli Bar Club Burewala since its inception has grown to a membership strength of about 600.</p>
            </div>

            <div className="col mt-4 mt-md-0">
              <h3>Quick Links</h3>
              <ul>
                <Link to='' className='text-decoration-none'><li className='text-white '>Home</li></Link>
                <Link to='' className=' text-decoration-none'><li className='text-white '>Restuarant & Cafe</li></Link>
                <Link to='' className=' text-decoration-none'><li className='text-white '>Contact</li></Link>
              </ul>
            </div>
            <div className="col mt-4 mt-lg-0">
              <h3>Facilities </h3>
              <ul>
                <Link to='' className='text-decoration-none'><li className='text-white '>Sports</li></Link>
                <Link to='' className=' text-decoration-none'><li className='text-white '>Masjid</li></Link>
                <Link to='' className=' text-decoration-none'><li className='text-white '>Parking</li></Link>

              </ul>
            </div>
            <div className="col mt-4 mt-lg-0">
              <h3>Get In Touch</h3>
              <img src={location} alt="" width={30} /> Main multan road burewala <br />
              <Link className='text-decoration-none text-white' to=''> <img className='py-4' src={dial} alt="" /> <i className='px-3 '>0309-3344452</i> </Link> <br />
              <Link className='text-decoration-none text-white' to=''> <img className='py-2' src={mail} alt="" /> <i className='px-3 '>nbcburewala @gmail.com</i> </Link>
            </div>

          </div><hr />
          <div className="row py-3 ">
            <div className="col">
              <div className="text-center ">Copyright &copy; All Rights Reserved {year} </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
