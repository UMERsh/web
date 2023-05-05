import React from 'react'
import image from '../../Assets/images/sports.jpg'
import image1 from '../../Assets/images/image1.jpeg'
import image2 from '../../Assets/images/image2.jpeg'
import image3 from '../../Assets/images/image3.jpeg'

export default function Home() {
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={image1} class="d-block " width="100%" height='500px' alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={image2} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={image3} class="d-block w-100" alt="..." />
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

      <div className="container">
        <div className="row">
          <div className="col">
            <div class="card" >
              <img src={image} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
