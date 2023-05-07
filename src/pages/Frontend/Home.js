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
      <div className="container-fluid ">
        <div className="row">
          <div className="col">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={image3} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={image5} class="d-block w-100" alt="..." />
                </div>

              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div class="card" >
              <img src={image} class="card-img-top" alt="..." height='300px' />
              <div class="card-body">
                <h5 class="card-title">Sports</h5>
                <p class="card-text ">The Club offers to its members almost all type of major indoor and outdoor sports facilities.</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div class="card" >
              <img src={image6} class="card-img-top" alt="..." height='300px' />
              <div class="card-body">
                <h5 class="card-title">Restaurant and Cafe</h5>
                <p class="card-text">With several facilities catering to all tastes, all food is exquisitely prepared and reasonably priced.</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div class="card" >
              <img src={image7} class="card-img-top" alt="..." height='300px' />
              <div class="card-body">
                <h5 class="card-title">Masjid</h5>
                <p class="card-text">The Club accommodates the Masjid for perform Namaz for all prayers for the members.</p>
              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}
