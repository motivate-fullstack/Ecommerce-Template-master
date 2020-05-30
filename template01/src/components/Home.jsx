import React, { useReducer } from 'react';
import Products from './Products';



const Home = () => {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/assets/images/home/banner1.jpg" className="d-block w-100" alt="IPhone" height={550} />
          </div>
          <div className="carousel-item active">
            <img src="/assets/images/home/banner2.jpg" className="d-block w-100" alt="IPhone" height={550} />
          </div>
          <div className="carousel-item active">
            <img src="/assets/images/home/banner3.jpg" className="d-block w-100" alt="IPhone" height={550} />
          </div>
          <div className="carousel-item active">
            <img src="/assets/images/home/banner4.jpg" className="d-block w-100" alt="IPhone" height={550} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
      <Products />
    </div>
  )
}

export default Home