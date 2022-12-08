import React, { useState } from 'react';
import BusinessCarouselSlide from "./BusinessCarouselSlide.js";
import "./BusinessCarousel.css";

const IMAGES = [
    'carousel-1.jpeg', 
    'carousel-2.jpeg', 
    'carousel-3.jpeg', 
    'carousel-4.jpeg',
    'carousel-5.jpeg',
    'carousel-6.jpeg'];

const BusinessCarousel = () => {
    const [images, setImages] = useState(IMAGES);

    const slideLeft = (e) => {
        e.preventDefault();
        let last = images[images.length - 1];
        let rest = images.slice(0, images.length - 1);
        let newImages = [last, ...rest];
        setImages(newImages);
    }

    const slideRight = (e) => {
        e.preventDefault();
        let first = images[0];
        let rest = images.slice(1);
        let newImages = [...rest, first];
        setImages(newImages);
    }

    const businessCarouselSlides = images.map((image, index) => (
        <BusinessCarouselSlide key={index} image={image}/>   
    ));

    return (
        <>
            <div className="carousel-arrows">
                <button className="arrow left" onClick={slideLeft}>
                    <i className="fas fa-chevron-circle-left"></i>
                </button>
                <button className="arrow right" onClick={slideRight}>
                    <i className="fas fa-chevron-circle-right"></i>
                </button>
            </div>
            <div className="business-carousel">
                {businessCarouselSlides}
            </div>
        </>
    );
}

export default BusinessCarousel;

