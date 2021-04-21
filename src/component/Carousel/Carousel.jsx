import React from 'react'
import './Carousel.css'

const Carousel = () => {


    return (
        <div id="carouselExampleInterval" className="carousel slide bgimage" data-bs-ride="carousel" >
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img src="./images/samsung.png" style={{objectFit:'cover'}} className="d-block w-100" height='250' alt="marca"/>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                <img src="./images/ps5.jpg" style={{objectFit:'cover'}} className="d-block w-100" height='250' alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="./images/sonny.jpg" style={{objectFit:'cover'}} className="d-block w-100" height='250' alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
