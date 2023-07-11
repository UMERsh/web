import React, { useEffect } from 'react'
import image from '../../Assets/images/sports.jpg'
import image3 from '../../Assets/images/image3.jpeg'
import image5 from "../../Assets/images/image5.jpeg"
import image6 from '../../Assets/images/cafe.png'
import image7 from '../../Assets/images/masjid2.png'

export default function Home() {

  return (
    <>
      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img src={image3} className="d-block w-100 " height="600vh" alt="picture" />
            <div className="carousel-caption">
              <h1 className='fw-bold '><span>NBC </span>BUREWALA </h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={image5} className="d-block w-100" height="600vh" alt="picture" />
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Cards */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-3 g-3 my-5">
          <div className="col">
            <div className="card shadow" >
              <img src={image} className="card-img-top" alt="..." height='300px' />
              <div className="card-body">
                <h5 className="card-title">Sports</h5>
                <p className="card-text ">The Club offers to its members almost all type of major indoor and outdoor sports facilities.</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div className="card shadow" >
              <img src={image6} className="card-img-top" alt="..." height='300px' />
              <div className="card-body">
                <h5 className="card-title">Restaurant and Cafe</h5>
                <p className="card-text">With several facilities catering to all tastes, all food is exquisitely prepared and reasonably priced.</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div className="card shadow" >
              <img src={image7} className="card-img-top" alt="..." height='300px' />
              <div className="card-body">
                <h5 className="card-title">Masjid</h5>
                <p className="card-text">The Club accommodates the Masjid for perform Namaz for all prayers for the members.</p>
              </div>

            </div>
          </div>
        </div>
      </div>






    </>
  )
}
