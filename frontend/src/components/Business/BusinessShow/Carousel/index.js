import React, { useState } from 'react';
import Slide from "./Slide.js";
import "./index.css";

const Carousel = ({ business }) => {
    const [images, setImages] = useState(business.photoUrls);

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

    const slides = images.map((image, index) => (
        <Slide key={index} image={image}/>
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
                {slides}
            </div>
        </>
    );
}

export default Carousel;

